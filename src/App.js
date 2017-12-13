import React, {Component} from 'react';
import LeaderView from './leaderView/LeaderView'
import './App.css';
import positionMockData from './positionMockData';
import skillMockData from './skillMockData';
import WorkerView from './workerView/WorkerView';
import { TextField, FlatButton } from 'material-ui';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  constructor(props) {
    super(props);
    console.log(positionMockData.data)
    this.state = {
      viewNum: 0
    };
    this.renderInitialView = this.renderInitialView.bind(this);
    this.renderMyView = this.renderMyView.bind(this);
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
                <button className="btn btn-primary logIn" onClick={() => this.setState({
                  viewNum: 0,
                })}>Algusesse</button>


              </div>


            </header>

          </div>

          {this.state.viewNum === 0 ? <div>
            <TextField
              floatingLabelText={'Kasutajanimi'}
            />
            <FlatButton
              label={'Sisene töötajana'}
              primary={true}
              onClick={() => this.setState({
                viewNum: 1,
              })}
            />

            <FlatButton
              label={'Sisene ülemusena'}
              secondary={true}
              onClick={() => this.setState({
                viewNum: 2,
              })}
            />
          </div> : ''}
          {this.state.viewNum === 1 ? this.renderInitialView() : ''}
          {this.state.viewNum === 2 ? this.renderMyView() : ''}
        </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
