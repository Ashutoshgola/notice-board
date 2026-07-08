import Link from "next/link";

export default function NoticeCard({ notice }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 border hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold">{notice.title}</h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            notice.priority === "Urgent"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-700"
          }`}
        >
          {notice.priority}
        </span>
      </div>

      <p className="text-gray-500 mb-2">
        Category: {notice.category}
      </p>

      <p className="text-gray-700 mb-4">
        {notice.body}
      </p>

      <p className="text-sm text-gray-400 mb-5">
        Publish Date:
        {" "}
        {new Date(notice.publishDate).toLocaleDateString()}
      </p>

      <div className="flex gap-3">
        <Link
          href={`/edit/${notice.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </Link>

        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}