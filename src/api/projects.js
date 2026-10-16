import client from './client';

export const getAllProjects = async () => {
  const { data } = await client.get('/projects');
  return data;
};

export const getProjectBySlug = async (slug) => {
  const { data } = await client.get(`/projects/${slug}`);
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await client.post('/projects', projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await client.put(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await client.delete(`/projects/${id}`);
  return data;
};