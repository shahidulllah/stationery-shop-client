import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { deleteProduct, fetchProducts } from "@/redux/slices/productSlice";
import { toast } from "sonner";
import EditProductModal from "../../cart/utils/EditProductModal";
import { Product } from "@/types";
import { Plus, Trash, Pencil } from "lucide-react";
import AddProductModal from "@/pages/cart/utils/AddProductModal";

const ManageProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      toast.error("Product ID is missing. Cannot delete product.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
      {isModalOpen && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      <div className="flex max-w-5xl mx-auto justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Manage Products</h2>
        <button
          className="flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto max-h-[500px] overflow-y-scroll border rounded-lg">
        <table className="min-w-full border-collapse border text-left">
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3 text-center">Price</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="border hover:bg-gray-100">
                <td className="border p-3">{product.name}</td>
                <td className="border p-3 text-center">${product.price}</td>
                <td className="border p-3 flex gap-2 justify-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
