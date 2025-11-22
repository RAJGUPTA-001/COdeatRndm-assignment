import axiosinstance from "../lib/axios";

export const getLatestNews = async () => {
  try {
    const response = await axiosinstance.get('/getnews');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch news' };
  }
};