import { NextRequest, NextResponse } from "next/server";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const q = query(collection(db, "schedules"), where("date", "==", date));
  const snapshot = await getDocs(q);
  const bookedTimes = snapshot.docs.map(doc => doc.data().time);

  return NextResponse.json({ bookedTimes });
} 