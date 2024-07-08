import { useState, useEffect } from 'react'
import axios from 'axios'
import jsonhandler from './components/jsonhandler'

const Filter = ({ nameFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input 
      value={nameFilter}
      onChange={handleFilterChange}
      />
    </div>
  )
}

const Countries = ({ countries, nameFilter, weather, activeCountry, onCountrySelect, setNameFilter }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(nameFilter.toLowerCase()));

  useEffect(() => {
    if (filteredCountries.length === 1) {
      if (activeCountry.name === undefined || activeCountry.name !== filteredCountries[0].name) {
        onCountrySelect(filteredCountries[0]);
      }
    }
  }, [filteredCountries, activeCountry, onCountrySelect]);

  if (filteredCountries.length > 10) {
    return <h3>Too many matches, specify another filter</h3>;
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
      return (
        <div>
          <h2>Country: {country.name.common}</h2>
          <p>Capital: {country.capital[0]}</p>
          <p>Population: {country.population}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <h3>Flag</h3>
          <img src={country.flags.png} alt="flag" width="100" height="100" />
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature: {weather.temperature} Celcius</p>
          <img src={`src/assets/symbols/${weather.symbol}.png`} alt="climate" width="100" height="100" />
          <p>Wind: {weather.windSpeed} m/s {weather.windDirString}</p>
        </div>
      )
    } else if (filteredCountries.length === 0) {
      return <h3>No matches</h3>;
    } else {
      return (
        <div>
          <h2>Countries</h2>
          <ul>
            {filteredCountries.map(country => (
              <li key={country.name.common}>
                {country.name.common}
                <button onClick={() => setNameFilter(country.name.common)}>Show</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };


function App() {
  const [countries, setCountries] = useState([])

  const [activeCountry, setActiveCountry] = useState([])

  const [nameFilter, setNameFilter] = useState('')

  const [weather, setWeather] = useState([]);

  useEffect(() => {
    jsonhandler.getAll().then(response => {
      console.log(response)
      setCountries(response)
    })
  }, [])

  const getWeather = async (capital) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    axios.get(`https://pfa.foreca.com/api/v1/location/search/${capital}?lang=es&token=${api_key}`)
    .then(response => {
      axios.get(`https://pfa.foreca.com/api/v1/observation/latest/${response.data.locations[0].id}?&token=${api_key}`)
      .then(response => {
        console.log(response.data.observations)
        const weather = response.data.observations[0]
        setWeather(weather)
        console.log(weather)
      })
    })
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }

  const handleCountrySelect = (country) => {
    console.log(country);
    setActiveCountry(country);
    getWeather(country.capital[0]);
  };

  return (
    <div>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} nameFilter={nameFilter} weather={weather} activeCountry={activeCountry} onCountrySelect={handleCountrySelect} setNameFilter={setNameFilter} />
    </div>
  )
}


export default App
