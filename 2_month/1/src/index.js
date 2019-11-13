import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, NavLink } from 'react-router-dom' 
import Main from './hoc/main'
import City from './components/city'
import CityFull from './components/cityfull'
import fetchme from './utils/api'
import Favorites from './components/favorites'

class App extends React.Component {

	state = { 
    data: [],
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

	render() {
		return (
      <Main>
        <Route path='/' exact render={()=>
          <>
            {console.log(this.state.data && this.state.data.main ? this.state.data.main.temp : null)}
            <input onChange={this.inputme}/>
            <City
              name={this.state.data.name}
              temperature={this.state.data && this.state.data.main ? this.state.data.main.temp : null}
              wind={this.state.data && this.state.data.wind ? this.state.data.wind.speed : null}
              humidity={this.state.data && this.state.data.main ? this.state.data.main.humidity : null}
            />
            <hr/>
            <Favorites
              data={this.state.data}
            />
          </>
        }/>
        <Route path='/town/:name' render={()=>
          <>
            <NavLink to='/'>Back</NavLink>
            <CityFull name={this.state.data.name}/>
          </>}/>
      </Main>
		)
	}
}

render(
	<BrowserRouter><App /></BrowserRouter>, 
	document.getElementById('root')
)
