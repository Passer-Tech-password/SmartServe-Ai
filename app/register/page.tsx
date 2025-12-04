"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      router.push("/login");
    } catch (error) {
      alert("Registration failed");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-700 px-4">
      <div className="bg-white p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" className="w-full border p-2" required />
          <input name="email" type="email" placeholder="Email" className="w-full border p-2" required />
          <input name="password" type="password" placeholder="Password" className="w-full border p-2" required />

          <select name="role" className="w-full border p-2">
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
          </select>

          <button className="bg-indigo-600 text-white w-full p-2">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
