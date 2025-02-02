import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, clearCart } from "@/redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (cartItems.length === 0) return <p className="">Your cart is empty.</p>;

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between p-2 border-b">
          <span>{item.name} - ${item.price} x {item.quantity}</span>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() => dispatch(clearCart())}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
