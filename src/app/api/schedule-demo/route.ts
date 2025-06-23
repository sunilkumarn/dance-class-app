import { NextRequest, NextResponse } from 'next/server';
import { 
  createUser,
  createSchedule,
  checkExistingDemoSchedule
} from '@/src/lib/firebase';
import { scheduleDemoClass } from '@/src/lib/googleCalendar';

// Define the Schedule type based on the JSDoc in firebase.js
interface Schedule {
  id: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// POST /api/schedule-demo - Create a demo user and schedule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.studentName || !body.parentEmail || !body.mobileNumber || 
        !body.dob || !body.selectedDate || !body.selectedTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.parentEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Mobile number validation
    if (body.mobileNumber.length < 10) {
      return NextResponse.json(
        { error: 'Invalid mobile number' },
        { status: 400 }
      );
    }

    // Check if a demo schedule already exists for this email or mobile number
    const existingScheduleCheck = await checkExistingDemoSchedule(
      body.parentEmail, 
      body.mobileNumber
    );
    
    if (existingScheduleCheck.exists && existingScheduleCheck.schedule) {
      const schedule = existingScheduleCheck.schedule as Schedule;
      return NextResponse.json(
        { 
          error: 'A demo class has already been scheduled',
          message: `A demo class has already been scheduled for ${schedule.date} at ${schedule.time}`,
          existingSchedule: schedule
        },
        { status: 409 } // 409 Conflict
      );
    }

    // 1. Create a demo user in Firebase
    const userData = {
      name: body.studentName,
      email: body.parentEmail,
      dob: body.dob,
      mobileNumber: body.mobileNumber,
      role: 'demo_student' // Special role for demo users
    };
    
    const userResult = await createUser(userData);
    const userId = userResult.id;

    // 2. Create a demo schedule in Firebase
    const scheduleData = {
      userId: userId,
      userName: body.studentName,
      date: body.selectedDate,
      time: body.selectedTime,
      status: 'demo_scheduled' // Special status for demo classes
    };
    
    const scheduleResult = await createSchedule(scheduleData);

    // 3. Create calendar event only if Firebase operations are successful
    const event = await scheduleDemoClass({
      studentName: body.studentName,
      parentEmail: body.parentEmail,
      mobileNumber: body.mobileNumber,
      dob: body.dob,
      selectedDate: body.selectedDate,
      selectedTime: body.selectedTime
    });

    return NextResponse.json({ 
      message: 'Demo class scheduled successfully',
      userId: userId,
      scheduleId: scheduleResult.id,
      event 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error in schedule-demo route:', error);
    
    // Check if it's a duplicate event error
    if (error.code === 409) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please select a different time.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to schedule demo class' },
      { status: 500 }
    );
  }
} 