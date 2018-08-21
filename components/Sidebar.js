import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleLogout = () => {
    localStorage.removeItem('currentUser')
    Router.push('/login')
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
              width: 90%;
              margin-top: 10px;
              cursor: pointer;
              font-size: 21px;
            }
          `}
        </style>
        <div className='control'>
          <div>
            <ul>
              <li><Link href='/'><a>Thông tin cơ bản</a></Link></li>
              <li><Link href='/wallet'><a>Quản lý Ví</a></Link></li>
              <li><Link href='/expenditure'><a>Quản lý thu chi</a></Link></li>
              <li><Link href='/transaction'><a>Quản lý giao dịch</a></Link></li>
            </ul>
          </div>
          <button type='button' className='btn btn-danger dropdown-toggle' onClick={this.handleLogout}>Logout</button>
        </div>
      </>
    )
  }
}

export default Sidebar
