import React, {Component} from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import _ from 'lodash'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      temp_transactions: [],
      walletsTransferList: [],
      walletTransfer: '',
      usersList: [],
      userReceipt: '',
      walletsReceiptList: [],
      walletReceipt: '',
      type: '',
      conditions: {}
    }
  }

  componentWillMount () {
    const {user: {id} } = this.props
    const {transactions, wallets} = JSON.parse(localStorage.getItem(id))

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
    if(Array.isArray(transactions) && Array.isArray(wallets)) {
      this.setState({
        transactions: transactions,
        temp_transactions: transactions,
        walletsTransferList: wallets,
        temp_walletsTransferList: wallets,
        usersList: usersList,
        temp_usersList: usersList,
      })
    }
  }

  handleChange = (event) =>  {
    const target = event.target
    const name = target.name
    let value = target.type === 'checkbox' ? target.checked : target.value
    
    const {user: {id} } = this.props
    const {temp_transactions, type, walletTransfer, userReceipt, walletReceipt, usersList} = this.state
    let {conditions, walletsReceiptList} = this.state
    let transactions = temp_transactions
    if(name === 'type') {
      if(value !== '') {
        conditions.type = value
      }else{
        _.unset(conditions,'type')
      }
    }
    if(name === 'walletTransfer') {
      if(value !== '') {
        conditions.walletTransferID = value
      }else{
        _.unset(conditions,'walletTransferID')
      }
    }
    if(name === 'userReceipt') {
      if(value !== '') {
        conditions.receiptID = userReceipt
        conditions.receiptID = value
        usersList.map((user, index) => {
          if(user.id === value) {
            walletsReceiptList = user.wallets
          }
        })
      }else{
        _.unset(conditions,'receiptID')
      }
    }
    if(name === 'walletReceipt') {
      if(value !== '') {
        conditions.receiverWalletID = value
      }else{
        _.unset(conditions,'receiverWalletID')
      }
    }
    console.log('condition',conditions)
    transactions = _.filter(transactions,conditions)
    console.log('transactions', transactions)
    this.setState({
      [name]: value,
      transactions: transactions,
      conditions: conditions,
      walletsReceiptList: walletsReceiptList
    })
  }

  render () {
    const {transactions, walletsTransferList, walletTransfer, usersList, userReceipt, walletsReceiptList, walletReceipt, type} =  this.state
    return (
      <>
        <style jsx='true'>
          {`
            form{
              width:100%;
            }
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
        <h3>Lịch sử giao dịch:</h3>
        <form>
          <div className='row'>
            <select name='type' value={this.state.type} onChange={this.handleChange}>
              <option value=''>------ Loại giao dịch -----</option>
              <option value='1'>Thu</option>
              <option value='2'>Chi</option>
            </select>
            <select name='walletTransfer' value={this.state.walletTransfer} onChange={this.handleChange}>
              <option value=''>------ Ví chuyển -----</option>
              {
                walletsTransferList.map((wallet, index) => (
                  <option key={index} value={wallet.id}>{wallet.name}</option>
                ))
              }
            </select>
            <select name='userReceipt' value={this.state.userReceipt} onChange={this.handleChange}>
              <option value=''>------ Người Nhận -----</option>
              {
                usersList.map((user, index) => (
                  <option key={index} value={user.id}>{user.name}</option>
                ))
              }
            </select>
            <select name='walletReceipt' value={this.state.walletReceipt} onChange={this.handleChange}>
              <option value=''>------ Ví Nhận -----</option>
              {
                walletsReceiptList.map((wallet, index) => (
                  <option key={index} value={wallet.id}>{wallet.name}</option>
                ))
              }
            </select>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại giao dịch</th>
              <th>Số tiền</th>
              <th>Ví chuyển</th>
              <th>Người Nhận</th>
              <th>Ví Nhận</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {
              transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                  {
                    (transaction.type === '1') ? 'Thu' : 'Chi'
                  }
                  </td>
                  <td>{transaction.money}$</td>
                  <td>{transaction.walletTransferName}</td>
                  <td>{transaction.receiverName}</td>
                  <td>{transaction.receiverWalletName}</td>
                  <td>{transaction.message}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    )
  }
}

export default Layout(History)