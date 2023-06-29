import "../../styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/header/Header";
import ClientOnly from "@/util/ClientOnly";
import { ThemeProvider } from "@/context/ThemeContext";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Nerve",
  description: "Created By Colin Breeding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${font.className} -bg-white dark:-bg-smoothBlack duration-100 ease-in-out`}
      >
        <ThemeProvider>
          <ClientOnly>
            <Header />
          </ClientOnly>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
