import { NextRequest, NextResponse } from "next/server";
import {
  createSchedule,
  getAllSchedules,
  getUserSchedules,
} from "@/src/lib/firebase";
import { auth } from "@/src/lib/firebase";

// GET /api/schedules - Get all schedules or user-specific schedules
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    // Check if request is authenticated (simplified)
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let schedules;

    if (userId) {
      // Get schedules for a specific user
      schedules = await getUserSchedules(userId);
    } else {
      // Get all schedules (admin only)
      schedules = await getAllSchedules();
    }

    return NextResponse.json({ schedules });
  } catch (error) {
    console.error("Error getting schedules:", error);
    return NextResponse.json(
      { error: "Failed to get schedules" },
      { status: 500 },
    );
  }
}

// POST /api/schedules - Create a new schedule
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.userId || !body.date || !body.time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create schedule with default status if not provided
    const scheduleData = {
      userId: body.userId,
      userName: body.userName,
      date: body.date,
      time: body.time,
      status: body.status || "scheduled",
    };

    const result = await createSchedule(scheduleData);

    return NextResponse.json(
      {
        message: "Schedule created successfully",
        scheduleId: result.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating schedule:", error);
    return NextResponse.json(
      { error: "Failed to create schedule" },
      { status: 500 },
    );
  }
}
