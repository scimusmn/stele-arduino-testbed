/* eslint no-console: 0 */
import React, { Component, Fragment } from 'react';
import {
  Button,
} from 'reactstrap';
import propTypes from 'prop-types';
import withSerialCommunication from '../Serial/SerialHOC';

class ButtonSerial_ extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      value: '',
    };

    this.changeMessage = this.changeMessage.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  changeMessage(event) {
    this.setState({ message: event.target.value });
  }

  changeValue(event) {
    this.setState({ value: event.target.value });
  }

  sendMessage() {
    const { sendData } = this.props;
    const { message } = this.state;
    const mes = message;
    const { value } = this.state;
    const val = value;
    sendData(JSON.stringify({ message: mes, value: val }));
  }

  render() {
    const { message } = this.state;
    const { value } = this.state;
    return (
      <Fragment>
        <form className="button_serial">
          Message:
          <input
            className="button_serial_element"
            type="text"
            value={message}
            onChange={this.changeMessage}
          />
          Value:
          <input
            className="button_serial_element"
            type="text"
            value={value}
            onChange={this.changeValue}
          />
          <Button className="button_serial_element" color="danger" onClick={this.sendMessage}> Send </Button>
        </form>
      </Fragment>
    );
  }
}

ButtonSerial_.propTypes = {
  sendData: propTypes.func.isRequired,
};

const ButtonSerial = withSerialCommunication(ButtonSerial_);

export default ButtonSerial;
