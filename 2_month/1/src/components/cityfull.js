import React from 'react'
import { withRouter } from 'react-router-dom'
import fetchme from '../utils/api'

class CityFull extends React.Component{

    state = { 
        fulldata: [],
        }
    
      componentDidMount() {
        fetchme('Lon','forecast').then((result) => {this.setState({fulldata: result.list})})
      }

    render(){
        return (
            <>
                {console.log('url param: ',this.state.fulldata)}
                <h2>{this.props.name}</h2> 5 day forecast
                <hr/>
                {this.state.fulldata.map((favs,index) => 
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

export default withRouter(CityFull)