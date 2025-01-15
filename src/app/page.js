"use client"
import React, {useState} from "react";
import {
    Facebook, Linkedin, Twitter, Youtube, GraduationCap, Mail, ArrowRight,VideoIcon
} from "lucide-react";

export default function ComingSoonPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        //     handle email submission logic here
    }

    return (
        <div className="min-h-screen bg-gradient-to-br form-blue-50 to-white flex flex-col relative overflow-hidden px-4 py-2">
            <svg
                className="absolute inset-0 -z-10"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M 0 200 C 300 100 700 300 1000 200 L 1000 1000 L 0 1000 Z"
                    fill="url(#gradient)"
                    opacity="0.1"
                >
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb"/>
                            <stop offset="100%" stopColor="#1e40af"/>
                        </linearGradient>
                    </defs>
                </path>
            </svg>
            <header className="pt-16 px-4">
                <div className="max-w-xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-3 mb-8">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <GraduationCap className="h-8 w-8 text-white"/>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            OmwesoLabs
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl font-medium text-gray-800">
                        Dream, Plan, Achieve
                    </p>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center px-4 py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">We're working on something
                        amazing</h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-12">
                        Stay tuned for updates on our journey to transform education and empower students to make
                        informed career decisions.
                    </p>
                    <div className="max-w-md mx-auto">

                                    <a
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSdhL_SZuY3xMvgkQ-IpGYIrjotz0R8tgsPWSNDHc2fo_iOLaQ/viewform?usp=sharing" target="_blank"
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 flex items-center justify-center space-x-2">
                                        <span>Sign Up</span>
                                        <ArrowRight className="h-5 w-5"/>
                                    </a>

                    </div>
                </div>
            </main>

            <footer className="py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            {
                                [
                                    {icon: Facebook,href:"https://www.facebook.com/profile.php?id=61571926775059"},
                                    {icon: Linkedin,href:"https://www.linkedin.com/company/omweso-labs"},
                                    {icon: Twitter,href:"https://x.com/OmwesoLabs"},
                                    {icon: Youtube,href:"https://www.youtube.com/@OmwesoLabs"},
                                    {icon: VideoIcon,href:"https://www.tiktok.com/@omwesolabs"},
                                ].map((social, index) => (
                                    <a key={index} href={social.href} target="_blank" className="bg-gray-100 rounded-lg hover:gray-200 transition-colors">
                                        <social.icon className="h-5 w-5 text-gray-600"/>
                                    </a>
                                ))
                            }
                        </div>
                        <a href="mailto:info@omwesolabs.com" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                            <Mail className="h-5 w-5"/>
                            <span>info@omwesolabs.com</span>
                        </a>
                    </div>
                    <div className="text-center mt-8 text-gray-500">
                        <p>&copy;{new Date().getFullYear()} OmwesoLabs. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}