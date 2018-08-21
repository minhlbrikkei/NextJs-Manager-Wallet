import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import Router from 'next/router'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser : null
    }
  }

  componentDidMount () {
    const currentUser = localStorage.getItem('currentUser')
    this.setState({
      currentUser: currentUser
    })
  }

  responseGoogleSuccess = (response) => {
    const userInfo = response.profileObj
    localStorage.setItem('currentUser',userInfo.googleId)
    const currentUser = JSON.parse(localStorage.getItem(userInfo.googleId))
    if(currentUser){
      const {user, wallets, transactions} = currentUser
      console.log(wallets)
      localStorage.setItem(userInfo.googleId, JSON.stringify({
        isLogin: true,
        user: user,
        wallets: wallets,
        transactions: transactions
      }))
    }else{
      localStorage.setItem(userInfo.googleId, JSON.stringify({
        isLogin: true,
        user: {
          name: userInfo.name,
          email: userInfo.email,
          id: userInfo.googleId
        }
      }))
    }
    Router.push('/')
  }

  responseGoogleFail = (response) => (
    console.log('Login Fail')
  )

  render () {
    const {currentUser} = this.state
    if(currentUser){
      Router.push('/')
      return <React.Fragment />
    }
    return (
      <>
        <style jsx='true'>
          {`
            .btnLogin{
              display: block;
              background: rgb(209, 72, 54);
              color: rgb(255, 255, 255);
              width: 190px;
              padding-top: 10px;
              padding-bottom: 10px;
              border-radius: 2px;
              border: 1px solid transparent;
              font-size: 16px;
              font-weight: bold;
              font-family: Roboto;
              margin: 100px auto;
              cursor: pointer;
            }
          `}
        </style>
        <GoogleLogin
          clientId='790061311268-vomoca1v3kcfmig90l3fq8f4e7m0ch7g.apps.googleusercontent.com'
          buttonText='Login With Google'
          onSuccess={this.responseGoogleSuccess}
          onFailure={this.responseGoogleFail}
          className='btnLogin'
        />
      </>
    )
  }
}
export default Login
