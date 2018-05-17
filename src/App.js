//------------------------------------------------------------------------------
// multiple input in react by Robert I. Horvath 
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import Tooltip from "react-tooltip"
import logo from './logo.svg';
import InlineEdit from 'react-edit-inplace';
import './App.css';

const maxTextLength = 50;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newItem: {
        text: "_____________________________"
      },
      list: [{
      id: 1 + Math.random(),
      value: {
        text: "_____________________________"
      }
    }]
    };

    this.textUpdated = this.textUpdated.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  };

  validateUpdatedText(updatedText){
    Tooltip.hide();
    return (updatedText.length > 0 && updatedText.length <= maxTextLength);
  };

  updateInput(value) {
    this.setState({
     "newItem": {
        text: value
      }
    });
  };

  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: {
        text: this.state.newItem.text.slice()
      }
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: {
        text: "_____________________________"
      }
    });
  };

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  };

  onCancel(){
    alert("Cancel");
  }

  onSave(){
    var savedItems = "Saving: ";
    for(let i=0; i < this.state.list.length-1; i++){
      savedItems += this.state.list[i].value.text;
      if(i < (this.state.list.length-2)){
        savedItems += ", "
      }
    }
    alert(savedItems);
  }

  textUpdated(updatedText) {
    // TODO: update react-edit-inline to pass objects, too
    const updatedTextId = Object.keys(updatedText)[0];
    const updatedTextText = updatedText[updatedTextId];

    // copy current list of items
    const updatedList = [...this.state.list];

    const currentItem = updatedList.filter(item => item.id === parseFloat(updatedTextId))[0];
    currentItem.value.text = updatedTextText;

    this.setState({ list: updatedList });
    Tooltip.hide();

    if(this.state.list[this.state.list.length-1].id == parseFloat(updatedTextId)){
      this.addItem();
    }
  };

  render() {
    return (
      <div className = "App">

        <header className = "App-header">
          <img src = {logo} className = "App-logo" alt = "text.react" />
          <div>
            <span className = "App-title">multi</span> 
            <span className = "App-intro">input</span>
          </div>
        </header>

        <div className = "centerDiv">
          <div class="leftDiv">
          <p><b>Test</b></p>
          </div>
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  <div class="testAttribute">Test attribute</div>
                  <span data-tip data-for="inPlaceEdit">
                    <InlineEdit
                      activeClassName = "editedText"
                      validate = {this.validateUpdatedText}
                      text = {item.value.text}
                      paramName = {"" + item.id}
                      change = {this.textUpdated}
                      style = {{
                        paddingRight: "10px"
                      }} />
                  </span>
                  
                  <Tooltip id="inPlaceEdit" effect="solid">
                    click to edit
                  </Tooltip>

                  {
                    this.state.list[this.state.list.length-1].id != item.id ?
                    <span>
                      <button 
                    data-tip data-for={"deleteButton" + item.id} 
                    onClick={() => this.deleteItem(item.id)}>
                      X
                    </button> <Tooltip id={"deleteButton" + item.id} effect="solid" type="warning">
                    remove "{item.value.text}" from the list, no undo possible
                  </Tooltip></span>
                    : ""
                  }
                </li>
              );
            })}
          </ul>
        </div>
        <button onClick={()=>this.onSave()}>Save</button>
        <button onClick={()=>this.onCancel()}>Cancel</button>
      </div>
    );
  };
}

export default App;
