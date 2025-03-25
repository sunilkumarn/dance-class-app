"use client";
import { useState } from "react";
import { auth, db, signInWithEmailAndPassword } from "@/src/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1️⃣ Authenticate user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Fetch user details from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      console.log("User:", userDoc);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User Role:", userData.role);

        // 3️⃣ Redirect based on role
        if (userData.role === "admin") {
          router.push("/admin-dashboard");
        } else if (userData.role === "student") {
          router.push("/dashboard");
        } else {
          router.push("/demo-dashboard"); // Demo student view
        }
      } else {
        setError("User data not found.");
      }
    } catch (err) {
      console.log("Error:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center fw-bold mb-2">Welcome Back</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
              <Link href="/forgot-password" className="text-primary small">Forgot password?</Link>
            </div>
            
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
}





