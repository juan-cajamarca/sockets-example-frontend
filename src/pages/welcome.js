import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import io from 'socket.io-client'
import Swal from 'sweetalert2'

export default class Welcome extends Component {
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

    this.state.socket.on('usersList', (message) => {
      Swal.fire({
        position: 'top-end',
        title: message.message,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  signIn(evt) {
    evt.preventDefault()
    const formData = new window.FormData(evt.target)
    const username = formData.get('username')
    
    if (username.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'You forgot something',
        text: 'Username is required!'
      })
    } else {
      this.state.socket.emit('enterChat', {
        username
      }, function(onlineUsers) {
        console.log('Online users:')
        console.log(onlineUsers)
      })
    }
  }

  render() {
    return (
      <div className="App" style={{ width: '30%', marginLeft: '35%', marginTop: '3em' }}>
        <h1>Welcome</h1>
        <Form onSubmit={this.signIn.bind(this)}>
          <FormGroup>
            <Label for="username">Type your username:</Label>
            <Input type="text" name="username" id="username" />
          </FormGroup>
          <FormGroup>
            <Input type="submit" value="Sign in" className="btn btn-primary" />
          </FormGroup>
        </Form>
      </div>
    );
  }
}