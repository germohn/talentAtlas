import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {FlatButton} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import TextField from 'material-ui/TextField';
import ApiActions from '../ApiActions';

import Slider from 'material-ui/Slider';
import * as R from 'ramda';


class SkillComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: 0,
      open: true,
      comment:''
    };
    this.handleToolbarClick = this.handleToolbarClick.bind(this)
    this.handleSlider = this.handleSlider.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.saveSkill = this.saveSkill.bind(this)
  }

  handleSlider(event, value) {
    console.log(event)
    console.log(value)
    this.setState({slider: value});
  };

  handleToolbarClick(e) {
    // console.log(this.state);
    const prevState = R.clone(this.state);
    // console.log(this.state.open);
    this.setState({
      open: !this.state.open
    })
  }

  saveSkill(event) {

    console.log({name: this.props.name, skillName:this.props.skill.name, skillLevel: this.state.slider, comment: this.state.comment })
    ApiActions.saveSkillQuery({name: this.props.name, skillName:this.props.skill.name, skillLevel: this.state.slider, comment: this.state.comment })
      .then(result =>{
        console.log(result)
      } );
  }

  handleTextChange(event) {
    this.setState({
      comment: event.target.value,
    });
  };

  render() {
    return (
      <div className="row">
        <Toolbar onClick={this.handleToolbarClick}>
          <ToolbarGroup firstChild={true}>
            <h3 style={{paddingLeft: "15px"}}>{this.props.skill.name}</h3>
          </ToolbarGroup>
          <ToolbarGroup>
            {/*<ToolbarTitle text="Tase"/>*/}


          </ToolbarGroup>
        </Toolbar>
        {this.state.open ? this.renderDetailsBlock() : null}

      </div>

    )
  }

  renderDetailsBlock() {
    return (
      <div className="col-sm-12" style={{backgroundColor: "rgb(232, 232, 232)"}}>
        <div className="col-sm-6">
          <h4>Kompetentsi kirjeldus</h4>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unch
          </p>
        </div>
        <div className="col-sm-5" >
          <Slider
            min={0}
            max={3}
            step={1}
            value={this.state.slider}
            onChange={this.handleSlider}
          />
          <TextField
          id="text-field-controlled"
          floatingLabelText="Täpsustav kommentaar"
          value={this.state.comment}
          onChange={this.handleTextChange}
        />
          {/*<div >*/}
            {/**/}
          {/*</div>*/}
          <div className="row" style={{float: "right"}}>
            <FlatButton
              label={'Kustuta'}
              // primary={true}
              onClick={this.saveSkill}
            />
            <FlatButton
              label={'Loobu'}
              // primary={true}
              onClick={this.remove}
            />
            <FlatButton
              label={'Salvest'}
              primary={true}
              onClick={this.saveSkill}
            />
          </div>

        </div>
        <div className="col-sm-1">
          <IconButton>
            <InfoOutline/>
          </IconButton>
        </div>

      </div>
    )


  }
}

export default SkillComponent;