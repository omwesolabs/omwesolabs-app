"use client"
import React, {useState} from 'react';
import {
    BookOpen, GraduationCap, Building2,
    ArrowRight, Star, X, ExternalLink,
    ArrowLeft, Filter, SlidersHorizontal
} from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import {useSubscription} from "@/app/context/SubscriptionContext";
import {redirect} from "next/navigation";

export default function CourseResultsPage() {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    const {subscription, isLoading} = useSubscription();

    if (isLoading) {
        return (<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="space-y-6 text-center flex items-center justify-center gap-4">
                <div className="relative w-24 h-24">
                    <div className="w-24 h-24 border-8 border-gray-200 rounded-full"/>
                    <div
                        className="absolute top-0 w-24 h-24 border-8 border-blue-500 rounded-full border-t-transparent animate-spin"/>
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
                    <p className="text-sm text-gray-500">Please wait while we get things ready</p>
                </div>
            </div>
        </div>)
    }
    if (!subscription) return redirect('/subscription');

    // Sample data based on the subjects selected from previous page
    const selectedSubjects = {
        principal: ['Mathematics', 'Physics', 'Chemistry'],
        subsidiary: ['Computer Studies', 'General Paper']
    };

    const courses = [
        {
            id: 1,
            name: "Bachelor of Science in Computer Science",
            university: "Makerere University",
            description: "A comprehensive program covering software development, algorithms, and computer systems with emphasis on practical applications and industry-ready skills.",
            requirements: ["Mathematics", "Physics", "Computer Studies"],
            duration: "4 years",
            tuition: "5,000,000 UGX per semester",
            matchScore: 98,
            careers: ["Software Developer", "Data Scientist", "Systems Analyst"]
        },
        {
            id: 2,
            name: "Bachelor of Engineering in Software",
            university: "Kyambogo University",
            description: "Specialized program focusing on software engineering principles, development methodologies, and emerging technologies.",
            requirements: ["Mathematics", "Physics", "Computer Studies"],
            duration: "4 years",
            tuition: "4,800,000 UGX per semester",
            matchScore: 95,
            careers: ["Software Engineer", "DevOps Engineer", "Solution Architect"]
        },
        {
            id: 3,
            name: "Bachelor of Information Technology",
            university: "Uganda Technology Institute",
            description: "Broad-based IT program covering networking, software development, and information systems management.",
            requirements: ["Mathematics", "Computer Studies"],
            duration: "3 years",
            tuition: "4,200,000 UGX per semester",
            matchScore: 92,
            careers: ["IT Consultant", "Network Administrator", "System Administrator"]
        }
    ];

    const CourseModal = ({course, onClose}) => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                 onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{course.name}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="h-6 w-6"/>
                    </button>
                </div>

                <div className="flex items-center mb-4 text-gray-600">
                    <Building2 className="h-5 w-5 mr-2"/>
                    <span>{course.university}</span>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <div className="text-blue-600 font-semibold mb-2">Match Score</div>
                    <div className="flex items-center">
                        <div className="text-3xl font-bold text-blue-600">{course.matchScore}%</div>
                        <div className="ml-3 text-sm text-blue-600">match with your subjects</div>
                    </div>
                </div>

                <p className="mb-6 text-gray-600">{course.description}</p>

                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <div className="flex flex-wrap gap-2">
                            {course.requirements.map((req, index) => (
                                <span key={index}
                                      className={`px-3 py-1 rounded-full text-sm ${
                                          selectedSubjects.principal.includes(req) ||
                                          selectedSubjects.subsidiary.includes(req)
                                              ? 'bg-green-100 text-green-600'
                                              : 'bg-gray-100 text-gray-600'
                                      }`}>
                                    {req}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Potential Careers</h4>
                        <div className="flex flex-wrap gap-2">
                            {course.careers.map((career, index) => (
                                <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                    {career}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-semibold">Duration</h4>
                            <p className="text-gray-600">{course.duration}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Tuition</h4>
                            <p className="text-gray-600">{course.tuition}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                    <button
                        className="bg-white border border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                        <span>Save Course</span>
                        <BookOpen className="h-5 w-5"/>
                    </button>
                    <button
                        className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <span>Apply Now</span>
                        <ExternalLink className="h-5 w-5"/>
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout isLoggedIn={true}>
            <div className="min-h-screen bg-gray-50">
                <main className="container mx-auto max-w-6xl px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold mb-2">Recommended Courses</h1>
                            <p className="text-gray-600">Based on your subject combination</p>
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="mt-4 md:mt-0 flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                            <SlidersHorizontal className="h-5 w-5"/>
                            <span>Filters</span>
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {showFilters && (
                            <div className="lg:w-64 bg-white p-6 rounded-xl shadow-lg h-fit">
                                <h2 className="font-semibold mb-4">Your Subjects</h2>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h3 className="text-sm text-gray-600 mb-2">Principal Subjects</h3>
                                        {selectedSubjects.principal.map((subject, index) => (
                                            <div key={index}
                                                 className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-2">
                                                {subject}
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-600 mb-2">Subsidiary Subjects</h3>
                                        {selectedSubjects.subsidiary.map((subject, index) => (
                                            <div key={index}
                                                 className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mb-2">
                                                {subject}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Additional filters can be added here */}
                            </div>
                        )}

                        <div className="flex-1">
                            <div className="grid md:grid-cols-2 gap-6">
                                {courses.map((course) => (
                                    <div key={course.id}
                                         className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-semibold">{course.name}</h3>
                                                <div
                                                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                                    {course.matchScore}% Match
                                                </div>
                                            </div>

                                            <div className="flex items-center text-gray-600 mb-4">
                                                <Building2 className="h-4 w-4 mr-2"/>
                                                <span className="text-sm">{course.university}</span>
                                            </div>

                                            <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {course.requirements.map((req, index) => (
                                                    <span key={index}
                                                          className={`px-3 py-1 rounded-full text-sm ${
                                                              selectedSubjects.principal.includes(req) ||
                                                              selectedSubjects.subsidiary.includes(req)
                                                                  ? 'bg-green-100 text-green-600'
                                                                  : 'bg-gray-100 text-gray-600'
                                                          }`}>
                                                    {req}
                                                </span>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setSelectedCourse(course)}
                                                className="w-full bg-gray-50 text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                                                <span>View Details</span>
                                                <ArrowRight className="h-4 w-4"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {selectedCourse && (
                    <CourseModal
                        course={selectedCourse}
                        onClose={() => setSelectedCourse(null)}
                    />
                )}
            </div>
        </AuthLayout>
    );
}