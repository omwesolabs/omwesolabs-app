"use client"
import React, {useState} from "react";
import {
    Facebook, Linkedin, Twitter, Youtube, GraduationCap, Mail, ArrowRight, VideoIcon
} from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function ComingSoonPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        //     handle email submission logic here
    }

    const [principalSubjects, setPrincipalSubjects] = useState(['', '', '']);
    const [subsidiarySubjects, setSubsidiarySubjects] = useState(['', '']);
    const [activeSection, setActiveSection] = useState("hero");

    return (
        <AuthLayout isLoggedIn={false}>
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
        </AuthLayout>
    )
}