"use client";
import { useRouter } from "next/navigation";

export default function CaseManagerDashboard() {
  const router = useRouter();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Case Manager Dashboard</h1>
      <p>Welcome, you are logged in as a Case Manager.</p>

      {/* Button to Create Youth Profile */}
      <button
        className="bg-green-500 text-white px-4 py-2 mt-4"
        onClick={() => router.push("/dashboard/case-manager/create-youth")}
      >
        ➕ Create Youth Profile
      </button>

      {/* Button to View All Youth Profiles */}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4"
        onClick={() => router.push("/dashboard/case-manager/view-all-youths")}
      >
        📋 View All Youth Profiles
      </button>

      {/* Logout Button */}
      <button
        className="bg-red-500 text-white px-4 py-2 mt-4"
        onClick={() => {
          localStorage.removeItem("case_manager_authenticated");
          router.push("/case-manager-login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
