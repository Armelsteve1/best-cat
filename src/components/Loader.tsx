import './Loader.css';
import catIcon from '../assets/best_cat_logo.webp';

const Loader = () => {
  return (
    <div className="loader">
      <img src={catIcon} alt="Chat qui miaule" className="loader-cat" />
      <p className="loader-text">Miaou... Chargement en cours...</p>
    </div>
  );
};

export default Loader;
