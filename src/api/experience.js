import client from './client';

export const getAllExperience = async () => {
  const { data } = await client.get('/experience');
  return data;
};

export const createExperience = async (data) => {
  const { data: res } = await client.post('/experience', data);
  return res;
};

export const updateExperience = async (id, data) => {
  const { data: res } = await client.put(`/experience/${id}`, data);
  return res;
};

export const deleteExperience = async (id) => {
  const { data: res } = await client.delete(`/experience/${id}`);
  return res;
};