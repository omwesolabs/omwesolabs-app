"use client"
import React, { useState } from 'react';
import {
    BookOpen, GraduationCap, Building2, ArrowLeft,
    Clock, DollarSign, Briefcase, Award,
    ChevronDown, ChevronUp, ExternalLink,
    BookOpenCheck, Users, Flame, BadgeCheck,
    GraduationCap as GradCap, Brain, Certificate,
    TrendingUp, Globe, Rocket
} from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function CourseDetailPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedSemester, setExpandedSemester] = useState(null);

    const course = {
        id: 1,
        name: "Bachelor of Science in Computer Science",
        university: "Makerere University",
        department: "School of Computing and Informatics Technology",
        description: "A comprehensive program covering software development, algorithms, and computer systems with emphasis on practical applications and industry-ready skills.",
        overview: "This program is designed to provide students with both theoretical knowledge and practical skills in computer science. Students will learn programming, software development, database management, networking, and artificial intelligence, preparing them for various roles in the tech industry.",
        duration: "4 years",
        totalSemesters: 8,
        tuitionRange: {
            min: "5,000,000 UGX",
            max: "5,500,000 UGX",
            additional: ["Technology fee: 500,000 UGX/semester", "Development fee: 200,000 UGX/year"]
        },
        requirements: [
            {
                type: "Academic",
                items: [
                    "Uganda Advanced Certificate of Education (UACE) with at least 2 principal passes",
                    "Mathematics at A-Level",
                    "Physics or Computer Studies at A-Level"
                ]
            },
            {
                type: "Equipment",
                items: [
                    "Personal laptop (minimum 8GB RAM)",
                    "Reliable internet connection",
                    "Development software (provided by university)"
                ]
            }
        ],
        careers: [
            {
                title: "Software Developer",
                description: "Design and build applications and systems",
                avgSalary: "2,500,000 - 5,000,000 UGX/month",
                demand: "High",
                skills: ["Java", "Python", "JavaScript", "Git"]
            },
            {
                title: "Data Scientist",
                description: "Analyze complex data sets to help guide business decisions",
                avgSalary: "3,000,000 - 6,000,000 UGX/month",
                demand: "Very High",
                skills: ["Python", "R", "SQL", "Machine Learning"]
            },
            {
                title: "Systems Analyst",
                description: "Analyze and design information systems solutions",
                avgSalary: "2,000,000 - 4,500,000 UGX/month",
                demand: "Medium",
                skills: ["System Design", "Business Analysis", "Project Management"]
            }
        ],
        hiring_companies: [
            "SafeBoda", "Airtel Uganda", "MTN Uganda",
            "Microsoft (Remote)", "IBM East Africa",
            "United Nations Technology Division"
        ],
        job_market: {
            growth: "15% annual growth in tech sector",
            demand: "High demand for computer science graduates",
            remote_opportunities: "Growing remote work opportunities",
            salary_growth: "10-15% annual salary increment potential",
            trends: [
                "Increased demand for AI/ML specialists",
                "Growth in remote work opportunities",
                "Rising salaries in tech sector",
                "Emergence of fintech opportunities"
            ]
        },
        internships: [
            {
                company: "SafeBoda",
                duration: "3 months",
                paid: true,
                description: "Work with the mobile app development team",
                stipend: "500,000 UGX/month",
                requirements: ["3rd year student", "Knowledge of React Native"]
            },
            {
                company: "Innovation Village",
                duration: "6 months",
                paid: true,
                description: "Full-stack development internship",
                stipend: "700,000 UGX/month",
                requirements: ["3rd/4th year student", "Node.js experience"]
            }
        ],
        certifications: [
            {
                name: "AWS Certified Cloud Practitioner",
                relevance: "High",
                description: "Foundation for cloud computing knowledge",
                duration: "3 months preparation",
                cost: "250,000 UGX"
            },
            {
                name: "Oracle Certified Java Programmer",
                relevance: "Medium",
                description: "Essential for Java development roles",
                duration: "4 months preparation",
                cost: "300,000 UGX"
            }
        ],
        upgrade_options: [
            {
                degree: "Master of Science in Computer Science",
                duration: "2 years",
                focus: "Advanced computing concepts",
                specializations: ["AI/ML", "Cybersecurity", "Distributed Systems"]
            },
            {
                degree: "Master of Science in Data Science",
                duration: "2 years",
                focus: "Advanced data analytics and ML",
                specializations: ["Big Data", "AI", "Business Analytics"]
            }
        ],
        semesters: [
            {
                number: 1,
                courses: [
                    {
                        code: "CS101",
                        name: "Introduction to Programming",
                        credits: 4,
                        description: "Fundamentals of programming using Python",
                        assessment: {
                            coursework: 40,
                            final: 60
                        }
                    },
                    {
                        code: "CS102",
                        name: "Computer Systems",
                        credits: 3,
                        description: "Basic computer architecture and systems",
                        assessment: {
                            coursework: 40,
                            final: 60
                        }
                    },
                    {
                        code: "MATH101",
                        name: "Discrete Mathematics",
                        credits: 3,
                        description: "Mathematical foundations for computer science",
                        assessment: {
                            coursework: 40,
                            final: 60
                        }
                    }
                ]
            },
            {
                number: 2,
                courses: [
                    {
                        code: "CS201",
                        name: "Data Structures",
                        credits: 4,
                        description: "Implementation and analysis of data structures",
                        assessment: {
                            coursework: 40,
                            final: 60
                        }
                    },
                    {
                        code: "CS202",
                        name: "Database Systems",
                        credits: 3,
                        description: "Database design and SQL",
                        assessment: {
                            coursework: 40,
                            final: 60
                        }
                    }
                ]
            }
        ]
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === id
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
        </button>
    );

    const renderInternships = () => (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Internship Opportunities</h2>
            <div className="grid gap-4">
                {course.internships.map((internship, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{internship.company}</h3>
                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                                {internship.paid ? `${internship.stipend}` : 'Unpaid'}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">{internship.description}</p>
                        <div className="text-sm text-gray-500">
                            <p>Duration: {internship.duration}</p>
                            <div className="mt-2">
                                <p className="font-medium">Requirements:</p>
                                <ul className="list-disc list-inside">
                                    {internship.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCertifications = () => (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recommended Certifications</h2>
            <div className="grid gap-4">
                {course.certifications.map((cert, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{cert.name}</h3>
                            <span className={`px-2 py-1 rounded text-sm ${
                                cert.relevance === 'High'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-blue-100 text-blue-600'
                            }`}>
                                {cert.relevance} Relevance
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">{cert.description}</p>
                        <div className="text-sm text-gray-500">
                            <p>Preparation Time: {cert.duration}</p>
                            <p>Estimated Cost: {cert.cost}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderUpgradeOptions = () => (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Further Education Options</h2>
            <div className="grid gap-4">
                {course.upgrade_options.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">{option.degree}</h3>
                        <p className="text-gray-600 mb-2">{option.focus}</p>
                        <p className="text-sm text-gray-500 mb-2">Duration: {option.duration}</p>
                        <div className="mt-2">
                            <p className="font-medium text-sm">Specializations:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {option.specializations.map((spec, idx) => (
                                    <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderJobMarket = () => (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Job Market Overview</h2>
            <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                            <h3 className="font-semibold">Market Growth</h3>
                        </div>
                        <p className="text-gray-600">{course.job_market.growth}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                            <h3 className="font-semibold">Salary Growth</h3>
                        </div>
                        <p className="text-gray-600">{course.job_market.salary_growth}</p>
                    </div>
                </div>
                <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Current Trends</h3>
                    <div className="grid gap-2">
                        {course.job_market.trends.map((trend, index) => (
                            <div key={index} className="flex items-center text-gray-600">
                                <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                                <span>{trend}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout isLoggedIn={true}>
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto max-w-6xl px-4 py-8">
                <div className="flex items-center justify-end mb-8">
                    <button onClick={() => window.history.back()}
                            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                        <ArrowLeft className="h-5 w-5 mr-2"/>
                        <span>Back to Results</span>
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center text-gray-600 mb-2">
                        <Building2 className="h-5 w-5 mr-2"/>
                        <span>{course.university}</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
                    <p className="text-gray-600 mb-6">{course.department}</p>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-gray-600">
                            <Clock className="h-5 w-5 mr-2"/>
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <BookOpen className="h-5 w-5 mr-2"/>
                            <span>{course.totalSemesters} Semesters</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 overflow-x-auto py-2">
                    <TabButton id="overview" label="Overview" icon={BookOpenCheck}/>
                    <TabButton id="curriculum" label="Curriculum" icon={Brain}/>
                    <TabButton id="careers" label="Careers" icon={Briefcase}/>
                    <TabButton id="costs" label="Costs" icon={DollarSign}/>
                    <TabButton id="requirements" label="Requirements" icon={BadgeCheck}/>
                    <TabButton id="market" label="Job Market" icon={TrendingUp}/>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold mb-4">Program Overview</h2>
                                    <p className="text-gray-600 mb-6">{course.overview}</p>

                                    <h3 className="font-semibold mb-3">Key Features</h3>
                                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                        {["Practical Projects", "Industry Partnerships", "Modern Curriculum", "Expert Faculty"].map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                                                <span className="text-gray-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {renderCertifications()}
                                {renderUpgradeOptions()}
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
                                <div className="space-y-4">
                                    {course.semesters.map((semester) => (
                                        <div key={semester.number} className="border rounded-lg">
                                            <button
                                                onClick={() => setExpandedSemester(
                                                    expandedSemester === semester.number ? null : semester.number
                                                )}
                                                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                                            >
                                                <span className="font-semibold">Semester {semester.number}</span>
                                                {expandedSemester === semester.number ? (
                                                    <ChevronUp className="h-5 w-5 text-gray-400"/>
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-gray-400"/>
                                                )}
                                            </button>
                                            {expandedSemester === semester.number && (
                                                <div className="px-4 pb-4">
                                                    <div className="space-y-4">
                                                        {semester.courses.map((course) => (
                                                            <div key={course.code} className="border-b pb-4">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div>
                                                                        <h4 className="font-semibold">{course.name}</h4>
                                                                        <p className="text-sm text-gray-500">{course.code}</p>
                                                                    </div>
                                                                    <span
                                                                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                                                                        {course.credits} Credits
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                                                                <div className="flex gap-4 text-sm">
                                                                    <span className="text-gray-500">
                                                                        Coursework: {course.assessment.coursework}%
                                                                    </span>
                                                                    <span className="text-gray-500">
                                                                        Final: {course.assessment.final}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'careers' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold mb-4">Career Opportunities</h2>
                                    <div className="grid gap-4">
                                        {course.careers.map((career, index) => (
                                            <div key={index} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-semibold">{career.title}</h3>
                                                    <span className={`px-2 py-1 rounded text-sm ${
                                                        career.demand === 'High'
                                                            ? 'bg-green-100 text-green-600'
                                                            : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                        {career.demand} Demand
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-2">{career.description}</p>
                                                <p className="text-sm text-gray-500 mb-2">Average
                                                    Salary: {career.avgSalary}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {career.skills.map((skill, idx) => (
                                                        <span key={idx}
                                                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold mb-4">Companies That Hire Our Graduates</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {course.hiring_companies.map((company, index) => (
                                            <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                                                {company}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {renderInternships()}
                            </div>
                        )}

                        {activeTab === 'costs' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Program Costs</h2>
                                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                    <h3 className="font-semibold mb-2">Tuition Range (per semester)</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">From {course.tuitionRange.min}</span>
                                        <span className="text-gray-600">To {course.tuitionRange.max}</span>
                                    </div>
                                </div>

                                <h3 className="font-semibold mb-3">Additional Fees</h3>
                                <ul className="space-y-2 mb-6">
                                    {course.tuitionRange.additional.map((fee, index) => (
                                        <li key={index} className="flex items-center text-gray-600">
                                            <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2"></div>
                                            {fee}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'requirements' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold mb-4">Program Requirements</h2>
                                {course.requirements.map((reqGroup, index) => (
                                    <div key={index} className="mb-6 last:mb-0">
                                        <h3 className="font-semibold mb-3">{reqGroup.type} Requirements</h3>
                                        <ul className="space-y-2">
                                            {reqGroup.items.map((item, idx) => (
                                                <li key={idx} className="flex items-center text-gray-600">
                                                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mr-2"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'market' && (
                            <div className="space-y-6">
                                {renderJobMarket()}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Quick Facts</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Duration</span>
                                    <span className="font-medium">{course.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Total Semesters</span>
                                    <span className="font-medium">{course.totalSemesters}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Tuition Range</span>
                                    <span
                                        className="font-medium">{course.tuitionRange.min} - {course.tuitionRange.max}</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
                            <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
                            <p className="mb-4">Contact our academic advisors for guidance on program selection and
                                admission requirements.</p>
                            <button
                                className="w-full bg-white text-blue-600 rounded-lg px-4 py-2 font-medium hover:bg-blue-50 transition-colors">
                                Contact Advisor
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </AuthLayout>
    );
}