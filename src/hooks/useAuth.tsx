import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  username: string;
  client_name: string;
  sheet_url: string;
}

interface AuthContextType {
  user: Client | null;
  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("chroniq_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase.rpc('authenticate_client', {
        input_username: username,
        input_password: password
      });

      if (error) {
        console.error('Authentication error:', error);
        return { success: false, error: "Login failed" };
      }

      const result = data[0];
      if (!result || !result.success) {
        return { success: false, error: "Invalid credentials" };
      }

      const clientData: Client = {
        id: result.client_id,
        username: username,
        client_name: result.client_name,
        sheet_url: result.sheet_url,
      };

      setUser(clientData);
      localStorage.setItem("chroniq_user", JSON.stringify(clientData));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: "Login failed" };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("chroniq_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}