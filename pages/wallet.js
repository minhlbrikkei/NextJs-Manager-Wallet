import React, { Component } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import _ from 'lodash'

class Wallet extends Component {
  constructor(props) {
    super(props)
    const {id} = props.user
    this.state = {
      userID: id,
      wallets: []
    }
  }

  handleAddWallet = () => {
    const {isLogin, user} = this.props
    let {wallets, userID} = this.state

    let wallet = {
      id: _.uniqueId(),
      money: 0,
      name: 'wallet'
    }
  
    wallets.push(wallet)
    localStorage.setItem(userID,JSON.stringify({
      isLogin: isLogin,
      user: user,
      wallets: wallets
    }))
    this.setState({
      wallets: wallets
    })
  }

  componentWillMount () {
    const {isLogin, user} = this.props
    const {userID} = this.state
    const { wallets } = JSON.parse(localStorage.getItem(userID))
    if(wallets !== undefined){
      this.setState({
        userID: userID,
        wallets: wallets
      })
    }
    localStorage.setItem(userID,JSON.stringify({
      isLogin: isLogin,
      user: user,
      wallets: wallets
    }))
  }

  handleEdit = (id) => {
    let name = prompt("Enter wallet name : ", "enter wallet name")
    const {isLogin, user} = this.props
    let {wallets, userID} = this.state
    wallets.map((item, index) => {
      if(item.id === id){
        item.name = name
      }
    })
    this.setState({
      userID: userID,
      wallets: wallets
    })
    localStorage.setItem(userID,JSON.stringify({
      isLogin: isLogin,
      user: user,
      wallets: wallets
    }))
  } 
  handleRemove = (id) => {
    const {isLogin, user} = this.props
    let {wallets, userID} = this.state
    wallets.map((item, index) => {
      if(item.id === id){
        wallets.splice(index,1)
      }
    })
    this.setState({
      wallets: wallets
    })
    localStorage.setItem(userID,JSON.stringify({
      isLogin: isLogin,
      user: user,
      wallets: wallets
    }))
  }

  render () {
    const {wallets} = this.state
    return (
      <>
        <style jsx='true'>
          {`
            .wallet{
              width: 200px;
              height: 200px;
              display: inline-block;
              text-align: center;
              cursor: pointer;
              margin: 5px;
            }
            .money{
              width: 100%;
              height: 150px;
              text-align: center;
              line-height: 150px;
              font-size: 2em;
              background-color: green;
              color: #FFFFFF;
              margin: 0;
            }
            .walletName{
              margin: 0;
              font-size: 1.5em;
              width: 100%;
              overflow: hidden;
            }
            .remove {
              width:50%;
              margin:0;
              display: inline-block;
              background-color: red;
            }
            .edit{
              width:50%;
              margin:0;
              display: inline-block;
            }
            .addWallet{
              margin-top: 10px;
            }
          `}
        </style>
        <h3>Số lượng ví: </h3>
        <div className='wallet_manager'>
        {
          wallets && wallets.length > 0 &&
            wallets.map((item, index) => (
              <div className='wallet' key={index}>
                <div className='walletName'>{item.name}</div>
                <button className='money'>{item.money} $</button>
                <button onClick={ () => this.handleEdit(item.id) } className='edit'>Edit</button>
                <button onClick={ () => this.handleRemove(item.id) } className='remove'>Remove</button>
              </div>
            ))
        }
        </div>
        <div className='addWallet'>
          <button onClick={this.handleAddWallet}>Thêm Ví</button>
        </div>
      </>
    )
  }
}


export default Layout(Wallet)