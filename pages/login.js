import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import Router from 'next/router'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  responseGoogleSuccess = (response) => {
    const userInfo = response.profileObj
    console.log(userInfo);
    localStorage.setItem('currentUser',userInfo.googleId)
    localStorage.setItem(userInfo.googleId,JSON.stringify({
      user: {
        name: userInfo.name,
        email: userInfo.email
      }
    }))
    Router.back()
  }
  responseGoogleFail = (response) => (
    console.log('Login Fail')
  )
  render () {
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