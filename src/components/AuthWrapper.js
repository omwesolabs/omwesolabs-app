import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";

export function AuthWrapper({children}) {
    // const supabase = createClientComponentClient()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            try {
                const {data: {session}, error} = await supabase.auth.getSession()
                console.log(session,error)
                if (error || !session) {
                    console.error("Unable to authenticate with session ", error)
                    console.log("Session ", session)
                    const currentPath = window.location.pathname
                    router.push(`/login?next=${currentPath}`)
                }
            } catch (error) {
                router.push("/login")
            } finally {
                setIsLoading(false)
            }
        }
        checkUser()

        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push("/login")
            } else if (event === 'SIGNED_IN') {
             console.log("User logged in")
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router])

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
    return <>{children}</>
}