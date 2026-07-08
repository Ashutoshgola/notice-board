import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoticeCard from "../components/NoticeCard";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          All Notices
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : notices.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold">
              No Notices Found
            </h2>

            <p className="text-gray-500 mt-2">
              Click "Add Notice" to create your first notice.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}