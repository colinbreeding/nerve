import "../../styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/header/Header";
import ClientOnly from "@/util/ClientOnly";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { Toaster } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Nerve",
  description: "Created By Colin Breeding",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await useCurrentUser();
  return (
    <html lang="en">
      <body
        className={`${font.className} -bg-white dark:-bg-smoothBlack duration-100 ease-in-out`}
      >
        <ThemeProvider>
          <AuthModalProvider>
            <ClientOnly>
              <Header currentUser={currentUser} />
            </ClientOnly>
            <Toaster />
            {children}
          </AuthModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
