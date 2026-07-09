import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoticeForm from "../../components/NoticeForm";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchNotice() {
      try {
        const res = await fetch(`/api/notices/${id}`);
        const data = await res.json();
        setNotice(data);
      } catch (error) {
        console.error(error);
        alert("Failed to load notice.");
      } finally {
        setLoading(false);
      }
    }

    fetchNotice();
  }, [id]);

  async function updateNotice(formData) {
    setSaving(true);

    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("Failed to update notice.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto p-6">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">
          Edit Notice
        </h1>

        <NoticeForm
          initialData={notice}
          onSubmit={updateNotice}
          loading={saving}
        />
      </main>
    </>
  );
}