import './VoteButton.css';
import catIcon from '../assets/best_cat_logo.webp';

interface VoteButtonProps {
  onClick: () => void;
  isAnimating: boolean;
}

const VoteButton = ({ onClick, isAnimating }: VoteButtonProps) => {
  return (
    <button className="vote-button" onClick={onClick}>
      <img src={catIcon} alt="Cat Icon" className="cat-icon" />
      {isAnimating && <span className="like-animation">❤️</span>}
    </button>
  );
};

export default VoteButton;
