import { NextRequest, NextResponse } from 'next/server';
import { 
  createUser,
  getAllUsers,
  getUserById
} from '@/src/lib/firebase';

// GET /api/users - Get all users or a specific user
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    // Check if request is authenticated (simplified)
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    let users;
    
    if (userId) {
      // Get a specific user
      const user = await getUserById(userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      users = [user];
    } else {
      // Get all users (admin only)
      users = await getAllUsers();
    }
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error getting users:', error);
    return NextResponse.json(
      { error: 'Failed to get users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create user
    const userData = {
      name: body.name,
      email: body.email,
      dob: body.dob || '',
      mobileNumber: body.mobileNumber || '',
      role: body.role
    };
    
    const result = await createUser(userData);
    
    return NextResponse.json({ 
      message: 'User created successfully',
      userId: result.id
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 