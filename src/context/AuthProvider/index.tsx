import { createContext, useContext, useState } from "react";

type AuthType = {
  token: string;
  user: User | null;
};

type AuthContextType = AuthType & {
  signin: (args: { token: string; user: User }) => void;
  signout: () => void;
};

type User = {
  id: number;
  username: string;
  email: string;
  active: boolean;
};

const INITIAL_STATE: AuthContextType = {
  token: '',
  user: null,
  signin: () => null,
  signout: () => null,
};

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuthProvider(): AuthContextType {
  const [auth, setAuth] = useState<AuthType>(INITIAL_STATE);

  const signin = ({ user, token }: AuthType) => {
    setAuth({
      user,
      token,
    });
  };

  const signout = () => {
    setAuth({
      user: null,
      token: '',
    })
  };

  return {
    ...auth,
    signin,
    signout,
  };
}

export function useAuth() {
  return useContext(AuthContext);
}
