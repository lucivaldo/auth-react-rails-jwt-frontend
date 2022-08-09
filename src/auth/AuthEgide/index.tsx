import { useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { getToken, setAuthorizationToken } from '../../services/api';

type LocationType = {
  state?: {
    from?: Location;
  }
};

export default function AuthEgide() {
  const { state } = useLocation() as LocationType;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { user, signin, status } = useAuth();

  const code = searchParams.get('code');

  useEffect(() => {
    if (status === "idle") {
      if (code == null) {
        sessionStorage.setItem("@myapp.pathname", `${state?.from?.pathname}`);
        window.location.href = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/new`;
      } else if (user == null) {
        getToken(code)
          .then(({ token, usuario }) => {
            signin({
              token,
              user: usuario
            });

            setAuthorizationToken(token);

            navigate(sessionStorage.getItem('@myapp.pathname') || '/');
          });
      }
    } else if (status === "unauthenticated") {
      sessionStorage.removeItem("@myapp.pathname");
      window.location.href = `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/destroy`;
    }
  }, [code, navigate, signin, state?.from?.pathname, status, user]);


  return null;
}
