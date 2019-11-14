import React from 'react'
import {connect} from 'react-redux'
import {fetchcityfull} from '../store/actions/city'

class CityFull extends React.Component{

    componentDidMount() {
        this.props.fetchcityfull(this.props.name)
    }

    render(){
        return (
            <>
                {console.log('url param: ',this.props.url)}
                <h2>{this.props.name}</h2> 5 day forecast
                <hr/>
                {this.props.fulldata.map((favs,index) => 
                    <li key={index}>
                        {favs.dt_txt + ' - '} 
                        {favs && favs.main ? favs.main.temp : null},
                        {favs && favs.wind ? favs.wind.speed : null}
                    </li>
                )} 
            </>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
      url: state.city.url,
      fulldata: state.city.fulldata
    }
  }
  
const mapDispatchToProps = (dispatch) =>{
    return{
      fetchcityfull: (name) => dispatch(fetchcityfull(name))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CityFull)