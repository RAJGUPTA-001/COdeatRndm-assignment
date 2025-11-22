import React from 'react';

function SkillGapCard({ data }) {
  if (!data) return null;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-2">📊 Skill Gap Analysis</h2>
        
        <div className="badge badge-info badge-lg mb-4">
          Coverage: <strong className="ml-1">{data.coverage}</strong>
        </div>

        <div className="divider"></div>

        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span className="text-success">✅</span> Matched Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.matchedSkills.length > 0 ? (
            data.matchedSkills.map(skill => (
              <div key={skill} className="badge badge-success badge-lg">
                {skill}
              </div>
            ))
          ) : (
            <p className="text-sm opacity-70">No matched skills yet</p>
          )}
        </div>

        <div className="divider"></div>

        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span className="text-error">❌</span> Missing Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.missingSkills.length > 0 ? (
            data.missingSkills.map(skill => (
              <div key={skill} className="badge badge-error badge-lg">
                {skill}
              </div>
            ))
          ) : (
            <div className="badge badge-success badge-lg">
              You have all required skills! 🎉
            </div>
          )}
        </div>

        <div className="divider"></div>

        <div className="alert alert-warning">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-bold">💡 Recommendation:</p>
              <p className="text-sm">{data.recommendations}</p>
              
              {data.suggestedLearningOrder && data.suggestedLearningOrder.length > 0 && (
                <div className="mt-3">
                  <p className="font-semibold text-sm">Suggested Learning Order:</p>
                  <ol className="list-decimal list-inside text-sm mt-1">
                    {data.suggestedLearningOrder.slice(0, 5).map((skill, index) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillGapCard;