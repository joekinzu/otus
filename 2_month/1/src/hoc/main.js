import React from 'react'

class Main extends React.Component {
    render() {
        return(
            <div className='App'>
                <nav className='navbar bg-primary'>
                    <h2>Weather APP</h2>
                </nav>
                <div className='container'>
                 {this.props.children}
                </div>
            </div>    
        )
    }
}

export default Main