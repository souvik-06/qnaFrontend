import { createContext, useState } from "react";

const AuthContext: any = createContext({});

export const AuthProvider: any = ({ children }: any) => {
  const [auth, setAuth]: any = useState({});

  // console.log(auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
