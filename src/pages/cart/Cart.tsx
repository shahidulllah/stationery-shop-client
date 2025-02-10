import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { clearCart, fetchCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (cartItems.length === 0)
    return (
      <p className="h-64 flex items-center justify-center text-xl">
        Your cart is empty...
      </p>
    );

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item?.product?.price * item.quantity,
    0
  );

  return (
    <div className="my-24 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item?.product?._id}
          className="flex justify-between items-center p-2 border-b"
        >
          <span className="text-lg">
            {item?.product?.name} - {item?.quantity}
          </span>
          <button
            onClick={() => dispatch(removeFromCart(item?.product?._id))}
            className="text-red-500 px-2 py-1 rounded border border-red-500 hover:bg-red-500 hover:text-white"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="text-lg font-semibold mt-4">
        Total: ${totalAmount.toFixed(2)}
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Proceed to Checkout
      </button>
      <button
        onClick={() => dispatch(clearCart())}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
