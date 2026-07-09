import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Notice Board
        </Link>

        <Link
          href="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition"
        >
          + Add Notice
        </Link>
      </div>
    </nav>
  );
}