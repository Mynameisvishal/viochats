import React from "react";
import { Sidebar, Menu, Divider,Segment, Button,Modal, Icon, Label } from "semantic-ui-react";
import { SliderPicker } from "react-color";
import firebase from '../../firebase';
import {connect } from 'react-redux';
import { setColors } from '../../actions';

class ColorPanel extends React.Component {
  state = {
    modal: false,
    primary:'',
    secondary:'',
    user: this.props.currentUser,
    currentUser: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
    userColor:[],
  };

  componentDidMount(){
    if(this.state.currentUser){

      this.addListener(this.state.currentUser.uid);
    }
  }

  addListener = (id)=>{
    let userColor = [];
    this.state.usersRef
      .child(`${id}/colors`)
      .on('child_added',snap =>{
        userColor.unshift(snap.val());
        this.setState({userColor});
      })
  }

  componentWillUnmount(){
    this.removeListener();
  }

  removeListener = ()=>{
    this.state.usersRef.child(`${this.state.user.uid}/colors`).off()
  }

  handleChangePrimary = color=> this.setState({primary: color.hex});
  handleChangeSecondary = color=> this.setState({secondary: color.hex});

  openModal = ()=> this.setState({modal:true});
  closeModal = ()=> this.setState({modal:false});

  handleSaveColors = ()=>{
    if(this.state.primary && this.state.secondary){
      this.saveColors(this.state.primary,this.state.secondary);
    }
  }

  saveColors = (primary,secondary)=>{
    console.log(this.state.currentUser);
    this.state.usersRef
      .child(`${this.state.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
        secondary
      })
      .then(()=>{
        console.log("Colors Added");
        this.closeModal();
      })
      .catch(err => console.log(err));
  };

  displayUserColor=(colors)=>(
    colors.length > 0 && colors.map((color,i)=>(
      <React.Fragment key={i}>
        <Divider />
        <div 
          className="color__container"
          onClick={()=>this.props.setColors(color.primary,color.secondary)}
        >
          <div className="color__square" style={{background: color.primary}}>
            <div className="color__overlay" style={{background: color.secondary}}>

            </div>
          </div>
          </div>

      </React.Fragment>
    ))
  );

  render() {
    const { modal,primary,secondary, userColor } = this.state;
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" onClick={this.openModal}/>
        {this.displayUserColor(userColor)}
        {/* color Picker Modal  */}
        <Modal basic open={modal}>
          <Modal.Header>Choose App Colors</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="Primary Color"/>
              <SliderPicker color={primary} onChange={this.handleChangePrimary} />
            </Segment>
            <Segment inverted>
              <Label content="Secondary Color"/>
              <SliderPicker color={secondary} onChange={this.handleChangeSecondary} />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSaveColors}>
              <Icon name="checkmark"/>Save  Colors
            </Button>
            <Button color="red" onClick={this.closeModal} inverted>
              <Icon name="remove"/>Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(null,{ setColors })(ColorPanel);
