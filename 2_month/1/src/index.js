import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom' 

const City = ({name, temperature, wind, humidity}) => {
	return (
		<section>
			<h2>{name}</h2>
			<p>temperature: {temperature}</p>
			<p>wind: {wind}</p>
			<p>humidity: {humidity}</p>
		</section>
	)
}

class Cities extends React.Component {

	state = { 
    data: [],
    fulldata: [],
    fav:[],
    url: 'Moscow'
	}

  componentDidMount() {
    this.fetchme(this.state.url,'weather').then((result) => {this.setState({data: result})})
  }

  componentDidUpdate(prevProps,prevState) {
    console.log(prevState.url,this.state.url)
    if(prevState.url!=this.state.url) 
    {this.fetchme(this.state.url,'weather').then((result) => {this.setState({data: result})})}
  }

  fetchme = (url,type) => {
    return fetch('https://api.openweathermap.org/data/2.5/'+type+'?q='+url+'&APPID=931f4ae609990c40539f493d8d345801').then(res => res.json())
}

  inputme = (e) => {
    this.setState({url: e.target.value})
  }

  addme = (newdata) => {
    let data = this.state.fav
    data.push(newdata)
    this.setState({fav: data})
  }

  showme = (newdata) => {
    this.fetchme(newdata,'forecast').then((result) => {this.setState({fulldata: result})})
    console.log(this.state.fulldata.cod)
  }

  deleteme = (index) => {
    let data = this.state.fav
    data.splice(index,1)
    this.setState({fav: data})
  }

	render() {
		const { cities } = this.props
		return (
			<div>
      <Route path='/b' exact render={()=><h1>START</h1>}/>

        {console.log(this.state.data && this.state.data.main ? this.state.data.main.temp : null)}
        <input onChange={this.inputme}/>
      <City
        name={this.state.data.name}
        temperature={this.state.data && this.state.data.main ? this.state.data.main.temp : null}
        wind={this.state.data && this.state.data.wind ? this.state.data.wind.speed : null}
        humidity={this.state.data && this.state.data.main ? this.state.data.main.humidity : null}
      />
      <hr/>
      Favorites 
      <br/> 
      <button onClick={this.addme.bind(this,this.state.data)}>Add</button>
      {this.state.fav.map((favs,index) =>
        <li onClick={this.showme.bind(this,favs.name)}>
        {favs.name},
        {favs && favs.main ? favs.main.temp : null},
        {favs && favs.wind ? favs.wind.speed : null}
         - <button onClick={this.deleteme.bind(this,index)}>Delete</button>
         {this.state.fulldata.cod ?
         <p>{this.state.fulldata && this.state.fulldata.city ? this.state.fulldata.city.name : null}</p>:
         null
         }
         </li>
      )}
			</div>
		)
	}
}

render(
	<BrowserRouter><Cities /></BrowserRouter>, 
	document.getElementById('root')
)
