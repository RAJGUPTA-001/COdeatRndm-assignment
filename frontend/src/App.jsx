
import { Route,Routes } from 'react-router';
import Homepage from './pages/Homepage';
import { analyzeSkillGap } from './api_service/getskill_gap';
import { getCareerRoadmap } from './api_service/getroadmap';
import { getLatestNews } from './api_service/getnews';
import { useEffect, useState } from 'react';
import CareerInput from './components/careerInput';
import SkillGapCard from './components/skillGapCard';
import RoadmapCard from './components/roadmapCard';
import NewsSection from './components/newsSection';



function App() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedAnalysis = localStorage.getItem('lastAnalysis');
    const savedRoadmap = localStorage.getItem('lastRoadmap');
    const savedNews = localStorage.getItem('lastNews');
    
    if (savedAnalysis) {
      setAnalysisResults(JSON.parse(savedAnalysis));
    }
    if (savedRoadmap) {
      setRoadmapData(JSON.parse(savedRoadmap));
    }
    if (savedNews) {
      setNewsData(JSON.parse(savedNews));
    }
  }, []);

  const handleAnalyze = async (targetRole, currentSkills) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch skill gap analysis
      const skillGapResult = await analyzeSkillGap(targetRole, currentSkills);
      setAnalysisResults(skillGapResult);
      
      // Save to localStorage (bonus feature)
      localStorage.setItem('lastAnalysis', JSON.stringify(skillGapResult));

      // Fetch career roadmap
      const roadmapResult = await getCareerRoadmap(targetRole);
      setRoadmapData(roadmapResult);
      
      // Save to localStorage
      localStorage.setItem('lastRoadmap', JSON.stringify(roadmapResult));

      // Fetch latest news
      const newsResult = await getLatestNews();
      setNewsData(newsResult);
      localStorage.setItem('lastNews', JSON.stringify(newsResult));


    } catch (err) {
      console.error('Error during analysis:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8 bg-white p-6 rounded-lg shadow text-gray-800">
          <h1>🎯 Career Guidance Platform</h1>
          <p>Analyze your skills, discover career roadmaps, and stay updated with tech trends</p>
        </header>

        {/* Input Section */}
        <div className="flex items-center justify-center md:space-x-8 md:space-y-0 ">

        <CareerInput onAnalyze={handleAnalyze} loading={loading} />

        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {/* Results Section */}
        {analysisResults && roadmapData && (
          <>
            <div className="results-section mt-8 space-y-8 flex flex-col md:flex-row md:space-x-8 md:space-y-0">
              <SkillGapCard data={analysisResults} />
              <RoadmapCard data={roadmapData} />
            </div>
             <div className="flex items-center justify-center md:space-x-8 md:space-y-0 py-4" >
            {newsData && <NewsSection data={newsData} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
