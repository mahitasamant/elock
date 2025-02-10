"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase/config";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// 🔹 TypeScript Interface for Case Manager
interface CaseManager {
  id: string;
  username: string;
  password: string;
  role: string;
  createdBy: string;
}

export default function ManageCaseManagers() {
  const router = useRouter();
  const [caseManagers, setCaseManagers] = useState<CaseManager[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for toggling password visibility

  // 🔹 Fetch Case Managers from Firestore
  useEffect(() => {
    const fetchCaseManagers = async () => {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);

      const caseManagersList = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username,
            password: data.password,
            role: data.role,
            createdBy: data.createdBy
          } as CaseManager;
        })
        .filter((user) => user.role === "case_manager");

      setCaseManagers(caseManagersList);
    };

    fetchCaseManagers();
  }, []);

  // 🔹 Handle updating Case Manager password
  const handleUpdatePassword = async (userId: string) => {
    try {
      if (!newPassword) {
        setMessage("❌ Password cannot be empty.");
        return;
      }

      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { password: newPassword });

      setMessage("✅ Password updated successfully!");
      setEditingUser(null);
      setNewPassword("");

      // Refresh the list
      setCaseManagers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, password: newPassword } : user))
      );
    } catch (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  // 🔹 Handle deleting Case Manager
  const handleDelete = async (userId: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this case manager?")) {
        await deleteDoc(doc(db, "users", userId));

        setMessage("✅ Case Manager deleted successfully!");
        setCaseManagers((prev) => prev.filter((user) => user.id !== userId));
      }
    } catch (error: unknown) {
      setMessage(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold">📋 Manage Case Managers</h1>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      <div className="w-full max-w-lg mt-4">
        {caseManagers.length > 0 ? (
          caseManagers.map((user) => (
            <div key={user.id} className="border p-4 my-2 flex justify-between items-center">
              <div>
                <p><strong>Username:</strong> {user.username}</p>
                {editingUser === user.id ? (
                  <>
                    <div className="relative">
                      <input
                        type={isPasswordVisible ? "text" : "password"}  // Toggle password visibility
                        placeholder="New Password"
                        className="border p-2 my-2 w-full"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}  // Toggle visibility on eye click
                      >
                        👁️
                      </button>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleUpdatePassword(user.id)}>
                      Save
                    </button>
                    <button
                      className="ml-2 text-gray-500"
                      onClick={() => {
                        setEditingUser(null);
                        setNewPassword("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <p><strong>Password:</strong> {isPasswordVisible ? user.password : "******"} </p>
                      <button
                        className="ml-2"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle password visibility
                      >
                        👁️
                      </button>
                    </div>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 mr-2"
                      onClick={() => setEditingUser(user.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Case Managers found.</p>
        )}
      </div>

      <button className="mt-4 text-blue-500" onClick={() => router.push("/dashboard/admin")}>
        ← Back to Dashboard
      </button>
    </div>
  );
}
