import axiosinstance from "../lib/axios";

export const analyzeSkillGap = async (targetRole, currentSkills) => {
  try {
    const response = await axiosinstance.post('/getskill_gap', {
      targetRole,
      currentSkills
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to analyze skill gap' };
  }
};