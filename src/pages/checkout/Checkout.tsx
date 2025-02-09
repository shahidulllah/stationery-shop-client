import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) return;

    try {
      const res = await fetch(`${BASE_URL}/payments/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount * 100,
          currency: "usd",
          userId: "67a237c813fe64dd035e481a", // Pass userId if required
        }),
      });

      const { clientSecret } = await res.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message || "Payment failed");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      setError("Payment failed, please try again.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handlePayment}
      className="max-w-lg mx-auto my-10 p-6 border rounded h-[300px]"
    >
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="text-lg">Total Amount: ${totalAmount.toFixed(2)}</p>
      <CardElement className="p-2 border rounded my-4" />
      {error && <p className="text-red-500">{error}</p>}
      {success ? (
        <p className="text-green-500">Payment successful!</p>
      ) : (
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      )}
    </form>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
