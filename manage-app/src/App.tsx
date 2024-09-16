import React from 'react';
import RecipientSelector from './components/RecipientSelector';
import './App.css'; // Stil dosyanızı ekleyin

const App: React.FC = () => {
  return (
    <div className="App">
      <RecipientSelector />
    </div>
  );
};

export default App;
