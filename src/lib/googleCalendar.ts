import { google } from "googleapis";
import { DateTime } from "luxon";

export const scheduleDemoClass = async (
  eventDetails: {
    studentName: string;
    parentEmail: string;
    mobileNumber: string;
    dob: string;
    selectedDate: string;
    selectedTime: string;
  },
) => {
  try {
    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/api/auth/callback/google");

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_CALENDER_REFRESH_TOKEN
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // Parse the date and time
    const [year, month, day] = eventDetails.selectedDate.split("-").map(Number);
    const [timeStr, period] = eventDetails.selectedTime.split(" ");
    const [hoursStr, minutesStr] = timeStr.split(":");
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    // Use luxon to create the time in Asia/Kolkata
    const startTime = DateTime.fromObject(
      { year, month, day, hour: hours, minute: minutes },
      { zone: "Asia/Kolkata" }
    );
    const endTime = startTime.plus({ minutes: 30 });

    const event = {
      summary: `Demo Music Class - ${eventDetails.studentName}`,
      description: `\nStudent Name: ${eventDetails.studentName}\nParent's Email: ${eventDetails.parentEmail}\nMobile Number: ${eventDetails.mobileNumber}\nDate of Birth: ${eventDetails.dob}\n`,
      start: {
        dateTime: startTime.toISO(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTime.toISO(),
        timeZone: "Asia/Kolkata",
      },
      attendees: [
        {
          email: 'lichu.chandran@gmail.com',
        },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };
    const response = await calendar.events.insert({
      calendarId: "primary", // Use the authenticated user's primary calendar
      requestBody: event,
      sendUpdates: "all",
    });
    return response.data;
  } catch (error) {
    console.error("Error scheduling demo class:", error);
    throw error;
  }
};

