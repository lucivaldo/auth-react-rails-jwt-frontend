import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export function setAuthorizationToken(token: string) {
  instance.defaults.headers.common['Authorization'] = `Token ${token}`;
}

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

export async function getToken(code: string) {
  const { data } = await axios.post<AuthTokenResponse>(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/token`, { code }, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  return data;
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
