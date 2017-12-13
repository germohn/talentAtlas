import React from 'react';
import { TextField } from 'material-ui';

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
  }

  render() {
    return (
      <div>
          <TextField
            floatingLabelText={'Search skills'}
          />
      </div>
    );
  }


}

export default LeaderView;