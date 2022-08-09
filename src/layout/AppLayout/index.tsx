import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { user, signout } = useAuth();

  const handleSignout = () => {
    signout();
  };

  return (
    <div className="container">
      <nav className="d-flex gap-3 py-3">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </nav>

      <div className="d-flex gap-2 align-items-center mb-3">
        <p className="mb-0">
          Logged as <strong>{user?.username}</strong>
        </p>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleSignout}
        >
          Signout
        </button>
      </div>

      <div className="">{children}</div>
    </div>
  );
}
