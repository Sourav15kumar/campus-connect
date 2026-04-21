import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    college: "",
    branch: "",
    bio: "",
    skills: ""
  });

  useEffect(() => {

    const fetchProfile = async () => {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFormData({
        college: res.data.college || "",
        branch: res.data.branch || "",
        bio: res.data.bio || "",
        skills: res.data.skills ? res.data.skills.join(", ") : ""
      });

    };

    fetchProfile();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    console.log("Submitting form...");

    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:5000/api/profile/update",
      {
        college: formData.college,
        branch: formData.branch,
        bio: formData.bio,
        skills: formData.skills.split(",")
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Response:", res.data);

    alert("Profile Updated Successfully");

    navigate("/profile");

  } catch (error) {

    console.error("Error updating profile:", error);

    alert("Error updating profile");

  }

};

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <input
          type="text"
          name="college"
          placeholder="College"
          value={formData.college}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Save Changes
        </button>

      </form>

    </div>

  );

}

export default EditProfile;