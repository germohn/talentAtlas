import React from 'react';
import * as R from 'ramda';
import { AutoComplete, Card, CardHeader, CardText, Chip, FlatButton, Paper } from 'material-ui';
import ApiActions from '../ApiActions';

const initialState = {
  talents: [],
  selectedTalents: [],
  searchString: '',
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

    ApiActions.queryAllSkills()
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
      workers: []
    });
  }

  handleChange(property, value) {
    this.setState({ [property]: value });
  }

  render() {
    return (
      <Paper>
        <div>
          <AutoComplete
            id={'searchAutocomplete'}
            floatingLabelText={'Vali oskused'}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.state.talents}
            openOnFocus={true}
            onNewRequest={item => this.handleTalentSelect(item)}
            onUpdateInput={searchText => this.setState({
              searchString: searchText,
            })}
            searchText={this.state.searchString}
            listStyle={listStyle}
          />

          <FlatButton
            label={'Otsi töötajaid'}
            primary={true}
            onClick={this.searchPeople}
          />

          <FlatButton
            label={'Tühjenda kõik'}
            secondary={true}
            onClick={this.clearAll}
          />
        </div>
        <div>
          {this.state.selectedTalents.length > 0 ?
            <div>
              {this.state.selectedTalents.map((skill, i) => {
                return (
                  <Chip
                    onRequestDelete={() => this.handleTalentRemove(skill)}
                    key={i}
                    style={{padding: "10px", margin: "10px", display: 'inline'}}
                  >
                    {skill}
                  </Chip> )
              })}
            </div> : 'Ühtegi oskust pole valitud'
          }
        </div>

        <div style={{margin: "30px"}}>
          {this.state.workers.length > 0 ?
            <div>
            {this.state.workers.map((worker, i) => {
            return (
              <Card
                key={i}
              >
                <CardHeader
                  title={worker[0]}
                  actAsExpander={true}
                  showExpandableButton={true}
                  />
                <CardText expandable={true}>
                  {worker[3].map((skill, i) => {
                    return (
                      <Chip
                        key={i}
                        style={{padding: "5px", margin: "10px", display: 'inline'}}
                      >
                        {skill}
                      </Chip> )
                  })}

                </CardText>
              </Card> )
          })}
            </div>
          : 'Töötajaid pole leitud'}
        </div>
      </Paper>
    );
  }
}

export default LeaderView;