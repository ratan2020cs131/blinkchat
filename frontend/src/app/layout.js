import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blinkchat",
  description: "Chat in private rooms",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReduxProvider>
  );
}
