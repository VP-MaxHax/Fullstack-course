import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  const request = axios.get(baseUrl+"api/all")
  return request.then(response => response.data)
}

const getWeather = async (capital) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  axios.get(`https://pfa.foreca.com/api/v1/location/search/${capital}?lang=es&token=${api_key}`)
  .then(response => {
    const weather = axios.get(`https://pfa.foreca.com/api/v1/observation/latest/${response.data.locations[0].id}?&token=${api_key}`)
    .then(response => {
      console.log(response.data.observations)
      return response.data.observations[0]
    })
  })
}

export default { getAll, getWeather }