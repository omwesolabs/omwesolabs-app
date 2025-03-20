"use client"
import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function EmailVerificationPage() {
    const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, success, error
    const [email, setEmail] = useState(""); // You would get this from your auth state/router
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        // Get email from URL params or auth state
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get("email");
        if (emailParam) setEmail(emailParam);

        // Start countdown
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleResendVerification = async () => {
        setIsResending(true);
        // Implement resend verification logic here
        try {
            // await resendVerificationEmail(email);
            setTimeLeft(60);
        } catch (error) {
            console.error("Failed to resend verification email:", error);
        }
        setIsResending(false);
    };

    const handleBackToLogin = () => {
        // Implement navigation back to login
        window.history.back();
    };

    return (
        <AuthLayout isLoggedIn={false}>
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-32 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]" />
                <div className="container mx-auto max-w-4xl relative">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Verify Your Email
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            We've sent you a verification link to get started
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8 -mt-32 relative z-10">
                        {verificationStatus === "pending" && (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="h-8 w-8 text-blue-600" />
                                </div>

                                <h2 className="text-2xl font-bold">Check Your Inbox</h2>
                                <p className="text-gray-600">
                                    We've sent a verification link to:
                                    <br />
                                    <span className="font-semibold text-gray-800">{email}</span>
                                </p>

                                <Alert className="bg-blue-50 border-blue-200">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                    <AlertTitle>Important</AlertTitle>
                                    <AlertDescription>
                                        Please check your spam folder if you don't see the email in your inbox.
                                    </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                    <button
                                        onClick={handleResendVerification}
                                        disabled={timeLeft > 0 || isResending}
                                        className={`w-full ${
                                            timeLeft > 0 || isResending
                                                ? "bg-gray-100 text-gray-400"
                                                : "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                                        } py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2`}
                                    >
                                        {isResending ? (
                                            <>
                                                <RefreshCw className="h-5 w-5 animate-spin" />
                                                <span>Resending...</span>
                                            </>
                                        ) : timeLeft > 0 ? (
                                            `Resend email in ${timeLeft}s`
                                        ) : (
                                            <>
                                                <RefreshCw className="h-5 w-5" />
                                                <span>Resend verification email</span>
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={handleBackToLogin}
                                        className="w-full text-gray-600 py-2 rounded-xl font-semibold hover:text-gray-800 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                        <span>Back to login</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {verificationStatus === "success" && (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold">Email Verified!</h2>
                                <p className="text-gray-600">
                                    Your email has been successfully verified. You can now access your account.
                                </p>
                                <button
                                    onClick={() => window.location.href = '/dashboard'}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
                                >
                                    Continue to Dashboard
                                </button>
                            </div>
                        )}

                        {verificationStatus === "error" && (
                            <div className="text-center space-y-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="h-8 w-8 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold">Verification Failed</h2>
                                <p className="text-gray-600">
                                    The verification link may have expired or is invalid. Please try requesting a new verification email.
                                </p>
                                <button
                                    onClick={handleResendVerification}
                                    className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                                >
                                    Request New Verification
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
}