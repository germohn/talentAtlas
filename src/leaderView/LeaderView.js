import React from 'react';
import * as R from 'ramda';
import { AutoComplete, Card, CardHeader, CardText, Chip, FlatButton, TextField } from 'material-ui';
import ApiActions from '../ApiActions';
import Search from 'material-ui-icons/Search';

const initialState = {
  talents: [],
  selectedTalents: [],
  search: '',
  workers: []
};

const listStyle = {
  maxHeight: 300,
  overflow: 'scroll'
};

class LeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleTalentSelect = this.handleTalentSelect.bind(this);
    this.handleTalentRemove = this.handleTalentRemove.bind(this);
    this.searchPeople = this.searchPeople.bind(this);
    this.clearAll = this.clearAll.bind(this);

    ApiActions.queryAllSkillsForLeader()
      .then(result => this.setState({talents: result}));
  }

  handleTalentSelect(talent) {
    this.setState({
      selectedTalents: R.uniq(R.append(talent, this.state.selectedTalents)),
      searchString: ''
    });
  }

  handleTalentRemove(talent) {
    this.setState({
      selectedTalents: R.without([talent], this.state.selectedTalents)
    });
  }

  searchPeople() {
    ApiActions.queryWithSkills(this.state.selectedTalents)
      .then(result => this.setState({workers: result}));
  }

  clearAll() {
    this.setState({
      selectedTalents: [],
      workers: [],
      search: ''
    });
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 25)
    });
  }

  getSortedAndFilteredData() {
    return (this.state.talents.filter(talent => {
      return talent.toLowerCase().includes(this.state.search.toLowerCase());
    }));

  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6" style={{backgroundColor: '#ffffff'}}>
            <TextField
              id="text-field-controlled"
              floatingLabelText="Otsi kompetentse..."
              value={this.state.search}
              onChange={(event) => this.updateSearch(event)}
            />
          </div>
          {/*<Chip style={{backgroundColor: '#a0a0a0', display: 'inline-flex', marginTop: '2px'}}>
            <Search
              style={{color: '#ffffff'}}
            />
          </Chip>*/}
          <div className="col-md-6">
            <FlatButton
              label={'OTSI TALENTE'}
              onClick={this.searchPeople}
              style={{ backgroundColor: '#00cc66', color: '#ffffff' }}
            />

            <FlatButton
              label={'TÜHISTA'}
              onClick={this.clearAll}
              style={{ backgroundColor: '#a0a0a0', color: '#ffffff', marginLeft: '10px' }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
              <div>
                {this.getSortedAndFilteredData().map((skill, i) => {
                  return (
                    <Chip
                      key={i}
                      style={{ display: 'inline-flex', margin: '4px' }}
                      onClick={() => this.handleTalentSelect(skill)}
                    >
                      {skill}
                    </Chip> )
                })}
              </div>
          </div>
          <div className="col-md-6">
            <h3>Minu talendiotsing:</h3>
            {this.state.selectedTalents.map((skill, i) => {
              return (
                <Chip
                  onRequestDelete={() => this.handleTalentRemove(skill)}
                  key={i}
                  style={{ margin: '4px', backgroundColor: '#990ae3' }}
                  labelStyle={{ color: '#ffffff' }}
                >
                  {skill}
                </Chip> )
            })}
          </div>
        </div>

          <div style={{margin: "30px"}}>
            {this.state.workers.length > 0 ?
              <div>
                <h3>Minu talendioting:</h3>
              {this.state.workers.map((worker, i) => {
              return (
                <Card
                  key={i}
                  style={{marginBottom: "10px"}}
j                >
                  <CardHeader
                    title={worker[0]}
                    subtitle={'Punkte: ' + worker[2]}
                    actAsExpander={true}
                    showExpandableButton={false}
                    subtitleStyle={{position: 'absolute', right: '350px', top: '10px'}}
                  />
                  <CardText expandable={true}>
                    Kompetentside arv: {worker[1]}
                    <br/>
                    Punkte: {worker[2]}
                    <div>
                    {worker[3].map((skill, i) => {
                      return (
                        <Chip
                          key={i}
                          style={{margin: "5px", display: 'inline-block', backgroundColor: '#990ae3'}}
                          labelStyle={{ color: '#ffffff' }}
                        >
                          {skill}
                        </Chip> )
                    })}

                    {R.without(worker[3], this.state.selectedTalents)
                      .map((skill, i) => {
                        return (
                          <Chip
                            key={i}
                            style={{margin: "5px", display: 'inline-block', backgroundColor: '#d3d3d3'}}
                            labelStyle={{ textDecoration: 'line-through', color: '#ffffff' }}
                          >
                            {skill}
                          </Chip> )
                      })
                    }
                    </div>

                  </CardText>
                </Card> )
            })}
              </div>
            : 'Töötajaid pole leitud'}
          </div>
      </div>
    );
  }
}

export default LeaderView;