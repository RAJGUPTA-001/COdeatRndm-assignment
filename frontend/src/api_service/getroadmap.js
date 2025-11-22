import axiosinstance from "../lib/axios";

export const getCareerRoadmap = async (targetRole) => {
  try {
    const response = await axiosinstance.post('/getroadmap', {
      targetRole
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch roadmap' };
  }
};