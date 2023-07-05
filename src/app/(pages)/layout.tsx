import "../../styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/header/Header";
import ClientOnly from "@/util/ClientOnly";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { EditModalProvider } from "@/context/EditModalContext";
import { PostModalProvider } from "@/context/PostModalContext";

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
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${font.className} -bg-white dark:bg-[#0a0a0a] duration-100 ease-in-out`}
      >
        <ThemeProvider>
          <AuthModalProvider>
            <PostModalProvider>
              <EditModalProvider>
                <ClientOnly>
                  <Header />
                </ClientOnly>
                <Toaster
                  toastOptions={{
                    className:
                      "bg-neutral-200 dark:bg-neutral-700 dark:text-white text-[12px]",
                  }}
                />
                {children}
              </EditModalProvider>
            </PostModalProvider>
          </AuthModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
