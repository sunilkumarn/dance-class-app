import { NextRequest, NextResponse } from 'next/server';
import { 
  createUser,
  createSchedule
} from '@/src/lib/firebase';

// POST /api/schedule-demo - Create a demo user and schedule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.name || !body.email || !body.mobileNumber || 
        !body.dob || !body.date || !body.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Create a demo user
    const userData = {
      name: body.name,
      email: body.email,
      dob: body.dob,
      mobileNumber: body.mobileNumber,
      role: 'demo_student' // Special role for demo users
    };
    
    const userResult = await createUser(userData);
    const userId = userResult.id;
    
    // 2. Create a demo schedule
    const scheduleData = {
      userId: userId,
      userName: body.name,
      date: body.date,
      time: body.time,
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