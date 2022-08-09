import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth();

  return (
    <div className='container'>
      <nav className='d-flex gap-3 py-3'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </nav>

      <div>Logged as {user?.username}</div>

      <div className=''>{children}</div>
    </div>
  );
}
