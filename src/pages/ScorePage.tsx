import React from 'react';
import { useScore } from '../context/ScoreContext';
import './ScorePage.css';

const ScorePage: React.FC = () => {
  const { cats } = useScore();
  const sortedCats = [...cats].sort((a, b) => b.score - a.score);
  const totalVotes = sortedCats.reduce((sum, cat) => sum + cat.score, 0);
  let rank = 1;
  const ranks = sortedCats.map((_, index) => {
    if (index > 0 && sortedCats[index].score === sortedCats[index - 1].score) {
      return rank;
    } else {
      rank = index + 1;
      return rank;
    }
  });

  return (
    <div className="score-page">
      <img src="/best_cat_logo.webp" alt="Best Cat Logo" className="logo" />
      <h1>CATMASH</h1>

      {totalVotes === 0 ? (
        <div className="no-votes">Aucun vote effectué</div>
      ) : (
        <div className="cat-grid">
          {sortedCats.map((cat, index) => (
            <div
              key={cat.id}
              className={`cat-item ${ranks[index] === 1 ? 'first' : ranks[index] === 2 ? 'second' : ranks[index] === 3 ? 'third' : ''}`}
            >
              <div className="cat-rank">
                #{ranks[index]}{' '}
                {index > 0 &&
                sortedCats[index].score === sortedCats[index - 1].score
                  ? 'ex æquo'
                  : ''}
              </div>
              <img src={cat.url} alt={`Chat ${cat.id}`} className="cat-image" />
              <div className="cat-name">Chat {cat.id}</div>
              <div className="cat-score">Score: {cat.score} pts</div>
            </div>
          ))}
        </div>
      )}

      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          Revenir au vote
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
