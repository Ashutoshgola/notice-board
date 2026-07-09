import { useState } from "react";

export default function NoticeForm({
  initialData = {},
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    body: initialData.body || "",
    category: initialData.category || "General",
    priority: initialData.priority || "Normal",
    publishDate: initialData.publishDate
      ? initialData.publishDate.split("T")[0]
      : "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-6 space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Body
        </label>

        <textarea
          rows="5"
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Exam</option>
            <option>Event</option>
            <option>General</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Publish Date
          </label>

          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Save Notice"}
      </button>
    </form>
  );
}