import React, { Component } from 'react'
import Sidebar from './Sidebar'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {children} = this.props
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
          `}
        </style>
        <h1>LE BA MINh</h1>
        <div>
          <div className='sidebar'>
            <Sidebar />
          </div>
          <div className='content'>
            {children}
          </div>
        </div>
      </>
    )
  }
}

export default Layout
