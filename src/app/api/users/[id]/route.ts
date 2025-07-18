import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser } from "@/src/lib/firebase";

// GET /api/users/:id - Get a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err: unknown) {
    console.error("Error getting user:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to fetch user' }, { status: 500 });
  }
}

// PATCH /api/users/:id - Update a user
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if user exists
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update only allowed fields
    const updatedData: Record<string, unknown> = {};
    if (body.name) updatedData.name = body.name;
    if (body.dob) updatedData.dob = body.dob;
    if (body.mobileNumber) updatedData.mobileNumber = body.mobileNumber;
    // Only allow role update if explicitly provided (careful with this in production!)
    if (body.role) updatedData.role = body.role;

    await updateUser(id, updatedData);

    return NextResponse.json({
      message: "User updated successfully",
    });
  } catch (err: unknown) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update user' },
      { status: 500 },
    );
  }
}
