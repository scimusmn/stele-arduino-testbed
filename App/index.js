import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import './App.css';
import Loading from '../Loading';
import ButtonSerial from '../Outputs/ButtonSerial';
import ConsoleSerial from '../Inputs/ConsoleSerial';
import { ARDUINO_READY, WAKE_ARDUINO } from '../Serial/arduinoConstants';
import withSerialCommunication from '../Serial/SerialHOC';

/* eslint import/no-named-as-default-member: "off" */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handshake: false,
    };

    this.checkHandshake = this.checkHandshake.bind(this);
    this.onSerialData = this.onSerialData.bind(this);
    this.updateHandshake = this.updateHandshake.bind(this);
  }

  componentDidMount() {
    const { setOnDataCallback } = this.props;
    setOnDataCallback(this.onSerialData);
    document.addEventListener('keydown', this.handleReset);
    this.checkHandshake();
  }

  onSerialData(data) {
    const { handshake } = this.state;

    if (data.message === ARDUINO_READY.message && !handshake) {
      this.updateHandshake();
    }
  }

  checkHandshake() {
    const { sendData } = this.props;

    sendData(JSON.stringify(WAKE_ARDUINO));

    setTimeout(() => {
      this.checkHandshake();
    }, 5000);
  }

  updateHandshake() {
    this.setState({
      handshake: true,
    });
  }

  render() {
    const { handshake } = this.state;

    if (!handshake) {
      return (
        <Loading />
      );
    }

    return (
      <Fragment>
        <div>
          <ButtonSerial />
          <ButtonSerial />
          <ButtonSerial />
          <ButtonSerial />
          <ButtonSerial />
          <ButtonSerial />
          <ButtonSerial />
          <ButtonSerial />
          <ConsoleSerial />
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  sendData: propTypes.func.isRequired,
  setOnDataCallback: propTypes.func.isRequired,
};

const AppWithSerialCommunication = withSerialCommunication(App);
export default AppWithSerialCommunication;
