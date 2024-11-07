import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VotePage from './pages/VotePage';
import ScorePage from './pages/ScorePage';
import { ScoreProvider } from './context/ScoreContext';

function App() {
  return (
    <ScoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<VotePage />} />
          <Route path="/scores" element={<ScorePage />} />
        </Routes>
      </Router>
    </ScoreProvider>
  );
}

export default App;
