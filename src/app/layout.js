import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ShopProvider } from "@/contexts/ShopContext";

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
  title: "TP 2 - NFTs",
  description: "With love from Maimo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${dmSerifDisplay.variable} ${outfit.variable} relative`}>
        <ShopProvider>
          <Navbar />
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
