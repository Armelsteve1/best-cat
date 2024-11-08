import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VoteButton from '../components/VoteButton';
import Loader from '../components/Loader';
import { useScore } from '../context/ScoreContext';
import './VotePage.css';
import { Cat } from '../types/Cat';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const VotePage: React.FC = () => {
  const { cats, setCats, incrementMatchCount, matchCount } = useScore();
  const [currentPair, setCurrentPair] = useState<[Cat, Cat] | null>(null);
  const [animatingButtonId, setAnimatingButtonId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cats`);
        if (!response.ok)
          throw new Error('Erreur lors du chargement des chats');
        const fetchedCats = await response.json();
        setCats(fetchedCats);
        pickRandomPair(fetchedCats);
      } catch (error) {
        console.error('Erreur lors du chargement des chats :', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCats();
  }, [setCats]);

  const pickRandomPair = (catsList: Cat[]) => {
    const shuffledCats = [...catsList].sort(() => 0.5 - Math.random());
    setCurrentPair([shuffledCats[0], shuffledCats[1]]);
  };

  const handleVote = async (selectedCatId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/cats/${selectedCatId}/vote`,
        {
          method: 'POST',
        }
      );
      if (!response.ok) throw new Error('Erreur lors du vote pour le chat');

      incrementMatchCount();
      setAnimatingButtonId(selectedCatId);

      setTimeout(() => {
        setAnimatingButtonId(null);
        pickRandomPair(cats);
      }, 600);
    } catch (error) {
      console.error('Erreur lors du vote pour le chat :', error);
    }
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
        {currentPair?.map((cat) => (
          <div key={cat.id} className="cat-card">
            <div className="cat-image-container">
              <img
                src={cat.name}
                alt={`Chat ${cat.id}`}
                className="cat-image-vote"
                loading="lazy"
              />
            </div>
            <div className="cat-name">Chat {cat.id}</div>
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
