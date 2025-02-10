"use client";
import { useRouter } from "next/navigation";

export default function YouthDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Youth Dashboard</h1>
      <p>Submit Requests & Upload Documents</p>
      <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={handleLogout}>Logout</button>
    </div>
  );
}
