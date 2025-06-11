import React, { useState, useEffect } from 'react';
import { getStoryVotes, postStoryVote } from '../api/mockApi';
import './styles/VotingWidget.css'; // CSS for this specific widget

const VotingWidget = ({ storyId, userEmail }) => {
    const [votes, setVotes] = useState(0);
    const [isVoted, setIsVoted] = useState(false); // Has the user voted in this session?
    const [isLoading, setIsLoading] = useState(true); // Is data being fetched?
    const [error, setError] = useState('');

    // Function to fetch the current vote count from the API
    const fetchVoteCount = async () => {
        try {
            setError('');
            const response = await getStoryVotes(storyId);
            setVotes(response.votes);
        } catch (err) {
            setError('Could not load votes.');
        } finally {
            setIsLoading(false);
        }
    };

    // The useEffect hook runs when the component first mounts.
    // It's the perfect place to fetch initial data.
    useEffect(() => {
        fetchVoteCount();
    }, [storyId]); // The [storyId] dependency means this effect will re-run if the storyId prop ever changes.

    // Function to handle the vote button click
    const handleVote = async () => {
        setIsLoading(true); // Disable button and show loading state
        setError('');
        try {
            await postStoryVote({ storyId, email: userEmail });
            setIsVoted(true); // Mark as voted to disable the button permanently
            fetchVoteCount(); // Re-fetch the votes to show the new count
        } catch (err) {
            setError('Vote failed. You may have already voted.');
            setIsLoading(false);
        }
    };

    return (
        <div className="voting-widget-container">
            <h3 className="widget-title">Community Votes</h3>
            <div className="vote-count">
                {isLoading && votes === 0 ? '...' : votes}
            </div>
            <button
                onClick={handleVote}
                // The button is disabled if it's loading OR if the user has already successfully voted.
                disabled={isLoading || isVoted}
                className="btn btn-ghost"
            >
                {isVoted ? 'Voted!' : 'Vote for This Tale'}
            </button>
            {error && <p className="widget-error">{error}</p>}
        </div>
    );
};

export default VotingWidget;