import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { deleteProduct, fetchProducts } from "@/redux/slices/productSlice";
import { toast } from "sonner";
import EditProductModal from "../../cart/utils/EditProductModal";
import { Product } from "@/types";
import { Plus, Trash, Pencil, Loader2, AlertCircle } from "lucide-react";

const ManageProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    setLoadingId(id);
    try {
      await dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
      {isModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Manage Products
        </h2>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full">
          <Plus size={18} /> Add Product
        </button>
      </div>

      {status === "loading" ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : status === "failed" ? (
        <div className="text-center text-red-600 bg-red-100 dark:bg-red-800 p-3 rounded-md flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto border dark:border-gray-700 rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-800 text-white sticky top-0">
              <tr>
                <th className="border p-3 dark:border-gray-700">Name</th>
                <th className="border p-3 text-center dark:border-gray-700">
                  Price
                </th>
                <th className="border p-3 text-center dark:border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <td className="border p-3 dark:border-gray-700">
                    {product.name}
                  </td>
                  <td className="border p-3 text-center dark:border-gray-700">
                    ${product.price}
                  </td>
                  <td className="border p-3 flex gap-2 justify-center dark:border-gray-700">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      {loadingId === product._id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash size={16} />
                      )}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
