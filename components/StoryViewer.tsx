import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface Story {
  id: string;
  imageUrl: string;
  duration: number;
}

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialStoryIndex,
  onClose,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);

  const advanceStory = useCallback(() => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex < stories.length - 1 ? prevIndex + 1 : 0
    );
  }, [stories.length]);

  useEffect(() => {
    const timer = setTimeout(
      advanceStory,
      stories[currentStoryIndex].duration * 1000
    );
    return () => clearTimeout(timer);
  }, [currentStoryIndex, advanceStory]);

  return (
    <div className="story-viewer">
      <motion.img
        key={stories[currentStoryIndex].id}
        src={stories[currentStoryIndex].imageUrl}
        className="story-image"
        onClick={(e) => {
          const clickPosition = e.clientX / window.innerWidth;
          if (clickPosition < 0.5) {
            setCurrentStoryIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          } else {
            advanceStory();
          }
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default StoryViewer;
