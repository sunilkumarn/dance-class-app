import Link from 'next/link';

export const metadata = {
  title: 'Demo Class Scheduled - Confirmation',
  description: 'Your demo dance class has been scheduled successfully',
};

export default function DemoConfirmationPage() {
  return (
    <div className="demo-page">
      <div className="container py-5 demo-confirmation">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            <div className="card shadow p-5">
              <div className="mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                </div>
              </div>
              
              <h1 className="h3 mb-3">Thank You!</h1>
              <p className="lead mb-4">Your demo class has been scheduled successfully, en email with details has been sent to you now.</p>
              
              <div className="mb-4 p-3 bg-light rounded">
                <p className="mb-1">We'll contact you soon to confirm your booking details.</p>
                <p className="small text-muted mb-0">
                  If you have any questions, please contact us at <a href="mailto:info@praakritischoolofmusic.com" className="text-decoration-none">info@praakritischoolofmusic.com</a>
                </p>
              </div>
              
              <div className="d-grid gap-2">
                <Link href="/" className="btn btn-primary">
                  Return to Home
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
} 