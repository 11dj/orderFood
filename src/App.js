import React, { Component } from 'react';
import * as firebase from 'firebase'
import './App.css';
import './firebase'
import * as moment from 'moment';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    value1: 'Hello Apppi',
    value2: 0,
    value3: '',
    time: 'Time',
    lat: 0,
    lng: 0,
  
  };
}

componentWillMount () {
  this.setState({ value2: this.state.value2 + 3})

  const rootRef = firebase.database().ref().child('react')
  const test = rootRef.child('test')
  test.on('value', (snapshot) => {
    console.log(snapshot.child('value1').val())
    this.setState({ value3: snapshot.child('value1').val() })
  })
}

componentDidMount () {
  // const rootRef = firebase.database().ref().child('react')
  // const test = rootRef.child('test')
  // test.on('value', (snapshot) => {
  //   console.log(snapshot.child('value1').val())
  //   this.setState({ value3: snapshot.child('value1').val() })
  // })
}

getLocation = () => {
  console.log('Click')
  var start = new Date().getTime();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = parseFloat(position.coords.latitude)
      let lng = parseFloat(position.coords.longitude)
      console.log(lat, lng)
      this.setState({
        lat: lat,
        lng: lng
      })
      var end = new Date().getTime();
      console.log('time execute :', (end - start)/1000 )
      this.setState({
        time: 'time execute Location: ' + (end - start)/1000 + ' sec'
      })
    }, console.log)
  }
}


  render() {
    let now = moment().fromNow();
    return (
      <div className="App">
        {/* <div className="div1">{this.state.value3}</div> 
        <div className="div1">{this.state.time}</div> 
        <div className="div1">{this.state.lat +', '+ this.state.lng }</div> 
        <div className="div1">
          <button onClick={this.getLocation.bind(this)}> Track</button>
        </div>  */}
        <div className="div1">{now}</div>

      </div>
    );
  }
}

export default App;
