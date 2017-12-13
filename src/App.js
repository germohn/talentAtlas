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
      <WorkerView skills={skillMockData.data[0][0]} positions={positionMockData.data}/>

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
        <div className="container">
          <div className="App row">
            <header className="App-header">

              <div className="col-sm-8">
                <h1 className="App-title ">TalentAtlas</h1>
              </div>
              <div className="col-sm-offset-2 col-sm-2 ">
                <button className="btn btn-primary logIn" onClick={this.hanndleMyViewCLick}> Vaheta vaadet</button>


              </div>


            </header>

          </div>
          {this.state.view ? this.renderInitialView() : this.renderMyView()}
        </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
