import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

class WorkerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      value: null,
      selectedSKills: []
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  updateSearch(event) {
    this.setState({
      search: event.target.value.substr(0, 25)
    });
  }

  rendePositionSkills() {
    console.log(this.state.value)
    return (
      <div>

      </div>
    )

  }

  getSortedAndFilteredData() {
    if (this.state.value){

      return (this.state.value[1].filter((data) => {
        return data.toLowerCase().includes(this.state.search.toLowerCase());
      }));
    }
    return (this.props.skills.filter((data) => {
      return data.toLowerCase().includes(this.state.search.toLowerCase());
    }));

  }

  render() {
    console.log(this.props)
    console.log(22, this.state.value)

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
            <SelectField onChange={this.handleChange} value={this.state.value? this.state.value: null} floatingLabelText={"Vali positsioon"}>
              {this.state.value ? <MenuItem value={null} primaryText="Kõik positsioonid" /> : null}
              {this.props.positions.map((position, i) => {
                  return (<MenuItem key={i} value={position} primaryText={position[0]}/>)
                }
              )}
            </SelectField>
          </div>
        </div>

        <div className="row">
          <div>
            {this.getSortedAndFilteredData().map((skill, i) => {
              console.log(skill)
              return (
                <Chip
                  key={i}
                  style={{display: "inline-block", margin: "4px"}}
                >
                  {skill}
                </Chip> )
            })}
          </div>
        </div>

      </div>

    )
  }
}

export default WorkerView