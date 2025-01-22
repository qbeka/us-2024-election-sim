import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './components/LandingPage';
import './index.css';

function App() {
  return <LandingPage />;
}

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<App />);
