/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/productSlice";
import { toast } from "sonner";
import { addToCart } from "@/redux/slices/cartSlice";

const AllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const handleAddToCart = async (productId: string) => {
    try {
      dispatch(addToCart({ productId, quantity: 1 }));
      toast.success("Product added to cart!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product to cart!");
    }
  };

  if (status === "loading")
    return <p className="text-black dark:text-white">Loading products...</p>;
  if (status === "failed")
    return <p className="text-black dark:text-white">Error: {error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products?.map((product) => (
        <div key={product._id} className="border p-4 rounded-md">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>${product.price}</p>
          <button
            onClick={() => handleAddToCart(product._id)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
