import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import AuthEgide from './auth/AuthEgide';
import AuthExpired from './auth/Expired';
import { useAuth } from './context/AuthProvider';

import About from './pages/About';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostsShow from './pages/Posts/Show';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user == null) {
    return <Navigate to="/auth/egide" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/egide" element={<AuthEgide />} />
        <Route path="/auth/expired" element={<AuthExpired />} />

        <Route
          path="/about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />

        <Route
          path="/posts"
          element={
            <RequireAuth>
              <Posts />
            </RequireAuth>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <RequireAuth>
              <PostsShow />
            </RequireAuth>
          }
        />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
