import axios from 'axios'

export const START_GEO = 'START_GEO'
export const FOUND_GEO = 'FOUND_GEO'

/*
  콘솔 에러는 크로스 도메인 오류로 발생한 코드였고,
  그래서 일단 단순히 크롬 확장 프로그램인 Allow-Control-Allow-Origin: * 을 설치
  mapApiKey 내 다음 아이디로 발급받은 거로 수정,
  주소도 상세주소 API 호출
  아래 addrName 변수에 현재 위치 주소 값이 들어가있음.
*/

const mapApiKey = '783e02100a2d4cde5cff635cb96a6399';
const mapLink = 'https://apis.daum.net/local/geo/coord2detailaddr'


// https://apis.daum.net/local/geo/coord2addr?apikey={apikey}&longitude=127.10863694633468&latitude=37.40209529907863&inputCoordSystem=WGS84&output=json

export const getUserGeo = (longitude, latitude ) => (dispatch) => {
  axios.get(`${mapLink}?apikey=${mapApiKey}&x=${longitude}&y=${latitude}&inputCoordSystem=WGS84`)
    .then(res => {
        //console.log(res.data)

        let parser = new DOMParser();
        let xmlDoc=parser.parseFromString(res.data, "text/xml");
        let addrName = xmlDoc.getElementsByTagName('old')[0].firstChild.getAttribute('value');

        console.log(addrName);
      }

    )
}
