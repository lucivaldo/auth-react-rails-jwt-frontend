import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';
import AppLayout from '../../layout/AppLayout';
import { getPosts } from '../../services/api';

export default function Posts() {
  const { user } = useAuth();

  const { data: posts = [] } = useQuery(['posts', user?.id], getPosts);

  return (
    <AppLayout>
      <h2>Posts from {user?.username}</h2>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <div>{post.title}</div>
              <div>{post.content}</div>
            </Link>
          </li>
        ))}
      </ul>
    </AppLayout>
  );
}
