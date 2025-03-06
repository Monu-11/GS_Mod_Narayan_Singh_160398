import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/model/User';
import { userSchema } from '@/schema';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and Password is required' },
        { status: 400 }
      );
    }

    const result = userSchema.safeParse({ email, password });

    if (!result.success) {
      return NextResponse.json(
        { message: result.error.format() },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email is Already exist' },
        { status: 409 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: 'User is registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to registered ${error}` },
      { status: 500 }
    );
  }
}
