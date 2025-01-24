"use client"
import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {supabase} from "@/lib/supabase";

const AuthContext = createContext();

export function AuthProvider({children}){
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    // Debug loading state changes
    useEffect(() => {
        console.log('Loading state changed:', loading);
    }, [loading]);

    // Add timeout safety net
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (loading) {
                console.warn('Loading timeout reached - forcing load completion');
                setLoading(false);
                setError('Authentication timed out');
            }
        }, 10000); // 10 second timeout

        return () => clearTimeout(timeoutId);
    }, [loading]);

    useEffect(() => {
        const initial = async () => {
            try {
                console.log('Starting initial auth check...');
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) {
                    console.error('Session error:', sessionError);
                    throw sessionError;
                }

                console.log('Session retrieved:', session ? 'exists' : 'none');
                setSession(session);
                setUser(session?.user);

                if (session?.user) {
                    await fetchUserProfile(session.user.id);
                } else {
                    console.log('No user session found');
                }
            } catch (err) {
                console.error('Initial auth check failed:', err);
                setError(err.message);
            } finally {
                console.log('Completing initial auth check');
                setLoading(false);
            }
        };

        initial();

        const {data: {subscription}} = supabase.auth.onAuthStateChange(async (event,session)=>{
            console.log('Auth state changed:', event);
            try {
                setSession(session);
                setUser(session?.user);

                if (event === "SIGNED_IN" && session?.user){
                    console.log('User signed in, fetching profile...');
                    await fetchUserProfile(session.user.id);
                }

                if (event === "SIGNED_OUT"){
                    console.log('User signed out');
                    setUserProfile(null);
                }
            } catch (err) {
                console.error('Error handling auth state change:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        });

        // Test Supabase connection
        const testConnection = async () => {
            try {
                const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
                if (error) throw error;
                console.log('Supabase connection test successful');
            } catch (err) {
                console.error('Supabase connection test failed:', err);
            }
        };

        testConnection();

        return () => {
            console.log('Cleaning up auth subscriptions');
            subscription.unsubscribe();
        }
    },[]);

    async function fetchUserProfile(userId){
        console.log('Fetching user profile for:', userId);
        try {
            const {data, error} = await supabase.from('profiles')
                .select('*')
                .eq('id',userId)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
                throw error;
            }

            console.log('User profile retrieved:', data ? 'success' : 'not found');
            setUserProfile(data);
        } catch (error) {
            console.error('fetchUserProfile error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const signInWithGoogle = async ()=>{
        try {
            console.log('Initiating Google sign-in...');
            const next = new URLSearchParams(window.location.search).get('next');
            console.log('Sign-in with Google:', next);
            const {error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options:{
                    // redirectTo: `${window.location.origin}/auth/callback`
                    redirectTo: next ? `${process.env.NEXT_PUBLIC_SITE_URL}${next}`: `${window.location.origin}/auth/callback`
                }
            });
            if(error) {
                throw error
            };
        } catch(error){
            console.error('Google sign-in error:', error);
            setError(error.message);
        }
    }

    const signOut = async () => {
        try {
            console.log('Signing out...');
            const {error} = await supabase.auth.signOut();
            if(error) {
                throw error
            };
            router.push('/');
        } catch(error){
            console.error('Sign-out error:', error);
            setError(error.message);
        }
    }

    const hasRole = (roles) => {
        return userProfile ? roles.includes(userProfile.role) : false;
    }

    // Show error state if something went wrong
    if (error && !loading) {
        console.error('Auth error state:', error);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-600 mb-4">Authentication Error: {error}</p>
                <button
                    onClick={() => {
                        setError(null);
                        setLoading(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Continue Anyway
                </button>
            </div>
        );
    }

    const value = {
        session,
        user,
        userProfile,
        signInWithGoogle,
        signOut,
        loading,
        hasRole,
        error
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}