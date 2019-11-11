import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, NavLink } from 'react-router-dom' 
import Main from './hoc/main'
import City from './components/city'
import CityFull from './components/cityfull'
import fetchme from './utils/api'

class App extends React.Component {

	state = { 
    data: [],
    fulldata: [],
    fav:[],
    url: 'Moscow'
	}

  componentDidMount() {
    fetchme(this.state.url,'weather').then((result) => {this.setState({data: result})})
  }

  componentDidUpdate(prevProps,prevState) {
    console.log(prevState.url,this.state.url)
    if(prevState.url!==this.state.url) 
    {fetchme(this.state.url,'weather').then((result) => {this.setState({data: result})})}
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
    fetchme(newdata,'forecast').then((result) => {this.setState({fulldata: result})})
    console.log(this.state.fulldata.cod)
  }

  deleteme = (index) => {
    let data = this.state.fav
    data.splice(index,1)
    this.setState({fav: data})
  }

	render() {
		return (
      <Main>
        <Route path='/' exact render={()=>
          <section>
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
              <li key={index} onClick={this.showme.bind(this,favs.name)}>
              <NavLink to={'/town/'+favs.name}>
                {favs.name},
              </NavLink>
              {favs && favs.main ? favs.main.temp : null},
              {favs && favs.wind ? favs.wind.speed : null}
              - <button onClick={this.deleteme.bind(this,index)}>Delete</button>
              </li>
            )}
          </section>
        }/>
        <Route path='/town/:name' render={()=>
          <section>
            <NavLink to='/'>Back</NavLink>
            {this.state.fulldata.cod ?
            <CityFull fulldata={this.state.fulldata.list}/>:
            <NavLink to='/'>No data</NavLink>}
          </section>}/>
      </Main>
		)
	}
}

render(
	<BrowserRouter><App /></BrowserRouter>, 
	document.getElementById('root')
)
