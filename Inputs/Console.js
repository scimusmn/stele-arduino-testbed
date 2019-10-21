/* eslint no-console: 0 */
import React from 'react'
import { Hook, Console, Decode } from 'console-feed'

class ConsoleSerial extends React.Component {
  state = {
    logs: []
  }

  componentDidMount() {
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
  }

  render() {
    return (
      <div style={{ backgroundColor: '#242424' }}>
        <Console logs={this.state.logs} variant="dark" />
      </div>
    )
  }
}

export default ConsoleSerial;
