import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext"; // Assuming this provides token and API URL
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { token, setToken,url } = useContext(StoreContext); // Access API base URL and token
  const [user, setUser] = useState(null); // Store user data
  const [formData, setFormData] = useState({}); // Form data for updates
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // Update user state with fetched data
        setFormData(response.data); // Initialize form data with fetched data
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
      }
    };

    if (token) {
      fetchUserProfile(); // Fetch profile only if token exists
    } else {
      navigate("/login"); // Redirect to login if token is missing
    }
  }, [token, url, navigate]);

   // Handle logout
   const logout = () => {
    setToken(null); // Clear the token in context
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle profile update
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${url}/api/v1/users/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(formData); // Update user state with new data
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">First Name:</label>
          <p className="border p-2 rounded">{user.firstName}</p>
        </div>
        <div>
          <label className="block font-semibold">Last Name:</label>
          <p className="border p-2 rounded">{user.lastName}</p>
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <p className="border p-2 rounded">{user.email}</p>
        </div>
        <button
          onClick={() => setEditMode(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>
        <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded ml-4"
          >
            Logout
          </button>
      </div>
    {/* ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
          >
            Cancel
          </button>
        </form>
      ) */}

    </div>
  );
};

export default UserProfile;
