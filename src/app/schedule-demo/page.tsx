import DemoScheduleForm from '../components/DemoScheduleForm';
import Link from 'next/link';
import '../components/styles/demo-schedule.css';

export const metadata = {
  title: 'Book Your Free Demo Dance Class',
  description: 'Schedule a free demo dance class to experience our teaching style and facilities',
};

export default function ScheduleDemoPage() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link href="/" className="text-decoration-none">
              <h1 className="h3 mb-0">Melodia Academy</h1>
            </Link>
          </div>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link href="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link href="/courses" className="nav-link">Courses</Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <div className="demo-form-container">
        <h2 className="text-center mb-4">Schedule Your Demo Class</h2>
        <DemoScheduleForm />
      </div>
    </div>
  );
} 