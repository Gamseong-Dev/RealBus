import axios from 'axios'

export const START_GEO = 'START_GEO'
export const FOUND_GEO = 'FOUND_GEO'


const mapApiKey = 'f1fad23a99042bf3f21e4eacec8962c4';
const mapLink = 'https://apis.daum.net/local/geo/coord2addr'


// https://apis.daum.net/local/geo/coord2addr?apikey={apikey}&longitude=127.10863694633468&latitude=37.40209529907863&inputCoordSystem=WGS84&output=json

export const getUserGeo = (longitude, latitude ) => (dispatch) => {
  axios.get(`${mapLink}?apikey=${mapApiKey}&longitude=${longitude}&latitude=${latitude}&inputCoordSystem=WGS84&output=json`)
    .then(res => console.log(res))
}
