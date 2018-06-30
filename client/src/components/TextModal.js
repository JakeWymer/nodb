import React, {Component} from 'react';

class TextModal extends Component {
  constructor() {
    super();

    this.state = {
      userInput: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.sendText(this.state.userInput);
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }

  render() {
    let displayClass = this.props.sending ? 'fixed' : 'hide';

    return(
      <div className={`modal-wrap ${displayClass}`}>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

export default TextModal;