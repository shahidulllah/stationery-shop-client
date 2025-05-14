import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updateUserProfile } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { updateProfile } from "@/redux/slices/authSlice";
import { ArrowBigRight } from "lucide-react";
import { Link } from "react-router";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [shippingAddress, setShippingAddress] = useState(
    user?.shippingAddress || ""
  );

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      const updatedUser = await dispatch(
        updateUserProfile({ userId: user.id, name, shippingAddress, image })
      ).unwrap();

      dispatch(updateProfile(updatedUser));

      toast.success("Profile updated successfully!");

      setName("");
      setImage("");
      setShippingAddress("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <nav className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex gap-2 items-center">
        <ArrowBigRight />
        <Link to="/dashboard" className="hover:underline">
          dashboard
        </Link>{" "}
        /
        <Link to="/user" className="mx-1 hover:underline">
          {" "}
          user
        </Link>{" "}
        /
        <span className="font-medium text-gray-800 dark:text-white">
          userProfile
        </span>
      </nav>
      <h2 className="text-3xl font-bold mb-8">My Profile</h2>
      <div className="flex justify-between gap-6 ">
        <div className="flex items-center justify-center w-8/12 border rounded-lg">
          User Information
        </div>
        <div className="w-6/12 ">
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
                className="w-full p-3 border rounded cursor-not-allowed bg-gray-100"
                value={user?.email || ""}
                disabled
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Image
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="w-full p-3 border rounded"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium">
                Shipping Address
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded"
                placeholder="Add your shipping address"
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
      </div>
    </div>
  );
};

export default UserProfile;
