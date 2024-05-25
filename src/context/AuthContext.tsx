// import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }: any) => {
//   const [currentUser, setCurrentUser] = useState({});

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user: any) => {
//       setCurrentUser(user);
//     });

//     return () => {
//       unsub();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Define the shape of the context value
interface AuthContextValue {
  currentUser: User | null;
}

// Create the context with the proper type
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
