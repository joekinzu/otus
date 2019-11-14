import React from 'react'
import {Route, NavLink} from 'react-router-dom' 
import Main from './hoc/main'
import City from './components/city'
import CityFull from './components/cityfull'
import Favorites from './components/favorites'
import {connect} from 'react-redux'
import {updatecity, fetchcity} from './store/actions/city'

class App extends React.Component {

    componentDidMount() {
        this.props.fetchcity(this.props.url)
    }

    componentDidUpdate(prevProps,prevState) {
        console.log(prevProps.url,this.props.url)
        if(this.props.url!==prevProps.url){
            this.props.fetchcity(this.props.url)
        }
    }

	render() {
		return (
            <Main>
            <Route path='/' exact render={()=>
                <>
                <input onChange={(e) => this.props.updatecity(e.target.value)}/>
                    <City
                        name={this.props.data.name}
                        temperature={this.props.data && this.props.data.main ? this.props.data.main.temp : null}
                        wind={this.props.data && this.props.data.wind ? this.props.data.wind.speed : null}
                        humidity={this.props.data && this.props.data.main ? this.props.data.main.humidity : null}
                    />
                    <hr/>
                    <Favorites
                        data={this.props.data}
                    />
                </>
            }/>
            <Route path='/town/:name' render={()=>
                <>
                    <NavLink to='/'>Back</NavLink>
                    <CityFull name={this.props.data.name}/>
                </>
            }/>
            </Main>
		)
	}
}

const mapStateToProps = (state) =>{
  return{
    url: state.city.url,
    data: state.city.data
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updatecity: (name) => dispatch(updatecity(name)),
    fetchcity: (name) => dispatch(fetchcity(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
