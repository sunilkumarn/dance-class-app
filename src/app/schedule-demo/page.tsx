import DemoScheduleForm from "../components/DemoScheduleForm";
import Link from "next/link";
import "../components/styles/demo-schedule.css";

export const metadata = {
  title: "Book Your Free Demo Dance Class",
  description:
    "Schedule a free demo dance class to experience our teaching style and facilities",
};

export default function ScheduleDemoPage() {
  return (
    <div className="demo-page">
      <div className="container">
        <div className="demo-form-container card shadow">
          <div className="text-center mb-4">
            <h2 className="mb-4">Schedule Your Demo Class</h2>
          </div>
          <DemoScheduleForm />
        </div>
      </div>
    </div>
  );
}
