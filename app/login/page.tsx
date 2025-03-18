"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Add authentication logic here
  };

  return (
    <div className="container-box d-flex justify-content-center align-items-center vh-100 bg-light" id="login">
      <div className="card shadow-lg p-4 bg-praakrithi" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="text-center fw-bold mb-4 berkshire-font">Welcome Back</h2>
          
          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" placeholder="Enter your username" />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter your password" />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-primary small">Forgot password?</Link>
            </div>

            <button className="btn btn-primary w-100">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
