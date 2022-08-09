import { createContext, useContext, useState } from 'react';

type AuthType = {
  token: string;
  user: User | null;
};

type AuthStates = 'idle' | 'authenticated' | 'unauthenticated';

type AuthContextType = AuthType & {
  status: AuthStates;
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
  status: 'idle',
  signin: () => null,
  signout: () => null,
};

const AuthContext = createContext<AuthContextType>(INITIAL_STATE);

type AuthProviderProps = {
  children: React.ReactNode;
};

function useAuthProvider(): AuthContextType {
  const [auth, setAuth] = useState<AuthType>(INITIAL_STATE);
  const [status, setStatus] = useState<AuthStates>('idle');

  const signin = ({ user, token }: AuthType) => {
    setAuth({
      user,
      token,
    });

    setStatus('authenticated');
  };

  const signout = () => {
    setStatus('unauthenticated');

    setAuth({
      user: null,
      token: '',
    });
  };

  return {
    ...auth,
    status,
    signin,
    signout,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
