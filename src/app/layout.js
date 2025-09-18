import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/contexts/AppContext";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
  variable: "--font-outfit",
});

export const metadata = {
  name: "TP 2 - NFTs",
  description: "Width love from Maimo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${dmSerifDisplay.variable} ${outfit.variable} relative`}
      >
        <AppContextProvider>
          <Navbar />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}