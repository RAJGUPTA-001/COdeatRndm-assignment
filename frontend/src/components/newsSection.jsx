import React from 'react';

function NewsSection({ data }) {
  if (!data || !data.stories) return null;

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    
    return 'just now';
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">📰 Latest Tech News from Hacker News</h2>
        
        <div className="space-y-4">
          {data.stories.map(story => (
            <div key={story.id} className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body p-4">
                <h3 className="card-title text-base">
                  <a 
                    href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover text-blue-600 "
                  >
                    {story.title}
                  </a>
                </h3>
                <div className="flex flex-wrap gap-4 text-sm opacity-70 mt-2">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    <span>{story.score || 0} points</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{story.by || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{getTimeAgo(story.time)}</span>
                  </div>
                  <div className="badge badge-outline badge-sm">{story.type || 'story'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsSection;