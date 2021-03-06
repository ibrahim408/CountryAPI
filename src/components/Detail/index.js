import React, {useState, useEffect} from 'react'
import './Detail.css'
import Navbar from '../Navbar'
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import LocaleContext from '../../LocaleContext';

const Detail = (props) => {

    const history = useHistory();
    let { countryID } = useParams();
    const [country, setCountry] = useState({});

    useEffect(() => {
        fetchCountryDetails(countryID);
    },[countryID]);

    async function fetchCountryDetails(code){
        try {
            const response = await axios(`https://restcountries.eu/rest/v2/alpha/${code}`);
            setCountry(response.data);
        } catch (error){
            console.log('error',error);
        }
    }

    
    const {
        flag,
        name,
        population = 0,
        nativeName,
        region,
        subregion,
        capital,
        topLevelDomain = ['N/A'],
        currencies = [{code: 'N/A'}],
        languages =  [{name: 'N/A'}],
        borders = ['N/A'],
      } = country;

    const languageText = languages.reduce((acc,curr) => {
        if (acc === "") return `${curr.name}`;
        else return `${acc}, ${curr.name}`;
    },"")
    const populationText = String(population).replace(/(.)(?=(\d{3})+$)/g,'$1,');

    return (
        <LocaleContext.Consumer>
            {(countries) => (
                <div className='detail-main'>
            <Navbar onToggleTheme={props.onToggleTheme} />
            <div className='detail-body-container'>
                <div onClick={() => history.push('/')} className="button-container back-button-width">
                    <FontAwesomeIcon className="icon-color"  icon={faArrowLeft}  /> 
                    <p>Back</p>
                </div>
                <div className="detail-container">
                    <div className="flag-container">
                        <img className="country-flag-img" src={flag} alt="flag N/A"/>
                    </div>
                    <div className="detail-content-container">
                        <h2>{name}</h2>
                        <div className="section-container">
                            <div className="first-section-container">
                                <span>Native Name:</span><span>{nativeName}</span><br/>
                                <span>Population:</span><span>{populationText}</span><br/>
                                <span>Region:</span><span>{region}</span><br/>
                                <span>Sub Region:</span><span>{subregion}</span><br/>
                                <span>Capital:</span><span>{capital}</span><br/>
                            </div>
                            <div className="second-section-container">
                            <span>Top Level Domain: </span><span>{topLevelDomain[0]}</span><br/>
                                <span>Currencies:</span><span>{currencies[0].code}</span><br/>
                                <span>Languages: </span><span> {languageText}</span><br/>
                            </div>
                        </div>
                        <h4>Border Countries:</h4>
                        <div className="border-tags-container">
                        {
                            borders.map( (border, index) => {
                                return (
                                    <div key={index} onClick={() => fetchCountryDetails(border)} className="button-container border-button-width">
                                        <p>{countries.find(country => country.alpha3Code === border)?.name}</p>
                                    </div>
                                )
                            })
                        }
                        </div>


                    </div>
                </div>
            </div>
        </div>
            )}
        </LocaleContext.Consumer>
    );
}

export default Detail;

