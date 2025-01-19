"use client"
import React, {useState} from 'react';
import {ArrowRight, Phone, Shield} from 'lucide-react';
import AuthLayout from "@/components/AuthLayout";
import {AuthWrapper} from "@/components/AuthWrapper";

export default function Subscription() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate payment process
        setTimeout(() => setIsLoading(false), 2000);
    };

    const formatPhoneNumber = (value) => {
        // Remove non-numeric characters
        const numeric = value.replace(/[^\d]/g, '');
        // Ensure it starts with 256 (Uganda)
        const formatted = numeric.startsWith('256')
            ? numeric
            : `256${numeric.startsWith('0') ? numeric.slice(1) : numeric}`;
        return formatted.slice(0, 12); // Limit to 12 digits
    };

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhoneNumber(formatted);
    };

    return (
        <AuthWrapper>
            <AuthLayout isLoggedIn={true}>
                <section className="py-16 px-4">
                    <div className="container mx-auto max-w-2xl">
                        <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10">
                            <h2 className="text-2xl font-bold text-center mb-8">Complete Your Payment</h2>
                            <p className="text-center mb-8 text-gray-600">Enter your mobile money number to proceed with
                                payment</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Mobile Money Number
                                        </label>
                                        <div className="relative">
                                            <Phone
                                                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={phoneNumber}
                                                onChange={handlePhoneChange}
                                                placeholder="256770123456"
                                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition-all"
                                                required
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">Format: 256XXXXXXXXX</p>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <div className="flex items-center mb-2">
                                            <Shield className="h-5 w-5 text-blue-600 mr-2"/>
                                            <span className="font-semibold text-blue-800">Payment Summary</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Basic Plan</span>
                                            <span>10,000 UGX</span>
                                        </div>
                                        <div className="border-t border-blue-100 my-2"/>
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>10,000 UGX</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || phoneNumber.length < 12}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span>Processing...</span>
                                    ) : (
                                        <>
                                            <span>Pay Now</span>
                                            <ArrowRight className="h-5 w-5"/>
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>You will receive a prompt on your phone to complete the payment</p>
                            </div>
                        </div>
                    </div>
                </section>
            </AuthLayout>
        </AuthWrapper>
    );
};