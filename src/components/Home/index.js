import React, {useState, useEffect} from 'react'
import './Home.css'
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Home = (props) => {
    const [filterState,setFilterState] = useState('none');
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCountries, setSearchResults] = useState([...props.countries]);

    const toggleFilter = () => {
        if (filterState === 'none'){
            setFilterState('flex');
        } else {
            setFilterState('none');
        }
    }

    const handleChildClick = (e) => {
        e.stopPropagation();
    }

    const onClickRegion = (region) => {
        toggleFilter();
        const countriesFound = props.countries.filter(country => country.region === region && country.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(countriesFound);
    }

    const handleChange = event => {
        setSearchTerm(event.target.value)
    }

    useEffect(() => {
        setSearchResults(props.countries);
    }, [props.countries])

    useEffect(() => {
        if (searchTerm.length) {
            const countriesFound = props.countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(countriesFound);
        } else {
            setSearchResults(props.countries);
        }

    }, [searchTerm]);
    

    return (
        <div className="home-container">
            <Navbar onToggleTheme={props.onToggleTheme} />
            <div className='home-body-container'>
                <div className="tool-box-container">
                    <div className="search-box-container">
                        <FontAwesomeIcon className='search-icon icon-color' icon={faSearch}  />
                        <input 
                            className="search-input-container" 
                            placeholder="..." 
                            value={searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div onClick={toggleFilter} className="filter-container">
                        <p>Filter by Region</p>
                        {
                            filterState === 'none' ? 
                                <FontAwesomeIcon className='icon-color' icon={faChevronUp}  /> 
                                : 
                                <FontAwesomeIcon className='icon-color' icon={faChevronDown}  />
                        }
                            <div onClick={handleChildClick} style={{display: filterState }}  class="dropdown-content">
                                <i onClick={ () => onClickRegion('Africa')}>Africa</i>
                                <i onClick={ () => onClickRegion('Americas')}>Americas</i>
                                <i onClick={ () => onClickRegion('Asia')}>Asia</i>
                                <i onClick={ () => onClickRegion('Europe')}>Europe</i>
                                <i onClick={ () => onClickRegion('Oceania')}>Oceania</i>
                            </div>
                    </div>
                </div>
                <ul>
                    {
                        filteredCountries.map(element => {
                            return (
                                <Link to={element.alpha3Code}>
                                    <li key={element}>
                                        <div className="country-flag-container">
                                            <img className="country-flag-img-style" src={element.flag}/>
                                        </div>
                                        <div className="country-detail-container">
                                            <h3>{element.name}</h3>
                                            <span style={{}}>Population:</span> <span style={{}}>{element.population}</span><br></br>
                                            <span style={{}}>Region:</span> <span style={{}}>{element.region}</span><br></br>
                                            <span style={{}}>Capital:</span> <span style={{}}>{element.capital}</span><br></br>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Home;

