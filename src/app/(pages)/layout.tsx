import "../../styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import ClientOnly from "@/util/ClientOnly";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthModalProvider } from "@/context/AuthModalContext";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { EditModalProvider } from "@/context/EditModalContext";
import { PostModalProvider } from "@/context/PostModalContext";
import QueryProvider from "@/util/providers/QueryProvider";

const font = Inter({
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
        className={`${font.className} -bg-white dark:bg-neutral-900 duration-100 ease-in-out scrollbar scrollbar-w-3 scrollbar-thumb-rounded-md scrollbar-thumb-neutral-400/40 dark:scrollbar-thumb-neutral-400/20 scrollbar-track-neutral-700/10 dark:scrollbar-track-neutral-700/20`}
      >
        <QueryProvider>
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
        </QueryProvider>
      </body>
    </html>
  );
}
