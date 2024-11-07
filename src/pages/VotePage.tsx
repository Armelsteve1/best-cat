import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import VoteButton from '../components/VoteButton';
import { useScore } from '../context/ScoreContext';
import './VotePage.css';
import { Cat } from '../types/Cat';

const VotePage: React.FC = () => {
  const { cats, incrementScore, setCats } = useScore();
  const [currentPair, setCurrentPair] = React.useState<[Cat, Cat] | null>(null);

  useEffect(() => {
    const loadCats = async () => {
      const response = await fetch('https://data.latelier.co/cats.json');
      const data = await response.json();
      setCats(data.images.map((cat: any) => ({ ...cat, score: 0 })));
      pickRandomPair(data.images);
    };
    loadCats();
  }, [setCats]);

  const pickRandomPair = (catsList: Cat[]) => {
    const shuffled = [...catsList].sort(() => 0.5 - Math.random());
    setCurrentPair([shuffled[0], shuffled[1]]);
  };

  const handleVote = (winnerId: string) => {
    incrementScore(winnerId);
    pickRandomPair(cats);
  };

  return (
    <div className="vote-page">
      <h1>Vote for the Cutest Cat</h1>
      <Link to="/scores" className="score-button">
        View Scores
      </Link>
      <div className="cat-container">
        {currentPair &&
          currentPair.map((cat) => (
            <div key={cat.id} className="cat-card">
              <div className="cat-image-container">
                <img src={cat.url} alt="Cute cat" className="cat-image" />
              </div>
              <div className="vote-button-container">
                <VoteButton
                  onClick={() => handleVote(cat.id)}
                  isAnimating={false}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VotePage;
