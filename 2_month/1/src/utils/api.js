const fetchme = (url,type) => {
    return fetch('https://api.openweathermap.org/data/2.5/'+type+'?q='+url+'&APPID=931f4ae609990c40539f493d8d345801').then(res => res.json())
  }

export default fetchme