import React, { Component } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'

class Transfers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersList: [],
      currenWalletList: [],
      walletTransferID: '',
      walletTransferBalance: '',
      walletReceiptList: [],
      receiverID: '',
      receiverWalletID: '',
      moneyTransfer: 0,
      note: ''
    }
  }

  componentWillMount() {
    const { user: { name, email, id } } = this.props
    const { wallets } = JSON.parse(localStorage.getItem(id))
    let usersList = []
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      let key = localStorage.key(i)
      if (key !== 'currentUser') {
        let { user: { id, name }, wallets } = JSON.parse(localStorage.getItem(key))
        usersList.push({
          id: id,
          name: name,
          wallets: wallets
        })
      }
    }
    this.setState({
      usersList: usersList,
      currenWalletList: wallets
    })
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    let walletTransferBalance = 0
    let walletTransferID = null
    if (name === 'walletTransferID' && value !== 0) {
      const { user: { id } } = this.props
      const { wallets } = JSON.parse(localStorage.getItem(id))
      wallets.map((wallet) => {
        if (wallet.id === value) {
          walletTransferBalance = wallet.money
          walletTransferID = wallet.id
        }
      })
      this.setState({
        [name]: value,
        walletTransferID: walletTransferID,
        walletTransferBalance: walletTransferBalance
      })
    } else if (name === 'receiverID') {
      const { usersList, walletTransferID } = this.state
      const { user: { id } } = this.props
      let walletReceiptList = []
      usersList.map((user, index) => {
        if (user.id === value) {
          let { wallets } = user
          if (id === value) {
            wallets.map((wallet, index) => {
              if (wallet.id !== walletTransferID) {
                walletReceiptList.push(wallet)
              }
            })
          } else {
            walletReceiptList = wallets
          }
        }
      })
      this.setState({
        [name]: value,
        walletReceiptList: walletReceiptList
      })
    } else {
      this.setState({
        [name]: value,
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { walletTransferID, walletTransferBalance, receiverID, receiverWalletID, moneyTransfer, note } = this.state
    const { user: { id } } = this.props
    const transferUserID = id

    if (walletTransferID === '' || receiverID === '' || receiverID === '' || receiverWalletID === '') {
      alert('Vui lòng nhập đủ thông tin')
    } else {
      if (moneyTransfer <= 0) {
        alert('Số tiền chuyển khoản ít nhất là 1$')
      } else if (walletTransferBalance === 0 || walletTransferBalance < moneyTransfer) {
        alert('Tài khoản không đủ để chuyển tiền')
      } else {
        // handle transfer money
        const transactionID = '_' + Math.random().toString(36).substr(2, 9)
        if (transferUserID === receiverID) {
          let userTransaction = JSON.parse(localStorage.getItem(transferUserID))
          let walletTransaction = userTransaction.wallets
          let banlanceWalletTransaction = parseInt(walletTransferBalance) - parseInt(moneyTransfer)
          //Case 1: chuyen tien trong tai khoan
          walletTransaction.map((wallet, index) => {
            if (wallet.id === walletTransferID) {
              wallet.money = banlanceWalletTransaction
            } else if (wallet.id === receiverWalletID) {
              wallet.money = parseInt(wallet.money) + parseInt(moneyTransfer)
            }
          })
          userTransaction.wallets = walletTransaction
          userTransaction.transactions = {
            id: transactionID,
            transferID: id,
            walletTransferID: walletTransferID,
            ReceiptID: receiverID,
            receiverWalletID: receiverWalletID,
            money: moneyTransfer,
            type: 0, // chuyen tien trong tai khoan
            note: note
          }
          localStorage.setItem(transferUserID, JSON.stringify(userTransaction))
          alert('Chuyển tiền thành công')
          this.setState({
            walletTransferBalance: banlanceWalletTransaction,
            moneyTransfer: moneyTransfer,
            walletTransferID: walletTransferID,
            receiverID: receiverID,
            receiverWalletID: receiverWalletID,
            moneyTransfer: moneyTransfer,
            note: note
          })
        } else {
        // Chuyen tien khac tai khoan
          //handle user transfer
          let userTransfer = JSON.parse(localStorage.getItem(transferUserID))
          let walletTransfer = userTransfer.wallets
          let banlanceWalletTransfer = parseInt(walletTransferBalance) - parseInt(moneyTransfer)
          walletTransfer.map((wallet, index) => {
            if (wallet.id === walletTransferID) {
              wallet.money = banlanceWalletTransfer
            }
          })
          userTransfer.wallets = walletTransfer
          userTransfer.transactions = {
            id: transactionID,
            transferID: id,
            walletTransferID: walletTransferID,
            ReceiptID: receiverID,
            receiverWalletID: receiverWalletID,
            money: moneyTransfer,
            type: 1, // chuyen tien
            note: note
          }
          localStorage.setItem(transferUserID, JSON.stringify(userTransfer))
          //handle user receipt
          let userReceipt = JSON.parse(localStorage.getItem(receiverID))
          let walletsReceipt = userReceipt.wallets
          walletsReceipt.map((wallet, index) => {
            if (wallet.id === receiverWalletID) {
              wallet.money = parseInt(wallet.money) + parseInt(moneyTransfer)
            }
          })
          userReceipt.wallets = walletsReceipt
          userReceipt.transactions = {
            id: transactionID,
            transferID: id,
            walletTransferID: walletTransferID,
            ReceiptID: receiverID,
            receiverWalletID: receiverWalletID,
            money: moneyTransfer,
            type: 2, // chuyen tien
            note: note
          }
          localStorage.setItem(receiverID, JSON.stringify(userReceipt))
          alert('Chuyển tiền thành công')
          this.setState({
            walletTransferBalance: banlanceWalletTransfer,
            moneyTransfer: moneyTransfer,
            walletTransferID: walletTransferID,
            receiverID: receiverID,
            receiverWalletID: receiverWalletID,
            moneyTransfer: moneyTransfer,
            note: note
          })
        }
      }
    }
  }

  render() {
    const { user: { name, email, id } } = this.props
    const { usersList, currenWalletList, walletTransferBalance, walletReceiptList, walletTransferID, receiverID, receiverWalletID } = this.state
    return (
      <>
        <style jsx='true'>
          {`
              .row{
                margin-bottom: 20px;
              }
              label{
                margin-left: 20px;
              }
              .sodu{
                margin-left: 30px;
              }
              select{
                margin-left: 10px;
                outline: none;
                height: 30px;
              }
              input[type=number]{
                height: 30px;
                width: 200px;
                outline: none;
                font-size: 1.5em;
                padding: 5px;
                margin-left: 10px;
              }
              textarea{
                margin: 10px 20px;
                width: 400px;
                height: 200px;
                outline: none;
                padding: 10px;
                font-size: 1.5em;
              }
              .submit{
                padding: 5px 10px;
                width: 200px;
                background-color: green;
                font-size: 2em;
                color: #FFFFFF;
                cursor: pointer;
                outline: none;
                margin-left: 100px;
              }
            `}
        </style>
        <h3>Chuyển tiền :</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='row'><label>Người chuyển : {name}</label></div>
          <div className='row'>
            <label>Ví chuyển:
            <select name='walletTransferID' value={walletTransferID} onChange={this.handleChange}>
                <option value="0">--- Chọn Ví--- </option>
                {currenWalletList.map((wallet, index) => (
                  <option value={wallet.id} key={index} >{wallet.name}</option>
                ))
                }
              </select>
            </label>
            <span className='sodu'>Số dư: {walletTransferBalance}$</span>
          </div>
          <div className='row'>
            <label>Người Nhận:
              <select name='receiverID' value={receiverID} onChange={this.handleChange}>
                <option value="0">--- Chọn người nhận --- </option>
                {
                  usersList.map((user, index) => (
                    <option value={user.id} key={index} >{user.name}</option>
                  ))
                }
              </select>
            </label>
            <label>Ví Nhận:
              <select name='receiverWalletID' value={receiverWalletID} onChange={this.handleChange}>
                <option value="0">--- Chọn Ví nhận --- </option>
                {
                  walletReceiptList.map((wallet, index) => (
                    <option value={wallet.id} key={index} >{wallet.name}</option>
                  ))
                }
              </select>
            </label>
          </div>
          <div className='row'>
            <label>Tiền chuyển:
                <input type='number' name='moneyTransfer' value={this.state.moneyTransfer} onChange={this.handleChange} /> $
              </label>
          </div>
          <div className='row'>
            <label>Ghi chú:
                <br />
              <textarea name='note' value={this.state.note} onChange={this.handleChange} />
            </label>
          </div>
          <input type='submit' value='Chuyển Tiền' className='submit' />
        </form>
      </>
    )
  }
}

export default Layout(Transfers)