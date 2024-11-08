import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import './ScorePage.css';
import { useScore } from '../context/ScoreContext';
import { Cat } from '../types/Cat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ScorePage: React.FC = () => {
  const { matchCount } = useScore();
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVotedCats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/voted-cats`);
        if (!response.ok)
          throw new Error('Erreur lors du chargement des chats votés');
        const votedCats = await response.json();
        const sortedCats = votedCats.sort(
          (catA: Cat, catB: Cat) => catB.score - catA.score
        );
        setCats(sortedCats);
      } catch (error) {
        console.error('Erreur lors du chargement des chats votés :', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadVotedCats();
  }, []);

  const totalVotes = cats.reduce((sum, cat) => sum + cat.score, 0);
  const handleBackToVote = () => {
    window.history.back();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="score-page">
      <img src="/best_cat_logo.webp" alt="Best Cat Logo" className="logo" />
      <h1>BEST CAT</h1>
      {totalVotes === 0 ? (
        <div className="no-votes">Aucun vote effectué</div>
      ) : (
        <div className="cat-grid">
          {cats.map((cat, index) => {
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
                <div className={`cat-rank ${podiumClass}-rank`}>
                  {index + 1}
                </div>
                <img
                  src={cat.name}
                  alt={`Chat ${cat.id}`}
                  className="cat-image-score"
                />
                <div className="cat-name">Chat {cat.id}</div>
                <div className="cat-score">Score: {cat.score} pts</div>
              </div>
            );
          })}
        </div>
      )}
      <div className="centered-floating-button" onClick={handleBackToVote}>
        Revenir au vote <br /> ({matchCount} matchs joués)
      </div>
    </div>
  );
};

export default ScorePage;
