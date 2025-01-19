import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export function AuthWrapper({children}) {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            try {
                const {data: {session}, error} = await supabase.auth.getSession()
                if (error || !session) {
                    router.push("/login")
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
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return <>{children}</>
}