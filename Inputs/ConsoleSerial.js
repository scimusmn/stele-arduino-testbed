/* eslint no-console: 0 */
import React from 'react';
import propTypes from 'prop-types';
import withSerialCommunication from '../Serial/SerialHOC';

/* eslint prefer-template: "off" */

class ConsoleSerial_ extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };

    this.onData = this.onData.bind(this);
  }

  componentDidMount() {
    const { setOnDataCallback } = this.props;
    setOnDataCallback(this.onData);
  }

  onData(data) {
    const { logs } = this.state;

    const dataString = JSON.stringify(data);
    if (logs.length < 24) {
      logs.push(dataString + '\n');
    } else {
      logs.shift();
      logs.push(dataString + '\n');
    }
    this.setState({ logs });
  }

  render() {
    const { logs } = this.state;
    return (
      <pre className="console">
        <code>{ logs }</code>
      </pre>
    );
  }
}

ConsoleSerial_.propTypes = {
  setOnDataCallback: propTypes.func.isRequired,
};

const ConsoleSerial = withSerialCommunication(ConsoleSerial_);

export default ConsoleSerial;
