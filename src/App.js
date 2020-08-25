import React from 'react';
import Home from './components/Home'
import './App.css'

function App() {

let theme = 'light-theme';

const toggleTheme = () => {
  if (theme === 'light-theme') {
    replaceTheme('dark-theme');
    theme = 'dark-theme';
  } else {
    replaceTheme('light-theme');
    theme = 'light-theme'
  }
}

const replaceTheme = (newThemeName) => {
  document.getElementById('app').className = newThemeName;
}

  return (
    <div id='app' className="dark-theme">
    <Home onToggleTheme={toggleTheme} theme={theme}  />
   </div>
  );
}

export default App;
