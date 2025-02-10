"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

// Define the structure of a Youth profile
interface Youth {
  id: string;
  name: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  role: string;
  tempPassword: string;
}

export default function ViewYouthProfiles() {
  const router = useRouter();
  const [youthProfiles, setYouthProfiles] = useState<Youth[]>([]);
  const [message, setMessage] = useState<string>("");

  // Fetch Youth Profiles from Firestore
  useEffect(() => {
    const fetchYouthProfiles = async () => {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        
        // Log fetched documents to check their structure
        console.log("Fetched documents:", querySnapshot.docs);

        const youthsList = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            console.log(data); // Log to inspect the document data

            return {
              id: doc.id,
              name: data.name,
              dob: data.dob,
              address: data.address,
              phone: data.phone,
              email: data.email,
              role: data.role,
              tempPassword: data.tempPassword,
            };
          })
          .filter((user) => user.role === "youth"); // Filter for 'youth' role

        console.log("Filtered youths:", youthsList); // Log to verify filtered data

        setYouthProfiles(youthsList); // Set filtered youth profiles
      } catch (error: unknown) {
        setMessage(`❌ Error fetching youth profiles: ${(error as Error).message}`);
      }
    };

    fetchYouthProfiles();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold">Youth Profiles</h1>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      <div className="w-full max-w-lg mt-4">
        {youthProfiles.length > 0 ? (
          youthProfiles.map((user) => (
            <div key={user.id} className="border p-4 my-2 flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Date of Birth:</strong> {user.dob}</p>
              </div>
              {/* <button
                className="bg-blue-500 text-white px-4 py-2 mt-4"
                onClick={() => router.push(`/dashboard/case-manager/view-youth/${user.id}`)}
              >
                View Details
              </button> */}
            </div>
          ))
        ) : (
          <p>No Youth profiles found.</p>
        )}
      </div>

      <button
        className="mt-4 text-blue-500"
        onClick={() => router.push("/dashboard/case-manager")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
