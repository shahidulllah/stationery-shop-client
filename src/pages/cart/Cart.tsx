import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { clearCart, fetchCart, removeFromCart } from "@/redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (cartItems.length === 0) return <p className="">Your cart is empty.</p>;

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.product} className="flex justify-between p-2 border-b">
          <span>
            {item.product} - {item.quantity}
          </span>
          <button
            onClick={() => dispatch(removeFromCart(item.product))}
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
