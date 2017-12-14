import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import MySkillsView from './MySkillsView';
import ApiActions from '../ApiActions';

// import {} from '../ApiActions';

class WorkerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selectValue: null,
      selectedSKills: [],
      talents:[],
      roles: []
    };

    ApiActions.queryAllSkills()
      .then(result => {
        console.log(result)
        this.setState({talents: result})
      });
    ApiActions.queryRolesWithSkills()
      .then(result => {
        console.log(result)
        this.setState({roles: result})
      });
  }

  handleChange = (event, index, selectValue) => this.setState({selectValue});

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 25)
    });
  }

  renderMySkills() {
    console.log(this.state.selectValue)
    return (
      <div>

      </div>
    )

  }

  handleSkillClick(event) {
    console.log(event)
    // this.setState({})
  }

  getSortedAndFilteredData() {
    if (this.state.selectValue){

      return (this.state.selectValue[1].filter((data) => {
        return data.toLowerCase().includes(this.state.search.toLowerCase());
      }));
    }
    return (this.state.talents.filter(([id, name]) => {
      return name.toLowerCase().includes(this.state.search.toLowerCase());
    }));

  }

  render() {

    return (
      <div className="container">
        <h2>Töötaja vaade</h2>
        <div className="row">
          <div className="col-sm-6 ">
            <TextField
              id="text-field-controlled"
              floatingLabelText="Otsi oskusi"
              value={this.state.search}
              onChange={(event) => this.updateSearch(event)}
            />
          </div>
          <div className="col-sm-4">
            <SelectField onChange={this.handleChange} value={this.state.selectValue? this.state.selectValue: null} floatingLabelText={"Vali positsioon"}>
              {this.state.selectValue ? <MenuItem value={null} primaryText="Kõik positsioonid" /> : null}
              {this.props.positions.map((position, i) => {
                  return (<MenuItem key={i} value={position} primaryText={position[0]}/>)
                }
              )}
            </SelectField>
          </div>
        </div>

        <div className="row">
          <div>
            {this.getSortedAndFilteredData().map(([id, name]) => {
              return (
                <Chip
                  key={id}
                  style={{display: "inline-block", margin: "4px"}}
                  onClick={this.handleSkillClick()}
                >
                  {name}
                </Chip> )
            })}
          </div>
        </div>
        <MySkillsView />
      </div>

    )
  }
}

export default WorkerView