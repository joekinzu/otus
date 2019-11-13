import React from 'react'
import {NavLink} from 'react-router-dom'

class Favorites extends React.Component{

    state = { 
            fav:[],
        }

        addme = (newdata) => {
        let data = this.state.fav
        data.push(newdata)
        this.setState({fav: data})
        }


        deleteme = (index) => {
        let data = this.state.fav
        data.splice(index,1)
        this.setState({fav: data})
        }
        
        render(){
            return (
                <>
                    Favorites 
                    <br/> 
                        <button onClick={this.addme.bind(this,this.props.data)}>Add</button>
                        {this.state.fav.map((favs,index) =>
                        <li key={index}>
                            <NavLink to={'/town/'+favs.name}>
                                {favs.name},
                            </NavLink>
                            {favs.main.temp},  {favs.wind.speed+'  '}
                            <button onClick={this.deleteme.bind(this,index)}>Delete</button>
                        </li>
                    )}
                </>
        )
    }
}

export default Favorites