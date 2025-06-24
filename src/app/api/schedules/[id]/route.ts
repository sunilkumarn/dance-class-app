import { NextRequest, NextResponse } from "next/server";
import {
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} from "@/src/lib/firebase";

// GET /api/schedules/:id - Get a specific schedule
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const scheduleId = params.id;
    const schedule = await getScheduleById(scheduleId);

    if (!schedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ schedule });
  } catch (error) {
    console.error("Error getting schedule:", error);
    return NextResponse.json(
      { error: "Failed to get schedule" },
      { status: 500 },
    );
  }
}

// PATCH /api/schedules/:id - Update a schedule
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const scheduleId = params.id;
    const body = await request.json();

    // Check if schedule exists
    const existingSchedule = await getScheduleById(scheduleId);
    if (!existingSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 },
      );
    }

    // Update only allowed fields
    const updatedData: any = {};
    if (body.date) updatedData.date = body.date;
    if (body.time) updatedData.time = body.time;
    if (body.status) updatedData.status = body.status;

    await updateSchedule(scheduleId, updatedData);

    return NextResponse.json({
      message: "Schedule updated successfully",
    });
  } catch (error) {
    console.error("Error updating schedule:", error);
    return NextResponse.json(
      { error: "Failed to update schedule" },
      { status: 500 },
    );
  }
}

// DELETE /api/schedules/:id - Delete a schedule
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const scheduleId = params.id;

    // Check if schedule exists
    const existingSchedule = await getScheduleById(scheduleId);
    if (!existingSchedule) {
      return NextResponse.json(
        { error: "Schedule not found" },
        { status: 404 },
      );
    }

    await deleteSchedule(scheduleId);

    return NextResponse.json({
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return NextResponse.json(
      { error: "Failed to delete schedule" },
      { status: 500 },
    );
  }
}
