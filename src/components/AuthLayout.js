"use client"
import React, {useState} from "react";
import {GraduationCap, Menu, X, Facebook, Twitter, Instagram, Mail, Linkedin, Youtube, Video} from "lucide-react"
import {useAuth} from "@/app/context/AuthContext";

export default function AuthLayout({children, isLoggedIn = false}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {signOut} = useAuth()

    const LoggedInNav = () =>
        (<>
            <a href="/dashboard" className="text-gray-600 hover:hover:text-blue-600 transition-colors">Dashboard</a>
            <a href="/courses" className="text-gray-600 hover:hover:text-blue-600 transition-colors">My Courses</a>
            <a href="/profile" className="text-gray-600 hover:hover:text-blue-600 transition-colors">Profile</a>
            <button
                onClick={signOut}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Logout
            </button>
        </>)


    const LoggedOutNav = () =>
        (<>
            <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            <a href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
                Login
            </a>
            {/*<a href="/signup" className="text-gray-600 hover:text-blue-600 transition-colors">*/}
            {/*    Sign Up*/}
            {/*</a>*/}
        </>)


    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 bg-white/90 backdrop-blur-md shadow-md z-50">
                <nav className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <a href="/" className="flex items-center space-x-2">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-white"/>
                            </div>
                            <span
                                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">OmwesoLabs</span>
                        </a>
                        <div className="hidden md:flex items-center space-x-8">
                            {isLoggedIn ? <LoggedInNav/> : <LoggedOutNav/>}
                        </div>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                        </button>
                    </div>
                    {
                        isMenuOpen && (
                            <div
                                className="md:hidden absolute top-full left-0 right-0 bg-white border-t py-4 px-4 space-y-4">
                                {
                                    isLoggedIn ? (
                                        <>
                                            <a href="/dashboard"
                                               className="block text-gray-600 hover:text-blue-600">Dashboard</a>
                                            <a href="/courses" className="block text-gray-600 hover:text-blue-600">My
                                                Courses</a>
                                            <a href="/profile"
                                               className="block text-gray-600 hover:text-blue-600">Profile</a>
                                            <button className="w-full text-left text-gray-600 hover:text-blue-600"
                                                    onClick={() => console.log(isLoggedIn)}>Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <a href="/about" className="block text-gray-600 hover:text-blue-600">About</a>
                                            <a href="/about" className="block text-gray-600 hover:text-blue-600">Contact</a>
                                            <a href="/about" className="block text-gray-600 hover:text-blue-600">Login</a>
                                            <a href="/about" className="block text-gray-600 hover:text-blue-600">Sign Up</a>
                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                </nav>
            </header>
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div className="space-y-4">
                            <div className="flex-items-center space-x-2">
                                <div className="bg-white p-2 rounded-lg">
                                    <GraduationCap className="h-6 w-6 text-blue-600"/>
                                </div>
                                <span className="text-xl font-bold">OmwesoLabs</span>
                            </div>
                            <p className="text-gray-400">
                                Dream, Plan, Achieve
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="/suupport" className="hover:text-white transition-colors">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                                </li>
                                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                                </li>
                                <li><a href="/cookie" className="hover:text-white transition-colors">Cookie Policy</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Connect With Us</h3>
                            <div className="flex space-x-4">
                                {[Facebook, Twitter, Linkedin, Instagram, Youtube, Video, Mail].map((Icon, index) => (
                                    <a
                                        key={index}
                                        href="/"
                                        className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                                        <Icon className="h-5 w-5 text-gray-400 hover:text-white transition-colors"/>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} OmwesoLabs. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}