"use client"
import React, {useEffect, useState} from "react";
import {
    Facebook,
    Linkedin,
    Twitter,
    Youtube,
    GraduationCap,
    Mail,
    ArrowRight,
    VideoIcon,
    ChevronRight,
    ChevronDown,
    BookOpen,
    Compass,
    Instagram,
    Menu,
    X,
    Star,
    Check,
    AlertCircle
} from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import SearchableSelect from "@/components/SearchableSelect";
import {supabase} from "@/lib/supabase";
import {redirect} from "next/navigation";
import {useAuth} from "@/app/context/AuthContext";

export default function LandingPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const searchParams = {"principals": principalSubjects, "subsidiaries": setSubsidiarySubjects}
        localStorage.setItem("search", JSON.stringify(searchParams));
        console.log(localStorage.getItem("search"));
        redirect("/courses")
    }

    const [principalSubjects, setPrincipalSubjects] = useState(['', '', '']);
    const [subsidiarySubjects, setSubsidiarySubjects] = useState(['', '']);
    const [activeSection, setActiveSection] = useState("hero");

    // const subjectOptions = {
    //     principal: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Literature', 'Art'],
    //     subsidiary: ['Computer Studies', 'General Paper', 'Sub-math']
    // };

    const [subjectOptions, setSubjectOptions] = useState({principal: [], subsidiary: []});

    const fetchSubjects = async () => {
        try {
            const {data, error} = await supabase.from("subjects").select();
            if (error) {
                throw error
            }
            const principalSubjects = data.filter(subject => subject.subject_type === "Principal");
            const subsidiarySubjects = data.filter(subject => subject.subject_type === "Subsidiary");
            setSubjectOptions({
                principal: principalSubjects,
                subsidiary: subsidiarySubjects,
            })
        } catch (error) {
            console.error(error);
        }
    }
    const {user} = useAuth()
    useEffect(() => {
        fetchSubjects();
    }, [])
    return (
        <AuthLayout isLoggedIn={user}>
            <section
                className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-32 px-4 overflow-hidden">
                <div
                    className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]"/>
                <div className="container mx-auto max-w-4xl relative">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Find the Perfect Course <br/>for Your <span className="text-yellow-400">Passion</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Enter your subject combinations to explore tailored career paths
                        </p>
                    </div>
                </div>
            </section>


            <section className="py-16 px-4">
                <div className="container mx-auto max-w-2xl">
                    <div className="bg-white rounded-2xl shadow-xl p-8 -mt-32 relative z-10">
                        <h2 className="text-2xl font-bold text-center mb-8">Your Path Starts Here</h2>
                        <p className="text-center mb-8 text-gray-600">Select your subject combinations below</p>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold mb-2 flex items-center">
                                    <span
                                        className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">1</span>
                                    Principal Subjects
                                </h3>
                                {subjectOptions && [0, 1, 2].map((index) => (
                                    <SearchableSelect
                                        key={`principal-${index}`}
                                        value={principalSubjects[index]}
                                        onChange={(value) => {
                                            const newSubjects = [...principalSubjects];
                                            newSubjects[index] = value;
                                            setPrincipalSubjects(newSubjects);
                                        }}
                                        options={subjectOptions.principal}
                                        placeholder={`Select Subject ${index + 1}`}
                                        name={`principal-${index}`}
                                    />
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold mb-2 flex items-center">
                                    <span
                                        className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">2</span>
                                    Subsidiary Subjects
                                </h3>
                                {subjectOptions && [0, 1].map((index) => (
                                    <SearchableSelect
                                        key={`subsidiary-${index}`}
                                        value={subsidiarySubjects[index]}
                                        onChange={(value) => {
                                            const newSubjects = [...subsidiarySubjects];
                                            newSubjects[index] = value;
                                            setSubsidiarySubjects(newSubjects);
                                        }}
                                        options={subjectOptions.subsidiary}
                                        placeholder={`Select Subject ${index + 1}`}
                                        name={`subsidiary-${index}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold mt-8 hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2">
                                <span>Discover Courses</span>
                                <ArrowRight className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 bg-gray-50" id="how-it-works">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: BookOpen,
                                title: 'Choose Subjects',
                                description: "Enter your combinations to get started"
                            }, {
                                icon: Compass,
                                title: "Explore Courses",
                                description: "Discover programs that match your profile"
                            }, {
                                icon: GraduationCap,
                                title: "Plan Your Career",
                                description: "Get personalized guidance for your future"
                            }
                        ].map((step, index) => (
                            <div className="text-center group" key={index}>
                                <div
                                    className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <step.icon className="h-10 w-10 text-blue-600"/>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Student Success Stories</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                quote: "Omwesolabs helped me discover the perfect course  that matches my interests. The guidance was invaluable",
                                author: "Sarah K.",
                                role: "Senior Six Vacist",
                                rating: 5
                            }, {
                                quote: "The platform made it so easy to understand what courses I could pursue with my subject combination.",
                                author: "David M.",
                                role: "University Fresher",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <div key={index}
                                 className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current"/>
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 text-lg">{testimonial.quote}</p>
                                <div>
                                    <p className="font-semibold text-lg">{testimonial.author}</p>
                                    <p className="text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </section>
            <section className="py-24 px-4 bg-blue-600 text-white">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        {[
                            {
                                number: "10,000+", label: "Students Guided"
                            }, {
                                number: "500+", label: "Courses Available"
                            }, {
                                number: "98%", label: "Satisfaction Rate"
                            },
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                                <div className="text-blue-100">{stat.label}</div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </section>
            <section className="py-24 px-4 bg-gray-50" id="pricing">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Simple, Transparent Pricing</h2>
                    <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                        Choose the plan that best fits your needs. Get started with our feature-rich Basic plan or stay
                        tuned for our upcoming Premium and Enterprise solutions.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Basic Plan */}
                        <div
                            className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-600 relative transform hover:scale-105 transition-transform">
                            <div
                                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                                Most Popular
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Basic</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">10,000</span>
                                <span className="text-gray-600"> UGX</span>
                                <span className="text-gray-500 block text-sm">One-time payment</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-gray-600">
                                    <Check className="h-5 w-5 text-green-500 mr-2"/>
                                    Course Comparison Tools
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <Check className="h-5 w-5 text-green-500 mr-2"/>
                                    Cutoff Point Calculations
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <Check className="h-5 w-5 text-green-500 mr-2"/>
                                    Personalized Recommendations
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <Check className="h-5 w-5 text-green-500 mr-2"/>
                                    Industry Analysis Reports
                                </li>
                            </ul>
                            <button
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                                Get Started Now
                            </button>
                        </div>

                        {/* Premium Plan - Coming Soon */}
                        <div className="bg-gray-50 rounded-2xl shadow-lg p-8 relative">
                            <div
                                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-600 text-white px-4 py-1 rounded-full text-sm">
                                Coming Soon
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Premium</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">---</span>
                                <span className="text-gray-500 block text-sm">Advanced features</span>
                            </div>
                            <ul className="space-y-4 mb-8 opacity-60">
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    Everything in Basic
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    Career Counseling Sessions
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    University Application Help
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    Priority Support
                                </li>
                            </ul>
                            <button
                                className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed">
                                Coming Soon
                            </button>
                        </div>

                        {/* Enterprise Plan - Coming Soon */}
                        <div className="bg-gray-50 rounded-2xl shadow-lg p-8 relative">
                            <div
                                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-600 text-white px-4 py-1 rounded-full text-sm">
                                Coming Soon
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-bold">---</span>
                                <span className="text-gray-500 block text-sm">Custom solutions</span>
                            </div>
                            <ul className="space-y-4 mb-8 opacity-60">
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    Everything in Premium
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    Dedicated Account Manager
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    School Integration APIs
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2"/>
                                    Custom Analytics
                                </li>
                            </ul>
                            <button
                                className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </AuthLayout>
    )
}