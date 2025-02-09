import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  //   const [email, setEmail] = useState(user?.email || "");

  const handleUpdateProfile = () => {
    // e.preventDefault();
    // TODO: Implement update profile logic
    // console.log("Profile updated:", { name, email });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={""}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
