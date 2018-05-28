import React from "react";

class MessageInput extends React.Component {
  state = {
    value: ""
  };

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleClick() {
    this.setState({
      value: ""
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <input
            onChange={this.onChange}
            value={this.state.value}
            type="text"
            className="form-control"
          />
          <button onClick={this.handleClick} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default MessageInput;
