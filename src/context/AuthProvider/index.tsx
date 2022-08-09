import { createContext, useContext, useState } from "react";

type AuthContextType = {
  auth: Auth;
  configureAuth: (authArgs: Auth) => void;
};

type Auth = {
  token: string;
  user: User | null;
}

type User = {
  id: number;
  username: string;
  email: string;
  active: boolean;
};

const DEFAULT_AUTH: Auth = {
  token: '',
  user: null,
}

const INITIAL_STATE: AuthContextType = {
  auth: DEFAULT_AUTH,
  configureAuth: () => null,
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
  const [auth, setAuth] = useState<Auth>(DEFAULT_AUTH);

  const configureAuth = (authArgs: Auth) => {
    setAuth(authArgs);
  }

  return {
    auth,
    configureAuth,
  };
}

export function useAuth() {
  return useContext(AuthContext);
}
