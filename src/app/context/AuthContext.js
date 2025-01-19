"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {supabase} from "@/lib/supabase";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const initial = async () => {
            try {
                const {data: {session}, error: sessionError} = await supabase.auth.getSession();
                if (sessionError) {
                    throw sessionError;
                }
                setSession(session);
                setUser(session?.user);
                if (session?.user) {
                    await fetchUserProfile(session.user.id)
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        initial();
        const {data: {subscription}} = supabase.auth.onAuthStateChange(async (event, session) => {
            try {
                setSession(session)
                setUser(session?.user);

                if (event === "SIGNED_IN" && session?.user) {
                    await fetchUserProfile(session.user.id)
                }

                if (event === "SIGNED_OUT") {
                    setUserProfile(null)
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    async function fetchUserProfile(userId) {
        try {
            const {data, error} = await supabase.from("user_profiles")
                .select("*")
                .eq("id", userId)
                .single();

            if (error) {
                throw error;
            }
            setUserProfile(data)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const signInWithGoogle = async () => {
        try {
            const {error} = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                }
            })
            if (error) {
                throw error;
            }
        } catch (error) {
            setError(error);
        }
    }

    const signOut = async () => {
        try {
            const {error} = await supabase.auth.signOut();
            if (error) {
                throw error;
            }
        } catch (error) {
            setError(error);
        }
    }

    const hasRole = (roles) => {
        return userProfile ? roles.includes(userProfile) : false;
    }

    const value = {session, user, userProfile, signInWithGoogle, signOut, loading, hasRole, error}

    return <AuthProvider value={value}>{children}</AuthProvider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}