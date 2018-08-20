import React, { Component } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout';

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render () {
    const {isLogin, user} = this.props
    console.log('isLogin:' +isLogin)
    if(!isLogin){
      Router.push('/login')
      return (
        <></>
      )
    }
    return (
      <>
        <style jsx='true'>
          {`
            h1{
              text-align: center;
              margin-top: 10px;
              border-bottom: 1px solid #000000;
            }
          `}
        </style>
        <Layout />
      </>
    )
  }
}
export default Index
