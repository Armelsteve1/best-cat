import React from 'react';
import { useScore } from '../context/ScoreContext';
import './ScorePage.css';

const ScorePage: React.FC = () => {
  const { cats, matchCount, resetMatchCount } = useScore();

  // Sort cats by score in descending order
  const sortedCats = [...cats].sort((catA, catB) => catB.score - catA.score);

  // Calculate total votes by summing up all cat scores
  const totalVotes = sortedCats.reduce((sum, cat) => sum + cat.score, 0);

  // Handle button click to reset match count and return to vote page
  const handleBackToVote = () => {
    resetMatchCount();
    window.history.back();
  };

  return (
    <div className="score-page">
      <img src="/best_cat_logo.webp" alt="Best Cat Logo" className="logo" />
      <h1>BEST CAT</h1>

      {/* Show message if there are no votes, else display sorted cat list */}
      {totalVotes === 0 ? (
        <div className="no-votes">Aucun vote effectué</div>
      ) : (
        <div className="cat-grid">
          {sortedCats.map((cat, index) => {
            // Assign podium class based on ranking
            const podiumClass =
              index === 0
                ? 'first'
                : index === 1
                  ? 'second'
                  : index === 2
                    ? 'third'
                    : '';

            return (
              <div key={cat.id} className={`cat-item ${podiumClass}`}>
                <div className="cat-rank">#{index + 1}</div>
                <img
                  src={cat.url}
                  alt={`Chat ${cat.id}`}
                  className="cat-image"
                />
                <div className="cat-name">Chat {cat.id}</div>
                <div className="cat-score">Score: {cat.score} pts</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating button to return to vote page and reset match count */}
      <div className="centered-floating-button" onClick={handleBackToVote}>
        Revenir au vote <br /> ({matchCount} matchs joués)
      </div>
    </div>
  );
};

export default ScorePage;
