import { NextRequest, NextResponse } from 'next/server';
import { 
  createUser,
  createSchedule,
  checkExistingDemoSchedule
} from '@/src/lib/firebase';

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
    
    // Validate request body
    if (!body.studentName || !body.parentEmail || !body.mobileNumber || 
        !body.dob || !body.selectedDate || !body.selectedTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // 1. Create a demo user
    const userData = {
      name: body.studentName,
      email: body.parentEmail,
      dob: body.dob,
      mobileNumber: body.mobileNumber,
      role: 'demo_student' // Special role for demo users
    };
    
    const userResult = await createUser(userData);
    const userId = userResult.id;
    
    // 2. Create a demo schedule
    const scheduleData = {
      userId: userId,
      userName: body.studentName,
      date: body.selectedDate,
      time: body.selectedTime,
      status: 'demo_scheduled' // Special status for demo classes
    };
    
    const scheduleResult = await createSchedule(scheduleData);
    
    return NextResponse.json({ 
      message: 'Demo class scheduled successfully',
      userId: userId,
      scheduleId: scheduleResult.id
    }, { status: 201 });
  } catch (error) {
    console.error('Error scheduling demo class:', error);
    return NextResponse.json(
      { error: 'Failed to schedule demo class' },
      { status: 500 }
    );
  }
} 