import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProductById } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (id) {
      dispatch(addToCart({ productId: id, quantity: 1 }));
      toast.success("Product added to cart!");
    } else {
      toast.error("Product ID is missing");
    }
  };

  if (status === "loading") return <p>Loading product...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="h-screen">
      <div className="max-w-5xl mx-auto my-12 p-4 border rounded-md">
        <h1 className="text-2xl font-bold">{product?.name}</h1>
        <p className="text-lg">${product?.price}</p>
        <p className="">{product?.description}</p>
        <button
          onClick={handleAddToCart}
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
