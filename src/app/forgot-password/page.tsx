import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div
      className="container-box d-flex justify-content-center align-items-center vh-100 bg-light"
      id="forgot-password"
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="text-center fw-bold mb-2 berkshire-font">
            Forgot Password?
          </h2>
          <p className="text-center text-muted mb-4">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>

          <form>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>

            <p className="text-center text-muted mt-3">
              Remember your password?{" "}
              <Link href="/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
