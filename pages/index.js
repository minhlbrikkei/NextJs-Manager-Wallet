import React, { Component } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'

class User extends Component {
  constructor(props) {
    super(props)
    const { user: { email, name, id } } = props
    this.state = {
      isLogin: true,
      user: {
        name: name,
        email: email,
        id: id
      }
    }
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'chckbox' ? target.checked : target.value
    const name = target.name
    const { user: { email, id } } = this.state
    this.setState({
      user: {
        email: email,
        [name]: value,
        id: id
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {id} = this.state.user
    console.log(id)
    localStorage.setItem(id, JSON.stringify(this.state))
    Router.push('/login')
  }

  render() {
    const { user, isLogin } = this.props
    const { name, email } = this.state.user
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Email:
            <input className='emailInfo' type='text' name='email' value={email} readOnly />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input className='nameInfo' type='text' name='name' value={name} onChange={this.handleChange} />
          </label>
        </div>
        <input type='submit' value='Update' />
      </form>
    )
  }
}
export default Layout(User)
