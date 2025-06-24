export interface User {
  id?: string;
  name: string;
  email: string;
  dob: string;
  mobileNumber: string;
  role: "admin" | "student" | "demo_student";
  createdAt?: Date;
}

export interface Schedule {
  id?: string;
  userId: string;
  userName?: string; // For display purposes
  date: string;
  time: string;
  status: "scheduled" | "cancelled" | "completed" | "demo_scheduled";
  createdAt?: Date;
  updatedAt?: Date;
}

export type ScheduleWithUser = Schedule & {
  user: User;
};
