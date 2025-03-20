"use client"
import { createContext, useContext, useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {useAuth} from "@/app/context/AuthContext";
import {redirect} from "next/navigation";

const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
    const [subscription, setSubscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const supabase = createClientComponentClient();

    const checkSubscription = async () => {
        try {
            if (!user){
                redirect("/login")
            }
            setIsLoading(true);

            let { data: user_subscriptions, error } = await supabase
                .from('user_subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();
            console.log('user_subscriptions: ', user_subscriptions);
            if (error) {
                console.log('error', error);
            }
            // Check if subscription exists before processing it
            if (user_subscriptions) {
                // Convert the end_date string to a Date object for comparison
                // (Assuming end_date is stored as a timestamp or ISO string in the database)
                const endDate = new Date(user_subscriptions.end_date);
                const currentDate = new Date();

                if (endDate > currentDate) {
                    // Subscription is active
                    console.log('Active subscription found, expires:', endDate);
                    setSubscription(user_subscriptions);
                } else {
                    // Subscription has expired
                    console.log('Subscription expired on:', endDate);
                    setSubscription({ ...user_subscriptions, status: 'expired' });
                }
            } else {
                // No subscription found
                console.log('No subscription found for user');
                setSubscription(null);
            }
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            checkSubscription();
        }
    }, [user]);

    return (
        <SubscriptionContext.Provider
            value={{ subscription, isLoading, error, checkSubscription }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
}

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};