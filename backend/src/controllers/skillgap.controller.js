import roleSkills from '../sample_data/skill_roles.json' with { type: 'json' };


const analyzeSkillGap = (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    
    if (!targetRole || !currentSkills) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Both targetRole and currentSkills are required'
      });
    }

    const requiredSkills = roleSkills[targetRole];

    
    const matchedSkills = currentSkills.filter(skill =>
      requiredSkills.some(req => req.toLowerCase() === skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(req =>
      !currentSkills.some(skill => skill.toLowerCase() === req.toLowerCase())
    );

    // Generate recommendations based on coverage
    const coverage = (matchedSkills.length / requiredSkills.length) * 100;
    const recommendations = generateRecommendations(coverage, missingSkills);

    // Generate suggested learning order
    const suggestedLearningOrder = roleSkills[targetRole];

    // Prepare response
    const analysisResult = {
      matchedSkills,
      missingSkills,
      recommendations,
      suggestedLearningOrder
    };


    // Send response
    res.json(analysisResult);

  } catch (error) {
    console.error('Error in analyzeSkillGap:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

/**
 * Generate recommendations based on skill coverage
 */
function generateRecommendations(coverage, missing) {
//   const coverage = (matched.length / required.length) * 100;

  if (coverage >= 80) {
    return `Excellent! You have most of the required skills. Focus on the missing skills and start applying for positions.Consider learning these also ${missingSkills.join(", ")}`;
  } else if (coverage >= 50) {
    return `Good foundation! You have several key skills. Prioritize learning the missing skills ${missing.join(", ")} to become job-ready.`;
  } else if (coverage >= 30) {
    return `You're on the right track. Focus on building foundational skills start learning ${missing.join(", ")}`;
  } else {
    return "Start with the fundamentals. Follow the roadmap systematically to build a strong foundation.";
  }
}



export  {
  analyzeSkillGap
};