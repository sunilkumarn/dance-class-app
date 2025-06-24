import { google } from "googleapis";
import { NextResponse } from "next/server";
import { db } from "@/src/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state"); // You can use state to pass user info

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not found." },
      { status: 400 }
    );
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Here, you should securely store the tokens for the user.
    // For this example, I'm assuming you pass the userId in the state.
    // In a real app, you might get the logged-in user from the session.
    if (state) {
      const userId = state; // Assuming you passed userId in the state parameter
      const userDocRef = doc(db, "users", userId, "private", "google_tokens");
      await setDoc(userDocRef, {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
      });
    } else {
        // Handle case where state is not present, maybe log an error or use a default
        console.error("No state found, cannot store tokens.");
    }


    // Redirect user to a success page or back to the app
    return NextResponse.redirect(new URL("/schedule-demo", request.url));
  } catch (error) {
    console.error("Error exchanging authorization code for tokens:", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Google." },
      { status: 500 }
    );
  }
} 