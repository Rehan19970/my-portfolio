import client from './client';

export const getSettings = async () => {
  const { data } = await client.get('/settings');
  return data;
};

export const updateSettings = async (settingsData) => {
  const { data } = await client.put('/settings', settingsData);
  return data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await client.post('/upload/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await client.post('/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};