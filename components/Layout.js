import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Router from 'next/router'

const Layout = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLogin: null,
        user: {
          name: '',
          email: '',
          id: ''
        }
      }
    }

    componentDidMount() {
      const currentUser = localStorage.getItem('currentUser')
      if (!currentUser) {
        this.setState({
          isLogin: false
        })
      } else {
        const {user} = JSON.parse(localStorage.getItem(currentUser))
        this.setState({
          isLogin: true,
          user: {
            name: user.name,
            email: user.email,
            id: user.id
          }
        })
      }
    }

    render() {
      const { user, isLogin } = this.state
      const { name, email, id } = user
      if (isLogin === null) {
        return <>Loading....</>
      } else if (isLogin === false) {
        Router.push('/login')
        return <React.Fragment />
      }
      return (
        <>
          <style jsx='true'>
            {`
            .sidebar{
              float: left;
              width: 20%;
              box-sizing: border-box;
              padding: 5px 10px;
              border-right: 1px dotted #000000;
              min-height: 1000px;
            }
            .content{
              float: left;
              width: 80%;
              box-sizing: border-box;
              padding: 5px 10px;
            }
            h1{
              text-align: center;
              margin-top: 10px;
              font-size: 32px;
              border-bottom: 1px solid #000000;
            }
          `}
          </style>
          <h1>{name}</h1>
          <div>
            <div className='sidebar'>
              <Sidebar />
            </div>
            <div className='content'>
              <WrappedComponent user={user} isLogin={isLogin} />
            </div>
          </div>
        </>
      )
    }
  }
}

export default Layout