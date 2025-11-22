import React from 'react';

function RoadmapCard({ data }) {
  if (!data || !data.roadmap) return null;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-2">🗺️ Career Roadmap</h2>
        
        
        <div className="space-y-4">
          {data.roadmap.map((phase, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" defaultChecked={index === 0} /> 
              <div className="collapse-title text-lg font-semibold">
                {phase.phase}
              </div>
              <div className="collapse-content">
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong className="text-primary">Focus:</strong> {phase.skills}
                  </p>
                  <p className="text-sm opacity-80">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoadmapCard;