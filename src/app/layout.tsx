// ❌ DO NOT use "use client"
import "bootstrap/dist/css/bootstrap.min.css";

import { Berkshire_Swash, Roboto } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientBootstrap from "./components/ClientBootstrap";
import "./components/styles/landing.css";
import "./components/styles/testimonial.css";
import "./components/styles/global.css";
import "./components/styles/demo-schedule.css";

export const metadata = {
  title: "Praakrithi School of Music",
  icons: {
    icon: "/images/logo.svg",
  },
};

const berkshireSwash = Berkshire_Swash({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "400", "500", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${berkshireSwash.className} ${roboto.className} d-flex flex-column min-vh-100`}
      >
        <ClientBootstrap /> {/* Loads Bootstrap JS on client */}
        <Header />
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
