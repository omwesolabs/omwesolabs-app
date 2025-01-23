import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/app/context/AuthContext";
import {SubscriptionProvider} from "@/app/context/SubscriptionContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "OmwesoLabs",
    description: "Dream, Plan, Achieve",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AuthProvider>
            <SubscriptionProvider>
                {children}
            </SubscriptionProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
