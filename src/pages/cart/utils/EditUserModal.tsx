import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserRole } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { AppDispatch } from "@/redux/store";

type User = {
  _id: string;
  role: "user" | "admin";
};

interface EditUserModalProps {
  user: User;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const [role, setRole] = useState(user.role);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    try {
      await dispatch(updateUserRole({ userId: user._id, role }));
      toast.success("User role updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit User Role</h2>
        <select
          className="border p-2 w-full"
          value={role}
          onChange={(e) => setRole(e.target.value as User["role"])}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
