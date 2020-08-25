import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Home from './components/Home'
import './App.css'

function App() {
const [countries, setCountries] = useState([]);
const [countriesByTerm, setCountriesByTerm] = useState([]);
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

useEffect(() => {
    (async function() {
        try {
            const response = await axios('https://restcountries.eu/rest/v2/all');
            setCountries(response.data);
        } catch (e) {
            console.error(e);
        }
    })();
}, []);




  return (
    <div id='app' className="dark-theme">
    <Home onToggleTheme={toggleTheme} theme={theme} countries={countries}  />
   </div>
  );
}

export default App;
