import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProductById } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";
import { toast } from "sonner";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./ProductReviews";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const { product, status, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (user) {
      if (id) {
        dispatch(addToCart({ productId: id, quantity: 1 }));
        toast.success("Product added to cart!");
      } else {
        toast.error("Product ID is missing");
      }
    } else {
      navigate("/login");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-700 dark:text-white">Loading product...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to="/products" className="mx-1 hover:underline"> Products</Link> /
          <span className="font-medium text-gray-800 dark:text-white">{product?.name}</span>
        </nav>

        {/* Product Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-6 md:p-10">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            {product?.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No image available</p>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product?.name}</h1>
              <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
                ${product?.price}
              </p>
              <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {product?.description}
              </p>

              {/*  Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <Detail label="Brand" value={product?.brand || "Unknown"} />
                <Detail label="Category" value={product?.category || "Unknown"} />
                <Detail label="In Stock" value={`${product?.quantity} items`} />
                <Detail label="SKU" value={`STN-${product?._id?.slice(-6).toUpperCase()}`} />
                <Detail label="Delivery" value="Within 3–5 business days" />
                <Detail label="Return Policy" value="7-day easy return" />
              </div>
            </div>

            {/*  Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 hover:scale-[1.02] transition-all font-semibold shadow-md"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/*  Additional Sections */}
        <ProductReviews />
        <RelatedProducts />
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h4 className="font-semibold mb-1">{label}</h4>
    <p className="text-gray-600 dark:text-gray-300">{value}</p>
  </div>
);

export default ProductDetails;
