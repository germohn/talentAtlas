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
      viewNum: 0,
      userName: '',
      nameTextInput: ''
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
        <div>
          <div className="App row">
            <nav className="navbar" style={{ backgroundColor: '#ffffff' }}>

              <div className="col-sm-4">
                <h1 className="App-title " style={{ color: '#990ae3', textAlign: 'left', marginLeft: '60px' }}>
                  <b onClick={() => this.setState({
                    viewNum: 0,
                  })} style={{ cursor: 'pointer' }}>TalentAtlas</b>
                </h1>
              </div>
              <div className="col-sm-4" style={{ textAlign: 'left', color: '#d3d3d3', paddingTop: '30px' }}>
                {this.state.viewNum === 1 ? 'TÖÖTAJA VAADE' : ''}
                {this.state.viewNum === 2 ? 'ÜLEMUSE VAADE' : ''}
              </div>
              <div className="col-sm-offset-2 col-sm-2 " style={{ paddingTop: '20px' }}>

                <h4 style={{ color: '#d3d3d3' }}><b>{this.state.userName}</b></h4>

              </div>


            </nav>

          </div>

          <div className="container">
          {this.state.viewNum === 0 ? <div>
            <TextField
              floatingLabelText={'Kasutajanimi'}
              value={this.state.nameTextInput}
              onChange={(event) => this.setState({
                nameTextInput: event.target.value,
              })}
            />
            <FlatButton
              label={'Sisene töötajana'}
              primary={true}
              onClick={() => this.setState({
                viewNum: 1,
                userName: this.state.nameTextInput
              })}
            />

            <FlatButton
              label={'Sisene ülemusena'}
              secondary={true}
              onClick={() => this.setState({
                viewNum: 2,
                userName: this.state.nameTextInput
              })}
            />
          </div> : ''}
          {this.state.viewNum === 1 ? this.renderInitialView() : ''}
          {this.state.viewNum === 2 ? this.renderMyView() : ''}
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
