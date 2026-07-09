import Link from "next/link";

export default function NoticeCard({ notice, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md border p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{notice.title}</h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            notice.priority === "Urgent"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {notice.priority}
        </span>
      </div>

      <p className="mt-2 text-gray-600">
        Category: {notice.category}
      </p>

      <p className="mt-4 text-gray-700 line-clamp-3">
        {notice.body}
      </p>

      <p className="mt-4 text-sm text-gray-400">
        {new Date(notice.publishDate).toLocaleDateString()}
      </p>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/edit/${notice.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(notice.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}