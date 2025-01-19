"use client"
import React, { useState } from "react";
import { User, Phone, ArrowRight, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ProfileCompletionPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate required fields
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError("First and last name are required");
            return;
        }

        setIsLoading(true);
        try {
            // Implement profile update logic here
            // await updateUserProfile(formData);
            // Redirect to dashboard on success
            // router.push('/dashboard');
        } catch (error) {
            setError("Failed to update profile. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <AuthLayout isLoggedIn={true}>
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-32 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]" />
                <div className="container mx-auto max-w-4xl relative">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Complete Your Profile
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Just a few more details to get you started
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="container mx-auto max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl p-8 -mt-32 relative z-10">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <User className="h-8 w-8 text-blue-600" />
                        </div>

                        {error && (
                            <Alert className="mb-6 bg-red-50 border-red-200 text-red-600">
                                <AlertCircle className="h-5 w-5" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all"
                                        placeholder="Enter first name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all"
                                        placeholder="Enter last name"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number <span className="text-gray-400">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-600 transition-all"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    We'll only use this for important account notifications
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <span>Updating Profile...</span>
                                ) : (
                                    <>
                                        <span>Complete Profile</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
}