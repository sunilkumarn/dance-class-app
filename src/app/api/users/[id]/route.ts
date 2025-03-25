import { NextRequest, NextResponse } from 'next/server';
import { 
  getUserById,
  updateUser
} from '@/src/lib/firebase';

// GET /api/users/:id - Get a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}

// PATCH /api/users/:id - Update a user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();
    
    // Check if user exists
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Update only allowed fields
    const updatedData: any = {};
    if (body.name) updatedData.name = body.name;
    if (body.dob) updatedData.dob = body.dob;
    if (body.mobileNumber) updatedData.mobileNumber = body.mobileNumber;
    // Only allow role update if explicitly provided (careful with this in production!)
    if (body.role) updatedData.role = body.role;
    
    await updateUser(userId, updatedData);
    
    return NextResponse.json({ 
      message: 'User updated successfully' 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
} 