import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VoteButton from '../components/VoteButton';
import Loader from '../components/Loader';
import { useScore } from '../context/ScoreContext';
import { fetchCats } from '../services/catService';
import './VotePage.css';
import { Cat } from '../types/Cat';

const VotePage: React.FC = () => {
  const { cats, incrementScore, setCats, incrementMatchCount, matchCount } =
    useScore();
  const [currentPair, setCurrentPair] = useState<[Cat, Cat] | null>(null);
  const [animatingButtonId, setAnimatingButtonId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCats = async () => {
      const fetchedCats = await fetchCats();
      setCats(fetchedCats);
      pickRandomPair(fetchedCats);
      setIsLoading(false);
    };
    loadCats();
  }, [setCats]);

  const pickRandomPair = (catsList: Cat[]) => {
    const shuffled = [...catsList].sort(() => 0.5 - Math.random());
    setCurrentPair([shuffled[0], shuffled[1]]);
  };

  const handleVote = (winnerId: string) => {
    incrementScore(winnerId);
    incrementMatchCount();
    setAnimatingButtonId(winnerId);

    setTimeout(() => {
      setAnimatingButtonId(null);
      pickRandomPair(cats);
    }, 600);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="vote-page">
      <div className="header">
        <img src="/best_cat_logo.webp" alt="Best Cat Logo" className="logo" />
        <h1>BEST CAT</h1>
      </div>
      <div className="cat-container">
        {currentPair &&
          currentPair.map((cat) => (
            <div key={cat.id} className="cat-card">
              <div className="cat-image-container">
                <img
                  src={cat.url}
                  alt="Cute cat"
                  className="cat-image"
                  loading="lazy"
                />
              </div>
              <div className="cat-name">
                Chat {cat.id} - Score : {cat.score || 0}
              </div>
              <div className="vote-button-container">
                <VoteButton
                  onClick={() => handleVote(cat.id)}
                  isAnimating={animatingButtonId === cat.id}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="footer">
        <Link to="/scores" className="score-button">
          Voir le classement des chats
        </Link>
        <div className="match-count">{matchCount} matchs joués</div>
      </div>
    </div>
  );
};

export default VotePage;
