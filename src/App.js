import React, {Component} from 'react';
import LeaderViewContainer from './leaderView/LeaderViewContainer'
import LeaderView from './leaderView/LeaderView'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  constructor(props) {
    super(props);
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
      <h2>test esinemne vaade</h2>
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
