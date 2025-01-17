"use client"
import {useEffect, useRef, useState} from "react";
import {ChevronDown, Search} from "lucide-react";

export default function SearchableSelect({value, onChange, options, placeholder, name}) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const dropdownRef = useRef(null)

    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(true)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (option) => {
        onChange(option)
        setIsOpen(false)
        setSearchTerm('')
    }

    return (
        <div className="relative group" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(true)}
                className="w-full px-4 border border-gray-200 rounded-xl bg-white cursor-pointer flex items-center justify-between focus:border-border-blue-500 focus:ring-2 focus ring-blue-200 transition-all">
                <span className={value ? 'text-gray-900' : 'text-gray-500'}>{value || placeholder}</span>
                <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors"/>
            </div>
            {
                isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                        <div className="p-2 border-b">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                <input type="text"
                                       value={searchTerm}
                                       onChange={e => setSearchTerm(e.target.value)}
                                       placeholder="Type to search..."
                                       className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"/>
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {
                                filteredOptions.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">No results found</div>
                                ) : (filteredOptions.map((option) => (
                                    <div
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${value === option ? 'bg-blue-600' : 'text-gray-700'}`}>
                                        {option}
                                    </div>
                                )))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
