"use client"
import React, {useEffect} from 'react';
import {CheckCircle, Download, ArrowRight, FileText} from 'lucide-react';
import AuthLayout from "@/components/AuthLayout";
import {AuthWrapper} from "@/components/AuthWrapper";
import {useRouter, useSearchParams} from "next/navigation";

export default function PaymentSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const transactionId = searchParams.get('transactionId');
    useEffect(() => {
        if (!transactionId) {
            return
        }
        const checkPaymentStatus = async () => {
            try {
                const response = await fetch('/api/momo/confirm-payment?transactionId=' + transactionId);
                const result = await response.json();
                if (result.status === 'SUCCESSFUL') {

                } else if (result.status === 'FAILED') {

                } else {

                }
            } catch (error) {
                console.error(error)
            }
        }
        checkPaymentStatus();
    }, [transactionId]);
    const transactionDetails = {
        transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        amount: "10,000 UGX",
        phoneNumber: "256770123456",
        plan: "Basic Plan"
    };

    const handleDownloadReceipt = () => {
        // In a real implementation, this would generate and download a PDF receipt
        // For now, we'll create a text version
        const receipt = `
OMWESOLABS PAYMENT RECEIPT
--------------------------
Transaction ID: ${transactionDetails.transactionId}
Date: ${transactionDetails.date}
Amount: ${transactionDetails.amount}
Phone Number: ${transactionDetails.phoneNumber}
Plan: ${transactionDetails.plan}
--------------------------
Thank you for your payment!
    `.trim();

        const blob = new Blob([receipt], {type: 'text/plain'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt-${transactionDetails.transactionId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <AuthWrapper>
            <AuthLayout isLoggedIn={true}>
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-2xl">
                        <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
                            {/* Success Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-green-100 rounded-full p-3">
                                    <CheckCircle className="h-12 w-12 text-green-600"/>
                                </div>
                            </div>

                            {/* Success Message */}
                            <h2 className="text-2xl font-bold text-center mb-4">Payment Successful!</h2>
                            <p className="text-center mb-8 text-gray-600">
                                Your payment has been processed successfully. You can now access all Basic Plan
                                features.
                            </p>

                            {/* Transaction Details */}
                            <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Transaction ID</span>
                                    <span className="font-medium">{transactionDetails.transactionId}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Date</span>
                                    <span className="font-medium">{transactionDetails.date}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Amount</span>
                                    <span className="font-medium">{transactionDetails.amount}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Phone Number</span>
                                    <span className="font-medium">{transactionDetails.phoneNumber}</span>
                                </div>
                            </div>

                            {/* Download Receipt Button */}
                            <button
                                onClick={handleDownloadReceipt}
                                className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all mb-4 flex items-center justify-center space-x-2"
                            >
                                <FileText className="h-5 w-5"/>
                                <span>Download Receipt</span>
                            </button>

                            {/* Continue Button */}
                            <button
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2"
                            >
                                <span>Continue to Dashboard</span>
                                <ArrowRight className="h-5 w-5"/>
                            </button>

                            {/* Support Info */}
                            <div className="mt-8 text-center text-sm text-gray-500">
                                <p>Need help? Contact our support team at support@omwesolabs.com</p>
                            </div>
                        </div>
                    </div>
                </section>
            </AuthLayout>
        </AuthWrapper>
    );
};