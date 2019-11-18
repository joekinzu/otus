import React from 'react'
import {BrowserRouter as Router, Route, NavLink,Switch} from 'react-router-dom'
import CityState  from './context/city/cityState'
import './app.css'
import Main from './hoc/main'
import City from './components/city'
import CityFull from './components/cityfull'
import Favorites from './components/favorites'

const App = () => {

		return (
            <CityState>
            <Router>
            <Main>
            <Switch>
                <Route path='/' exact render={()=>
                    <>
                        <City/>
                        <hr/>
                        <Favorites/>
                    </>
                }/>
                <Route path='/town/:name' render={()=>
                    <>
                        <NavLink to='/'>Back</NavLink>
                        <CityFull/>
                    </>
                }/>
                <Route render={()=>
                    <div>
                        <h1>Not Found</h1>
                        <p className='lead'>The page you are looking for does not exist...</p>
                        <NavLink to='/'>Home</NavLink>
                    </div>
                }/>
            </Switch>    
            </Main>
            </Router>
            </CityState>
		)
}

export default App