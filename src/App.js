import React, {Component} from 'react';
import LeaderViewContainer from './leaderView/LeaderViewContainer'
import LeaderView from './leaderView/LeaderView'
import './App.css';
import positionMockData from './positionMockData';
import skillMockData from './skillMockData';
import WorkerView from './workerView/WorkerView'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  constructor(props) {
    super(props);
    console.log(positionMockData.data)
    this.state = {
      view: true
    };
    this.hanndleMyViewCLick = this.hanndleMyViewCLick.bind(this);
    this.renderInitialView = this.renderInitialView.bind(this);
    this.renderMyView = this.renderMyView.bind(this);
  }

  hanndleMyViewCLick(e) {

    this.setState({
      view: !this.state.view
    })
  }

  renderInitialView() {
    return (
      <WorkerView skills={skillMockData.data[0][0]} positions = {positionMockData.data}/>

    )
  }


  renderMyView() {
    return (
      <LeaderView/>
    )
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">

            <h1 className="App-title">TalentAtlas</h1>
            <button onClick={this.hanndleMyViewCLick}> test</button>
            {this.state.view  ? this.renderInitialView() : this.renderMyView()}

          </header>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
