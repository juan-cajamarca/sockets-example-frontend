import React, { Component } from 'react'
import { BrowserRouter as ReactRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Welcome from './pages/welcome'
import Chat from './pages/chat'

export default class Router extends Component {
  render() {
    return(
      <ReactRouter>
        <App>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </App>
      </ReactRouter>
    )
  }
}