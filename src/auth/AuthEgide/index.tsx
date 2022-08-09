import { useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { setAuthorizationToken } from '../../services/api';

type LocationType = {
  state?: {
    from?: Location;
  }
};

type AuthTokenResponse = {
  token: string;
  usuario: {
    id: number;
    username: string;
    email: string;
    matricula: string;
    cpf: string;
    active: boolean;
  }
}

export default function AuthEgide() {
  const { state } = useLocation() as LocationType;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user, signin } = useAuth();

  const code = searchParams.get('code');

  useEffect(() => {
    if (code == null) {
      sessionStorage.setItem("@myapp.pathname", `${state?.from?.pathname}`);
  
      window.location.href = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/new`;
    } else if (user == null) {
      axios.post<AuthTokenResponse>(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/token`, { code }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      .then(({ data }) => {
        signin({
          token: data.token,
          user: data.usuario
        });

        setAuthorizationToken(data.token);

        navigate(sessionStorage.getItem('@myapp.pathname') || '/');
      })
    }
  }, [code, navigate, signin, state?.from?.pathname, user]);


  return null;
}
