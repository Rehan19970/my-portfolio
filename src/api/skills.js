import client from './client';

export const getAllSkills = async () => {
  const { data } = await client.get('/skills');
  return data;
};

export const createSkill = async (data) => {
  const { data: res } = await client.post('/skills', data);
  return res;
};

export const updateSkill = async (id, data) => {
  const { data: res } = await client.put(`/skills/${id}`, data);
  return res;
};

export const deleteSkill = async (id) => {
  const { data: res } = await client.delete(`/skills/${id}`);
  return res;
};