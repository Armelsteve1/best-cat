import React from 'react';
import { useScore } from '../context/ScoreContext';
import './ScorePage.css';

const ScorePage: React.FC = () => {
  const { cats, matchCount } = useScore();
  const sortedCats = [...cats].sort((a, b) => b.score - a.score);

  const totalVotes = sortedCats.reduce((sum, { score }) => sum + score, 0);

  return (
    <div className="score-page">
      <img src="/best_cat_logo.webp" alt="Best Cat Logo" className="logo" />
      <h1>BEST CAT</h1>

      {totalVotes === 0 ? (
        <div className="no-votes">Aucun vote effectué</div>
      ) : (
        <div className="cat-grid">
          {sortedCats.map((cat, index) => {
            let podiumClass = '';
            if (index === 0) {
              podiumClass = 'first';
            } else if (index === 1) {
              podiumClass = 'second';
            } else if (index === 2) {
              podiumClass = 'third';
            }

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
      <div
        className="centered-floating-button"
        onClick={() => window.history.back()}
      >
        Revenir au vote <br /> ({matchCount} matchs joués)
      </div>
    </div>
  );
};

export default ScorePage;
