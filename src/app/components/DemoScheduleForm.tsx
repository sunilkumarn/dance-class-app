"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DemoFormData {
  studentName: string;
  parentEmail: string;
  mobileNumber: string;
  dob: string;
  selectedDate: Date | null;
  selectedTime: string;
}

const DemoScheduleForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<DemoFormData>({
    studentName: "",
    parentEmail: "",
    mobileNumber: "",
    dob: "",
    selectedDate: null,
    selectedTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Add validation for mobile number field
    if (name === "mobileNumber") {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData((prev) => ({ ...prev, selectedTime: time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Basic validation
      if (
        !formData.studentName ||
        !formData.parentEmail ||
        !formData.mobileNumber ||
        !formData.dob ||
        !selectedDate ||
        !selectedTime
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.parentEmail)) {
        throw new Error("Please enter a valid email address");
      }

      // Mobile number validation (simple check for now)
      if (formData.mobileNumber.length < 10) {
        throw new Error("Please enter a valid mobile number");
      }

      // Submit to API
      const response = await fetch("/api/schedule-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selectedDate: selectedDate
            ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
            : null,
          selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if this is a duplicate schedule error
        if (response.status === 409 && data.message) {
          throw new Error(data.message);
        } else {
          throw new Error(data.error || "Failed to schedule demo class");
        }
      }

      // Redirect to confirmation page
      router.push("/demo-confirmation");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to schedule demo class');
    } finally {
      setIsLoading(false);
    }
  };

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  // Time slots
  const timeSlots = ["11:00 AM", "3:00 PM", "8:00 PM"];

  // Helper to format slot display
  const getSlotDisplay = (slot: string) => {
    // Parse time and period
    const [time, period] = slot.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    let endHour = hour;
    let endMinute = minute + 30;
    let endPeriod = period;
    if (endMinute >= 60) {
      endMinute -= 60;
      endHour += 1;
      // Handle AM/PM switch
      if (endHour === 12) {
        endPeriod = period === "AM" ? "PM" : "AM";
      } else if (endHour > 12) {
        endHour -= 12;
        endPeriod = period === "AM" ? "PM" : "AM";
      }
    }
    const pad = (n: number) => n.toString().padStart(2, "0");
    const endTime = `${endHour}:${pad(endMinute)} ${endPeriod}`;
    return `${slot} - ${endTime}`;
  };

  // Calculate the minimum selectable date (tomorrow)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minSelectableDate = new Date(today);
  minSelectableDate.setDate(today.getDate() + 1);

  useEffect(() => {
    if (selectedDate) {
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
      fetch(`/api/schedules/booked?date=${dateStr}`)
        .then(res => res.json())
        .then(data => setBookedTimes(data.bookedTimes || []));
    } else {
      setBookedTimes([]);
    }
  }, [selectedDate]);

  return (
    <div className="row">
      <div className="col-md-6 mb-4 mb-md-0">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger mb-3">{error}</div>}

          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">
              Student&apos;s Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              className="form-control"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="parentEmail" className="form-label">
              Contact Email
            </label>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              className="form-control"
              value={formData.parentEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              className="form-control"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="form-control"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>

      <div className="col-md-6">
        <label htmlFor="dob" className="form-label">
          Pick a 30 minute slot for your demo class
        </label>
        <div>
          <div className="calendar">
            <div className="calendar-header">
              <button
                type="button"
                onClick={prevMonth}
                className="calendar-arrow-btn"
                aria-label="Previous Month"
              >
                &#60;
              </button>
              <span>
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="calendar-arrow-btn"
                aria-label="Next Month"
              >
                &#62;
              </button>
            </div>
            <div className="calendar-days">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="day-name">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-grid">
              {Array.from({
                length: new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  1,
                ).getDay(),
              }).map((_, index) => (
                <div key={`empty-${index}`} className="day empty"></div>
              ))}
              {Array.from({
                length: new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  0,
                ).getDate(),
              }).map((_, index) => {
                const day = index + 1;
                const date = new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day,
                );
                const isToday =
                  new Date().toDateString() === date.toDateString();
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                const isDisabled = date < minSelectableDate;
                return (
                  <div
                    key={day}
                    className={`day${isToday ? " today" : ""}${isSelected ? " selected" : ""}${isDisabled ? " disabled" : ""}`}
                    onClick={isDisabled ? undefined : () => handleDateSelect(date)}
                    style={isDisabled ? { pointerEvents: "none", opacity: 0.5 } : {}}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            {selectedDate && (
              <div className="time-slots mt-3">
                {timeSlots
                  .filter(time => !bookedTimes.includes(time))
                  .map((time) => (
                    <div
                      key={time}
                      className={`time-slot ${selectedTime === time ? "selected" : ""}`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {getSlotDisplay(time)}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 mt-4 text-center">
        <button
          type="button"
          className="btn btn-primary px-5 py-2"
          disabled={
            isLoading ||
            !selectedDate ||
            !selectedTime ||
            !formData.studentName ||
            !formData.parentEmail ||
            !formData.mobileNumber ||
            !formData.dob
          }
          onClick={handleSubmit}
        >
          {isLoading ? "Scheduling your demo class..." : "Schedule your demo class"}
        </button>
      </div>
    </div>
  );
};

export default DemoScheduleForm;
