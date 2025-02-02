import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import { placeOrder } from "@/redux/slices/orderSlice";

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>(); // Properly typed dispatch
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    dispatch(placeOrder(cartItems))
      .unwrap()
      .then(() => {
        dispatch(clearCart());
      })
      .catch((error) => {
        console.error("Order failed:", error);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <button
        onClick={handleOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
