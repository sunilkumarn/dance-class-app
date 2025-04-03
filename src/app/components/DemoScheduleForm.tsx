"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    studentName: '',
    parentEmail: '',
    mobileNumber: '',
    dob: '',
    selectedDate: null,
    selectedTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Add validation for mobile number field
    if (name === 'mobileNumber') {
      // Only allow numbers
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData(prev => ({ ...prev, selectedTime: time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.studentName || !formData.parentEmail || !formData.mobileNumber || 
          !formData.dob || !selectedDate || !selectedTime) {
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.parentEmail)) {
        throw new Error('Please enter a valid email address');
      }

      // Mobile number validation (simple check for now)
      if (formData.mobileNumber.length < 10) {
        throw new Error('Please enter a valid mobile number');
      }

      // Submit to API
      const response = await fetch('/api/schedule-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedDate: selectedDate?.toISOString(),
          selectedTime
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Check if this is a duplicate schedule error
        if (response.status === 409 && data.message) {
          throw new Error(data.message);
        } else {
          throw new Error(data.error || 'Failed to schedule demo class');
        }
      }
      
      // Redirect to confirmation page
      router.push('/demo-confirmation');
      
    } catch (err: any) {
      setError(err.message || 'Failed to schedule demo class');
    } finally {
      setIsLoading(false);
    }
  };

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dateString = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    // Create header with day names
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    return (
      <div className="calendar">
        <div className="calendar-header d-flex justify-content-between align-items-center mb-2">
          <button type="button" onClick={prevMonth} className="btn btn-sm">
            &lt;
          </button>
          <span>{dateString}</span>
          <button type="button" onClick={nextMonth} className="btn btn-sm">
            &gt;
          </button>
        </div>
        
        <div className="calendar-days">
          {dayNames.map(day => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-grid">
          {Array.from({ length: firstDay.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="day empty"></div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(year, month, day);
            
            // Check if this date is today or selected
            const isToday = new Date().toDateString() === date.toDateString();
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            
            // For demo purposes, show highlighted dates
            // The number 2 is filled with blue, and 25 has outline style
            const isDemoHighlighted = day === 2;
            const isDemoOutlined = day === 25;
            
            return (
              <div
                key={day}
                className={`day ${isToday ? 'today' : ''} 
                  ${isSelected ? 'selected' : ''} 
                  ${isDemoHighlighted ? 'selected' : ''} 
                  ${isDemoOutlined ? 'outlined' : ''}`}
                onClick={() => handleDateSelect(date)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Time slots
  const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM'];

  return (
    <div className="row">
      <div className="col-md-6 mb-4 mb-md-0">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label">Student's Name</label>
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
            <label htmlFor="parentEmail" className="form-label">Parent's Email</label>
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
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
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
            <label htmlFor="dob" className="form-label">Date of Birth</label>
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
        {generateCalendar()}
        
        {selectedDate && (
          <div className="time-slots mt-3">
            {timeSlots.map(time => (
              <div 
                key={time} 
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="col-12 mt-4 text-center">
        <button 
          type="button" 
          className="btn btn-primary px-5 py-2" 
          disabled={isLoading || !selectedDate || !selectedTime || !formData.studentName || !formData.parentEmail || !formData.mobileNumber || !formData.dob}
          onClick={handleSubmit}
        >
          {isLoading ? 'Scheduling...' : 'Schedule Demo Class'}
        </button>
      </div>
    </div>
  );
};

export default DemoScheduleForm; 