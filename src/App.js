import React, { Component } from 'react';
import './App.css';
import './index.css';


import Form from './components/Form';


class App extends Component {

  

  onSubmit = fields => {
    console.log('App component got: ', fields);
  }

  
  render() {
    
    return (
      <div className="App">
      
        <div className="card ml-5 mt-5 mr-5 b">
          <Form onSubmit={fields => this.onSubmit(fields)} />
        </div>
      </div>
    );
  }
}

export default App;
