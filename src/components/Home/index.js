import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './Home.css'
import Navbar from '../Navbar'


const Home = () => {
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

    return (
        <div className="home-container">
            <Navbar />
            <div className='home-body-container'>
                <div className="tool-box-container">
                    <div className="search-box-container">
                    </div>
                    <div className="filter-container">
                    </div>
                </div>
                <ul>
                    {
                        array.map(element => {
                            return (
                                <li key={element}>
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

