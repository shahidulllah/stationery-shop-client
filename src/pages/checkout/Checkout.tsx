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
import { clearCart } from "@/redux/slices/cartSlice";

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
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    //Check admin cannot place the order
    if (user?.role === "admin") {
      toast.error("Admins cannot place orders.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/payments/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount * 100,
          currency: "usd",
          userId: user?.id,
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
        toast.success("Payment successful! Placing your order...");

        // Dispatch order placement
        dispatch(
          placeOrder({
            email: user?.email,
            products: cartItems.map((item) => {
              if (!item.product._id) {
                throw new Error("Product ID is missing");
              }
              return {
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
              };
            }),
            totalPrice: totalAmount,
            paymentIntentId: result.paymentIntent.id,
          })
        ).then((orderAction) => {
          if (placeOrder.fulfilled.match(orderAction)) {
            toast.success("Order placed successfully!");

            dispatch(clearCart());

            const orderId = orderAction.payload?._id;
            console.log(orderId);
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
    <div className="max-w-7xl mx-auto my-24 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-4"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Total:
              </h3>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Payment Details</h3>
            <CardElement className="border p-4 rounded-lg" />
          </div>
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700 transition-colors"
            disabled={loading || user?.role === "admin"} 
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout;
