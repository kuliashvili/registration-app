import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "MMA Georgia - Registration",
  description: "Join the Georgian MMA Community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
