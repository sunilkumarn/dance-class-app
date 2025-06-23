import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize the Google Calendar API client
const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ],
});

const calendar = google.calendar({ version: 'v3', auth });

export const scheduleDemoClass = async (eventDetails: {
  studentName: string;
  parentEmail: string;
  mobileNumber: string;
  dob: string;
  selectedDate: string;
  selectedTime: string;
}) => {
  try {
    // Parse the date and time
    const [year, month, day] = eventDetails.selectedDate.split('-').map(Number);
    
    // Parse the time string (format: "9:00 AM")
    const [timeStr, period] = eventDetails.selectedTime.split(' ');
    const [hoursStr, minutesStr] = timeStr.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    // Create the event start and end times
    const startTime = new Date(year, month - 1, day, hours, minutes);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

    // Format the date in ISO string while preserving the local date
    const formatDateToISO = (date: Date) => {
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60 * 1000);
      return localDate.toISOString();
    };

    // Create the calendar event
    const event = {
      summary: `Demo Dance Class - ${eventDetails.studentName}`,
      description: `
Student Name: ${eventDetails.studentName}
Parent's Email: ${eventDetails.parentEmail}
Mobile Number: ${eventDetails.mobileNumber}
Date of Birth: ${eventDetails.dob}
      `,
      start: {
        dateTime: formatDateToISO(startTime),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: formatDateToISO(endTime),
        timeZone: 'Asia/Kolkata',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: '40ddb05e81790b84622cf67172236b603db07befdf4f3b9a16cd4aac107eba93@group.calendar.google.com',
      requestBody: event,
      sendUpdates: 'none',
    });

    return response.data;
  } catch (error) {
    console.error('Error scheduling demo class:', error);
    throw error;
  }
}; 