/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/productSlice";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state: RootState) => state.products);

  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts() as any); 
  }, [dispatch]);

  if (status === "loading") return <p className="text-black dark:text-white">Loading products...</p>;
  if (status === "failed") return <p  className="text-black dark:text-white">Error: {error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products?.map((product) => (
        <div key={product.id} className="border p-4 rounded-md">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>${product.price}</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
