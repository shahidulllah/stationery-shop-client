import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUsers, deleteUser } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import EditUserModal from "../../cart/utils/EditUserModal";

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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser(id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  if (status === "loading") return <p>Loading users...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto">
      {isModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user._id} className="border">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
