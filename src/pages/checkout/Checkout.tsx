import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { placeOrder } from "@/redux/slices/orderSlice";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/payments/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount * 100,
          currency: "usd",
          userId,
        }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        console.error(result.error.message);
        toast.error(result.error.message); 
      } else {
        console.log("Payment Successful:", result.paymentIntent);

        toast.success("Payment successful! Placing your order...");

        // Dispatch order placement
        dispatch(
          placeOrder({
            userId,
            cartItems: cartItems.map((item) => ({
              id: item.product._id,
              name: item.product.name,
              price: item.product.price,
              quantity: item.quantity,
            })),
            totalAmount,
            paymentIntentId: result.paymentIntent.id,
          })
        ).then((orderAction) => {
          if (placeOrder.fulfilled.match(orderAction)) {
            toast.success("Order placed successfully!");
            
            const orderId = orderAction.payload?._id;
            if (orderId) {
              navigate(`/order-confirmation/${orderId}`);
            } else {
              toast.error("Error: Order ID not found.");
            }
          }
        });
      }
    } catch (err) {
      console.error("Payment failed", err);
      toast.error("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="text-lg">Total Amount: ${totalAmount.toFixed(2)}</p>
      <CardElement className="border p-2 rounded" />
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
