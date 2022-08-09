import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3010/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export function setAuthorizationToken(token: string) {
  instance.defaults.headers.common['Authorization'] = `Token ${token}`;
}

type Post = {
  id: number;
  title: string;
  description: string;
}

export async function getPosts() {
  const { data } = await instance.get<Post[]>('posts')
  return data;
}
