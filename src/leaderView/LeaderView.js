import React from 'react';
import { TextField, AutoComplete } from 'material-ui';
import Api from '../Api';
import ApiActions from '../ApiActions';

const initialState = {
  talents: [
    'Java',
    'JavaScript',
    'Python',
    'SQL',
  ]
};

class LeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    ApiActions.queryAllSkills()
      .then(result => console.log(result));

    ApiActions.queryRolesWithSkills()
      .then(result => console.log(result));

    ApiActions.queryWithSkills(['Neo4j', 'Cypher', 'SQL', 'Python arendus', 'Javascript Language', 'CSS', 'Python Language'])
      .then(result => console.log(result));
  }

  render() {
    return (
      <div>
        <div>
          <TextField
            id={'searchTextFields'}
            floatingLabelText={'Search skills'}
          />
        </div>
        <div>
          <AutoComplete
            id={'searchAutocomplete'}
            floatingLabelText={'Search skills'}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.state.talents}
            openOnFocus={true}

          />
        </div>
      </div>
    );
  }


}

export default LeaderView;