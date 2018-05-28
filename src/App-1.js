import React from "react";
// import MessageView from "./MessageView";
// import MessageInput from "./MessageInput";
import { createStore } from "redux";

function reducer(state, action) {
  if (action.type === "ADD_MESSAGE") {
    return {
      messages: state.messages.concat(action.message)
      // messages: "test message reducer"
    };
  } else if (action.type === "DELETE_MESSAGE") {
    return {
      messages: state.messages.slice(action.index + 1, state.messages.length)
    };
  } else {
    return state;
  }
}
const initialState = { messages: [] };

const store = createStore(reducer, initialState);

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    // debugger
    const messages = store.getState().messages;
    console.log(messages);
    return (
      <div className="container">
        <h3>Chat Application</h3>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  }
}

class MessageInput extends React.Component {
  state = {
    value: ""
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
    console.log(this.state.value);
  };

  handleClick = () => {
    store.dispatch({
      type: "ADD_MESSAGE",
      message: this.state.value
    });
    this.setState({
      value: ""
    });
    console.log("handleClick -----------> " + this.state.value);
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <input
            onChange={this.onChange}
            value={this.state.value}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-sm-8">
          <button onClick={this.handleClick} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

class MessageView extends React.Component {
  handleDelete(index) {
    store.dispatch({
      type: "DELETE_MESSAGE",
      index: index
    });
  }
  render() {
    const messages = this.props.messages.map((message, index) => (
      <div key={index} onClick={() => this.handleDelete(index)}>
        {message}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-sm-12">{messages}</div>
      </div>
    );
  }
}
export default App;
