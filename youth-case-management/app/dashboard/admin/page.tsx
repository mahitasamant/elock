// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AdminDashboard() {
//   const router = useRouter();

//   useEffect(() => {
//     const isAdmin = localStorage.getItem("admin_authenticated");
//     if (!isAdmin) {
//       router.push("/admin-login");
//     }
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//       <p>Manage Case Managers & Youth</p>

//       <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={() => router.push("/dashboard/admin/create-case-manager")}>
//         ➕ Add Case Manager
//       </button>

//       <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={() => router.push("/dashboard/admin/manage-case-managers")}>
//         📋 Manage Case Managers
//       </button>

//       <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={() => {
//         localStorage.removeItem("admin_authenticated");
//         router.push("/admin-login");
//       }}>
//         Logout
//       </button>
//     </div>
//   );
// }
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin_authenticated");
    if (!isAdmin) {
      router.push("/admin-login");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Manage Case Managers & Youth</p>

      <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={() => router.push("/dashboard/admin/create-case-manager")}>
        ➕ Add Case Manager
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={() => router.push("/dashboard/admin/manage-case-managers")}>
        📋 Manage Case Managers
      </button>

      <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={() => {
        localStorage.removeItem("admin_authenticated");
        router.push("/admin-login");
      }}>
        Logout
      </button>
    </div>
  );
}
