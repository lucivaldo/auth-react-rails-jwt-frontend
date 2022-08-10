import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import AppLayout from '../../layout/AppLayout';

type LocationType = {
  state?: {
    from?: Location;
  };
};

export default function AuthExpired() {
  const { signout } = useAuth();
  const { state } = useLocation() as LocationType;
  const navigate = useNavigate();

  const handleSignin = () => {
    signout({ authStatus: 'expired' });

    navigate('/auth/egide', {
      state,
    });
  };

  return (
    <AppLayout>
      <p>Sua sessão expirou</p>

      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignin}
        >
          Realizar login novamente
        </button>
      </div>
    </AppLayout>
  );
}
