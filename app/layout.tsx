import "bootstrap/dist/css/bootstrap.min.css";
import { Berkshire_Swash, Roboto } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./components/styles/landing.css";
import "./components/styles/testimonial.css";

const berkshireSwash = Berkshire_Swash({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: ["100", "400", "500", "900"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
       <body className={`${berkshireSwash.className} ${roboto.className}`}>
        <Header /> 
          {children}
          <Footer />
      </body>
    </html>
  );
}
