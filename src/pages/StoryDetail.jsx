import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import stories from '../assets/stories'; // ✅ fixed path
import './styles/StoryDetail.css';
import VotingWidget from '../components/VotingWidget';
import BoostButton from '../components/BoostButton'

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const story = stories.find((s) => s.id === id);

  if (!story) return <p>Story not found.</p>;

  return (
    <main className='story-details-grid'>
      <div className="story-detail container">
        <h2>{story.title}</h2>
        {/* <img src={story.image} alt={story.title} /> */}
        <p>{story.content}</p>
        <button className="back-button" onClick={() => navigate('/stories')}>
          ← Back to Stories
        </button>
      </div>
      <div className='votes-section'>
        <div className="community-votes">
          <VotingWidget storyId={story.id} userEmail={'p@gmail.com'}/>
        </div>
        <div className="boost-button">
          <BoostButton storyId={story.id} />
        </div>
      </div>
    </main>
  );
}