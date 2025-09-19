import { createContext, useContext, useEffect, useState, ReactNode } from "react";

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

// Define the three users with their Google Sheets
const USERS: Record<string, Client> = {
  Takshit: {
    id: "1",
    username: "Takshit",
    client_name: "DharatalAI",
    sheet_url: "https://docs.google.com/spreadsheets/d/1tXjPjFEeXe35ZnNO8Npg37N_pqpIeRVrMrfGxK_zUA4/export?format=csv"
  },
  Mercato: {
    id: "2",
    username: "Mercato",
    client_name: "Mercato",
    sheet_url: "https://docs.google.com/spreadsheets/d/1hYNo96-rfZ0FcsG-MzLq0t34R3SPlZ5t6rVYDsQcbjI/export?format=csv"
  },
  Danish: {
    id: "3",
    username: "Danish",
    client_name: "Danish",
    sheet_url: "https://docs.google.com/spreadsheets/d/1T8NN-FpvbuahWnxA99xc8sPVaB2cPoSjlk3CadCJKtU/export?format=csv"
  }
};

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
      // Check if user exists and password matches
      const expectedPassword = `${username}@22`;
      const userRecord = USERS[username];
      
      if (!userRecord || password !== expectedPassword) {
        return { success: false, error: "Invalid credentials" };
      }

      setUser(userRecord);
      localStorage.setItem("chroniq_user", JSON.stringify(userRecord));
      
      return { success: true };
    } catch (error) {
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