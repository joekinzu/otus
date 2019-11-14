import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addfavorite, deletefavorite} from '../store/actions/city'

class Favorites extends React.Component{
        
        render(){
            return (
                <>
                    Favorites 
                    <br/> 
                        <button onClick={() => this.props.addfavorite(this.props.data)}>Add</button>
                        {this.props.fav.map((favs,index) =>
                        <li key={index}>
                            <NavLink to={'/town/'+favs.name}>
                                {favs.name},
                            </NavLink>
                            {favs.main.temp},  {favs.wind.speed+'  '}
                            <button onClick={() => this.props.deletefavorite(index)}>Delete</button>
                        </li>
                    )}
                </>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
      fav: state.city.fav
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return{
      addfavorite: (name) => dispatch(addfavorite(name)),
      deletefavorite: (name) => dispatch(deletefavorite(name))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Favorites)