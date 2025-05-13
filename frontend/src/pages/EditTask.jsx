// src/pages/EditTask.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";

function EditTask() {
  const { id } = useParams(); // Task ID from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    isCompleted: false,
    isPublic: false
  });

  const [loading, setLoading] = useState(true);

  // Fetch task data on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/tasks/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Task updated successfully");
      navigate("/my-tasks");
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Description"
          required
        />

        <label className="block">
          <input
            type="checkbox"
            name="isCompleted"
            checked={form.isCompleted}
            onChange={handleChange}
          />
          <span className="ml-2">Mark as Completed</span>
        </label>

        <label className="block">
          <input
            type="checkbox"
            name="isPublic"
            checked={form.isPublic}
            onChange={handleChange}
          />
          <span className="ml-2">Make Public</span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
