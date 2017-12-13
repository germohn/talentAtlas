import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';

class WorkerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      value: null,
      selectedSKills: []
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
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

    return (this.props.skills.filter((data) => {
      return data.toLowerCase().includes(this.state.search.toLowerCase());
    }));

  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h2>test esinemne vaade</h2>
        <div className="input-group" style={{lenght: '100px'}}>
          <input type="text" className="form-control" placeholder="Search by name..." value={this.state.search}
                 onChange={(event) => this.updateSearch(event)}/>
          <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </span>
        </div>
        <SelectField onChange={this.handleChange} floatingLabelText="Vali positsioon">
          {this.props.positions.map((position, i) => {
              return (<MenuItem key={i} value={position} primaryText={position[0]}/>)
            }
          )}
        </SelectField>
        <div>
          <div className={{display: 'flex', flexWrap: 'wrap'}}>
            {this.getSortedAndFilteredData().map((skill, i) => {
              console.log(skill)
              return (
                <Chip
                  key={i}
                  // onRequestDelete={() => this.handleRequestDelete(data.key)}
                  style={{margin: "10px"}}
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