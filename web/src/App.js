import React from 'react'
import ReactDOM from 'react-dom'
import PlayForm from './PlayForm'
import {Requests} from "rps/src/play";
import {FakeRepo} from "rps/src/fakeRepo";

class App extends React.Component {
  render(){
      return <PlayForm requests={new Requests(new FakeRepo())}/>
  }
}

ReactDOM.render(
  <App/>,
  document.querySelector('#app')
)