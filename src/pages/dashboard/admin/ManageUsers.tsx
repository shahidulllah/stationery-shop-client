import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUsers, deleteUser } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import EditUserModal from "../../cart/utils/EditUserModal";
import { Pencil, Trash2, Loader2, AlertCircle } from "lucide-react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

const ManageUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setLoadingId(id);
    try {
      await dispatch(deleteUser(id));
      toast.success("User deleted successfully");
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      {isModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
        Manage Users
      </h2>

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
        <div className="overflow-x-auto overflow-y-scroll max-h-[500px] border rounded-lg">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-800 dark:bg-gray-700 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
              {users?.map((user: User) => (
                <tr
                  key={user._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        user.role === "admin"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                      title="Edit User"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                      onClick={() => handleDelete(user._id)}
                      title="Delete User"
                      disabled={loadingId === user._id}
                    >
                      {loadingId === user._id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
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

export default ManageUsers;
