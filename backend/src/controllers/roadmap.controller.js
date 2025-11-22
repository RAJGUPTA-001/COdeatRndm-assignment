import careerRoadmaps from '../sample_data/mock_roadmap.json' with { type: 'json' };

const getRoadmap = (req, res) => {
  try {
    const { targetRole } = req.body;

    if (!targetRole) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'targetRole is required'
      });
    }

    const roadmap = careerRoadmaps[targetRole];

   
    res.json({
      roadmap
    });

  } catch (error) {
    console.error('Error in getRoadmap:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

export{
  getRoadmap
};