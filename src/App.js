import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Home from './components/Home'
import Detail from './components/Detail'
import './App.css'
import { Switch, Route, BrowserRouter} from 'react-router-dom'
import LocaleContext from './LocaleContext';

function App() {

const [countries, setCountries] = useState([]);
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
    <LocaleContext.Provider value={countries}>
      <div id='app' className="dark-theme">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Home {...props} onToggleTheme={toggleTheme} countries={countries} />
              )}
            />
            <Route
              exact
              path="/:countryID"
              render={(props) => (
                <Detail {...props} onToggleTheme={toggleTheme} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </LocaleContext.Provider>
  );
}

export default App;

// abdi was here