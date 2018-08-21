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
    const { id } = this.state.user
    const userInfo = JSON.parse(localStorage.getItem(userID))
    const { isLogin, wallets, transactions } = userInfo
    localStorage.setItem(userID, JSON.stringify({
      isLogin: isLogin,
      user: this.state,
      wallets: wallets,
      transactions: transactions
    }))
    Router.push('/login')
  }

  render() {
    const { user, isLogin } = this.props
    const { name, email } = this.state.user
    return (
      <>
        <style jsx='true'>
        {`
          form{
            padding: 20px;
          }
          .row{
            margin-bottom: 10px;
          }
          .emailInfo{
            background-color: gray;
          }
          input{
            margin-left: 10px;
            width: 300px;
            height: 40px;
            padding: 3px 5px;
            font-size: 1.2em;
          }
        `}
        </style>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <label>
              Email:
            <input className='emailInfo' type='text' name='email' value={email} readOnly />
            </label>
          </div>
          <div className='row'>
            <label>
              Name:
            <input className='nameInfo' type='text' name='name' value={name} onChange={this.handleChange} />
            </label>
          </div>
          <input type='submit' value='Update' />
        </form>
      </>
    )
  }
}
export default Layout(User)
