import React, { Component } from 'react';
import io from 'socket.io-client'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import Swal from 'sweetalert2'
import './App.css';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: io('localhost:4200'),
      response: false
    }
  }

  componentDidMount() {
    this.state.socket.on('connect', () => {
      console.log('Client connected')
    })
    
    this.state.socket.on('disconnect', () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...!!!',
        text: 'You are offline!'
      })
    })

    this.state.socket.on('welcomeMessage', (message, callback) => {
      callback()
      Swal.fire(
        message.title ? message.title : '',
        message.message ? message.message : '',
        'success'
      )
    })
  }

  sendMessage(evt) {
    evt.preventDefault()
    const formData = new window.FormData(evt.target)
    const username = formData.get('username')
    const message = formData.get('message')
    
    this.state.socket.emit('sendMessage', {
      user: username,
      message
    }, function() {
      console.log('Message received by Server!')
    })

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Message sent!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  render() {
    return (
      <div className="App" style={{ width: '30%', marginLeft: '35%', marginTop: '3em' }}>
        <Form onSubmit={this.sendMessage.bind(this)}>
          <FormGroup>
            <Label for="username">Username:</Label>
            <Input id="username" type="text" name="username" />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message:</Label>
            <Input id="message" type="text" name="message" />
          </FormGroup>
          <FormGroup>
            <Input type="submit" value="Send message" className="btn btn-primary" />
          </FormGroup>
        </Form>
      </div>
    );
  }
}
