import client from './client';

export const login = async (email, password) => {
  const { data } = await client.post('/auth/login', { email, password });
  if (data.token) {
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminUser', JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email,
    }));
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

export const getCurrentAdmin = async () => {
  const { data } = await client.get('/auth/me');
  return data;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('adminToken');
};

export const getAdminUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};