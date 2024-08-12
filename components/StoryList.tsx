import React, { useState, useEffect } from "react";
import axios from "axios";
import StoryViewer from "./StoryViewer";

interface Story {
  id: string;
  imageUrl: string;
  duration: number;
}

const StoryList: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchStories = async () => {
      const response = await axios.get("/api/stories");
      setStories(response.data);
    };
    fetchStories();
  }, []);

  return (
    <div>
      <div className="story-list">
        {stories.map((story, index) => (
          <img
            key={story.id}
            src={story.imageUrl}
            className="story-thumbnail"
            alt={`Story ${story.id}`}
            onClick={() => setCurrentStoryIndex(index)}
          />
        ))}
      </div>
      {currentStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialStoryIndex={currentStoryIndex}
          onClose={() => setCurrentStoryIndex(null)}
        />
      )}
    </div>
  );
};

export default StoryList;
