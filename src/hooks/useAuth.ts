import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";
import supabase from "@/services/api/api";

export const useAuth = () => {
    // return true or false if user is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // return user object if user is authenticated
    const [user, setUser] = useState<User | null>(null);
    // return loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = (await supabase.auth.getSession()).data.session;
                setUser(session?.user ?? null);
                setIsAuthenticated(session !== null);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch session:", error);
            }
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "SIGNED_IN") {
                    console.log("User signed in");
                    setUser(session?.user ?? null);
                    setIsAuthenticated(true);
                }
                if (event === "SIGNED_OUT") {
                    console.log("User signed out");
                    setUser(null);
                    setIsAuthenticated(false);
                }
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
    };

    const signUp = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return { isAuthenticated, user, loading, signIn, signUp, signOut };
};
