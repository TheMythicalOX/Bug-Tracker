import { createContext, useContext, useState } from "react";

type UserContextProviderT = {
  children: React.ReactNode;
};

export type User = {
  name?: string;
};

export type UserContextT = {
  user: User;
  primary: string;
  secondary: string;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContextT | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderT) {
  const [user, setUser] = useState<User>({
    name: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        primary: "stone-300",
        secondary: "stone-400",
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("test123");
  }

  return context;
}
