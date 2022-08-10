import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import AppLayout from '../../../layout/AppLayout';
import { getPost } from '../../../services/api';

export default function PostsShow() {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    isError: isPostError,
  } = useQuery(['post', id], async () => {
    if (id != null) {
      return getPost(id);
    }

    return null;
  });

  return (
    <AppLayout>
      <h2>Post #{id}</h2>

      {isPostLoading && <p>Loading...</p>}

      {isPostError && (
        <p>
          Erro ao obter o post. Talvez você não tenha autorização para
          visualizar o post.
        </p>
      )}

      {isPostSuccess && (
        <div>
          <p>Title: {post?.title}</p>
          <p>Content: {post?.content}</p>
        </div>
      )}
    </AppLayout>
  );
}
