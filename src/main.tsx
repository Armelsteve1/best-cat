import ReactDOM from 'react-dom/client';
import App from './App';
import { ScoreProvider } from './context/ScoreContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ScoreProvider>
      <App />
    </ScoreProvider>
  );
}
