import React from 'react';
import Chip from 'material-ui/Chip';
import SkillComponent from "./SkillComponent";

class MySkillsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: 0
    };
  }

  render() {
    return (
      <div>
        {this.props.skills.map((skill) => {
          return (
            <div key={skill.id} className="row " style={{margin: "5px"}}>
              <SkillComponent key={skill.id} skill={skill} name={this.props.name}/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MySkillsView;