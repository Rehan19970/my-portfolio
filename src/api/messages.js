import client from './client';

export const sendMessage = async (messageData) => {
  const { data } = await client.post('/messages', messageData);
  return data;
};

export const getAllMessages = async () => {
  const { data } = await client.get('/messages');
  return data;
};

export const markAsRead = async (id) => {
  const { data } = await client.put(`/messages/${id}/read`);
  return data;
};

export const deleteMessage = async (id) => {
  const { data } = await client.delete(`/messages/${id}`);
  return data;
};