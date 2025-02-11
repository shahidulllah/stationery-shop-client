import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState(user?.name || "");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update user profile
    toast.success("Profile updated successfully!");
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
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
            value={user?.email || ""}
            disabled
          />
        </div>

        {/* Update Button */}
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
