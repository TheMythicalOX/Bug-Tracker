import { createContext, useContext, useState } from "react";

type UserContextProviderT = {
  children: React.ReactNode;
};

type User = {
  name: string;
  password: string;
};

type UserContextT = {
  user: User;
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
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
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
  //check for cookie
  // if cookie set user

  if (!context) {
    throw new Error("test123");
  }

  return context;
}
