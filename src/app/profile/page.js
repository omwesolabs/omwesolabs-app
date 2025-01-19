"use client"
import React, {useState} from 'react';
import {User, CreditCard, BookOpen, Bell, Edit, ExternalLink, Clock, Download, Bookmark} from 'lucide-react';
import AuthLayout from "@/components/AuthLayout";
import {AuthWrapper} from "@/components/AuthWrapper";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('account');

    const userProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "256770123456",
        school: "St. Mary's Secondary School",
        joinDate: "January 2024"
    };

    const billingHistory = [
        {
            id: "INV001",
            date: "Jan 15, 2024",
            amount: "10,000 UGX",
            status: "Paid",
            plan: "Basic Plan"
        },
        {
            id: "INV002",
            date: "Feb 15, 2024",
            amount: "10,000 UGX",
            status: "Paid",
            plan: "Basic Plan"
        }
    ];

    const savedCourses = [
        {
            id: 1,
            name: "Bachelor of Software Engineering",
            university: "Makerere University",
            saved: "Jan 10, 2024",
            matchScore: "95%"
        },
        {
            id: 2,
            name: "Bachelor of Business Administration",
            university: "Kyambogo University",
            saved: "Jan 12, 2024",
            matchScore: "88%"
        }
    ];

    const TabButton = ({icon: Icon, label, tabId}) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex items-center space-x-2 p-3 rounded-lg w-full ${
                activeTab === tabId
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50 text-gray-600'
            }`}
        >
            <Icon className="h-5 w-5"/>
            <span>{label}</span>
        </button>
    );

    return (
        <AuthWrapper>
        <AuthLayout isLoggedIn={true}>
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
                                <TabButton icon={User} label="Account" tabId="account"/>
                                <TabButton icon={CreditCard} label="Billing" tabId="billing"/>
                                <TabButton icon={BookOpen} label="Saved Courses" tabId="courses"/>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                {/* Account Details */}
                                {activeTab === 'account' && (
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-bold">Account Details</h2>
                                            <button className="text-blue-600 flex items-center space-x-1">
                                                <Edit className="h-4 w-4"/>
                                                <span>Edit Profile</span>
                                            </button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm text-gray-500">Full Name</label>
                                                <p className="text-lg font-medium">{userProfile.name}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-500">Email</label>
                                                <p className="text-lg font-medium">{userProfile.email}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-500">Phone Number</label>
                                                <p className="text-lg font-medium">{userProfile.phone}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-500">School</label>
                                                <p className="text-lg font-medium">{userProfile.school}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <h3 className="font-semibold mb-4">Notification Preferences</h3>
                                            <div className="space-y-4">
                                                <label className="flex items-center space-x-3">
                                                    <input type="checkbox" className="rounded text-blue-600"
                                                           defaultChecked/>
                                                    <span>Email notifications for new course matches</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input type="checkbox" className="rounded text-blue-600"
                                                           defaultChecked/>
                                                    <span>SMS notifications for important updates</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Billing History */}
                                {activeTab === 'billing' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6">Billing History</h2>
                                        <div className="space-y-4">
                                            {billingHistory.map((transaction) => (
                                                <div key={transaction.id}
                                                     className="border rounded-xl p-4 flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium">{transaction.plan}</p>
                                                        <p className="text-sm text-gray-500">{transaction.date}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">{transaction.amount}</p>
                                                        <button
                                                            className="text-blue-600 text-sm flex items-center space-x-1"
                                                            onClick={() => console.log('Download receipt')}
                                                        >
                                                            <Download className="h-4 w-4"/>
                                                            <span>Receipt</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Saved Courses */}
                                {activeTab === 'courses' && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-6">Saved Courses</h2>
                                        <div className="space-y-4">
                                            {savedCourses.map((course) => (
                                                <div key={course.id} className="border rounded-xl p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-medium">{course.name}</h3>
                                                            <p className="text-gray-500">{course.university}</p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                              {course.matchScore} Match
                            </span>
                                                            <button className="text-blue-600">
                                                                <ExternalLink className="h-5 w-5"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Clock className="h-4 w-4 mr-1"/>
                                                        <span>Saved on {course.saved}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
        </AuthWrapper>
    );
};