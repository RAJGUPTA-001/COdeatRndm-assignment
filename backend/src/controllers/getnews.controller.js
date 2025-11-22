import fetch from 'node-fetch';


const getLatestNews = async (req, res) => {
  try {
    const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    
    if (!topStoriesResponse.ok) {
      throw new Error('Failed to fetch top stories from HackerNews');
    }

    const topStoryIds = await topStoriesResponse.json();
    
    const storyIds = topStoryIds.slice(0, 5);
    
    const storyPromises = storyIds.map(id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(res => res.json())
        .catch(err => {
          console.error(`Error fetching story ${id}:`, err);
          return null;
        })
    );
    
    const stories = await Promise.all(storyPromises);
    stories.forEach(story => delete story.kids);

    

    res.json({
      count: stories.length,
      stories: stories,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in getLatestNews:', error);
    res.status(500).json({
      error: 'Failed to fetch news',
      message: error.message
    });
  }
};

export {
  getLatestNews
};