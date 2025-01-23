"use client"
import { createContext, useContext, useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {useAuth} from "@/app/context/AuthContext";

const SubscriptionContext = createContext();

export function SubscriptionProvider({ children }) {
    const [subscription, setSubscription] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const supabase = createClientComponentClient();

    const checkSubscription = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('active_subscriptions')
                .select('*')
                .eq('user_id', user?.id)
                .single();

            if (error) throw error;
            setSubscription(data);
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