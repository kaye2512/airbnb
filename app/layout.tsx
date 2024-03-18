import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import LoginModal from "@/components/login-modal";
import ToasterProvider from "@/providers/toaster-provider";
import RegisterModal from "@/components/register-modal";
import GetCurrentUser from "@/actions/getCurrentUser";
import {SessionProvider} from "next-auth/react";
import RentModal from "@/components/modals/rent-modal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const currentUser = await GetCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
      <SessionProvider>
          <ToasterProvider/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser = {currentUser}/>
          <div className={"pb-20 pt-28"}>
              {children}
          </div>

      </SessionProvider>
      </body>
    </html>
  );
}
