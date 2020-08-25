import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './Home.css'
import Navbar from '../Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const Home = (props) => {

    const [filterState,setFilterState] = useState('none');
    const toggleFilter = () => {
        if (filterState === 'none'){
            setFilterState('flex');
        } else {
            setFilterState('none');
        }
    }

    const [data, setData] = useState([]);
    const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    useEffect(() => {
        (async function() {
            try {
                const response = await axios('https://restcountries.eu/rest/v2/all');
                console.log(response.data)
                setData(response.data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    const handleChildClick = (e) => {
        e.stopPropagation();
        console.log(e);
        console.log('handleChildClick');
    }

    const onClickRegion = (e) => {
        toggleFilter();
        console.log(e);
    }

    return (
        <div className="home-container">
            <Navbar onToggleTheme={props.onToggleTheme} theme={props.theme} />
            <div className='home-body-container'>
                <div className="tool-box-container">
                    <div className="search-box-container">
                        <FontAwesomeIcon className='search-icon icon-color' icon={faSearch}  />
                        <input className="search-input-container" placeholder="..." />
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
                                <i onClick={ () => onClickRegion('America')}>America</i>
                                <i onClick={ () => onClickRegion('Asia')}>Asia</i>
                                <i onClick={ () => onClickRegion('Oceania')}>Oceania</i>
                            </div>
                    </div>
                </div>
                <ul>
                    {
                        data.map(element => {
                            return (
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
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Home;

