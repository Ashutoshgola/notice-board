import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import NoticeForm from "../components/NoticeForm";

export default function AddNotice() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function createNotice(formData) {
    setLoading(true);

    const res = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to create notice");
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          Add Notice
        </h1>

        <NoticeForm
          onSubmit={createNotice}
          loading={loading}
        />
      </main>
    </>
  );
}