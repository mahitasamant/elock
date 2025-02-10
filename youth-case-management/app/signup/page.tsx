"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">Welcome to Youth Case Management System</h1>
      <p className="text-gray-600">Choose your role to continue:</p>
      
      <div className="flex gap-4 mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => router.push("/login")}>
          Login
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => router.push("/signup/case-manager")}>
          Sign Up (Case Manager)
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => router.push("/signup/youth-temp")}>
          Sign Up (Youth)
        </button>
        <button className="bg-red-500 text-white px-4 py-2" onClick={() => router.push("/admin-login")}>
  Admin Login
</button>


      </div>

      <p className="mt-4 text-blue-500 cursor-pointer" onClick={() => router.push("/recover-password")}>
        Forgot Password?
      </p>
    </div>
  );
}
