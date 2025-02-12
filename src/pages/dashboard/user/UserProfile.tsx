import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updateUserProfile } from "@/redux/slices/userSlice";
import { toast } from "sonner";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(user?.name || "");
  const [shippingAddress, setShippingAddress] = useState(
    user?.shippingAddress || ""
  );

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userId: user._id, name, shippingAddress }))
      .then(() => toast.success("Profile updated successfully!"))
      .catch(() => toast.error("Failed to update profile"));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        My Profile
      </h2>
      <form onSubmit={handleUpdateProfile} className="space-y-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Name
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Email
          </label>
          <input
            type="email"
            className="w-full p-3 border rounded bg-gray-200 cursor-not-allowed"
            value={user?.email || ""}
            disabled
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium">
            Shipping Address
          </label>
          <input
            type="text"
            className="w-full p-3 border rounded"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
