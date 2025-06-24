import React, { useState, useEffect } from 'react';
import { getStoryVotes, postStoryVote } from '../api/mockApi';
import './styles/VotingWidget.css'; // CSS for this specific widget

const VotingWidget = ({ storyId, userEmail }) => {
    const [votes, setVotes] = useState(0);
    const [isVoted, setIsVoted] = useState(false); // Has the user voted in this session?
    const [isLoading, setIsLoading] = useState(true); // Is data being fetched?
    const [error, setError] = useState('');

    // ✅ NEW: Function to simulate a boost by manually increasing the vote count
    const handleBoost = () => {
        const boostAmount = 10; // Simulate a $5 boost = +10 votes
        setVotes(prev => prev + boostAmount);
    };

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

    useEffect(() => {
        fetchVoteCount();
    }, [storyId]);

    // Function to handle the vote button click
    const handleVote = async () => {
        setIsLoading(true);
        setError('');
        try {
            await postStoryVote({ storyId, email: userEmail });
            setIsVoted(true);
            fetchVoteCount(); // Refresh vote count after voting
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
                disabled={isLoading || isVoted}
                className="btn btn-ghost"
            >
                {isVoted ? 'Voted!' : 'Vote for This Tale'}
            </button>

            {/* ✅ OPTIONAL: Test button to simulate a boost */}
            <button
                onClick={handleBoost}
                className="btn btn-secondary"
                style={{ marginTop: '10px' }}
            >
                💸 Simulate Boost
            </button>

            {error && <p className="widget-error">{error}</p>}
        </div>
    );
};

export default VotingWidget;
