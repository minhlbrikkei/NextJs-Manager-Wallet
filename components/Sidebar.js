import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

class Sidebar extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  handleLogout = () => {
    // localStorage.removeItem('currentUser')
    // this.props.logOut()
    Router.push('/wallet')
  }

  render() {
    const {props : {user, logOut}} = this
    return (
      <>
        <style jsx='true'>
          {`
            .control ul{
              list-style-type: none;
              padding: 10px;
            }
            .control ul li{
              margin-bottom: 10px;
            }
            button{
              padding: 10px;
              background-color: orange;
              color:#FFFFFF;
              outline: none;
              width: 200px;
              margin-top: 10px;
              cursor: pointer;
              font-size: 21px;
            }
          `}
        </style>
        <div className='control'>
          <div>
            <ul>
              <li><Link href='/user'><a>User Info</a></Link></li>
              <li><Link href='/wallet'><a>Quan ly Vi</a></Link></li>
              <li><Link href='/expenditure'><a>Quan ly Thu chi</a></Link></li>
              <li><Link href='/transaction'><a>Quan ly giao dich</a></Link></li>
            </ul>
          </div>
          <button type='button' className='btn btn-danger dropdown-toggle' >Logout</button>
        </div>
      </>
    )
  }
}

export default Sidebar
