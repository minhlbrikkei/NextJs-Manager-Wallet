import React, { Component } from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      walletsList: [],
      walletID: '',
      transaction_type: '',
      money: '',
      walletBalance: '',
      message: ''
    }
  }

  componentWillMount () {
    const { user: {id} } = this.props
    const {wallets} = JSON.parse(localStorage.getItem(id))
    if(Array.isArray(wallets)) {
      this.setState({
        walletsList: wallets
      })
    }
  }
  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const {walletsList} = this.state
    if(name === 'walletID') {
      walletsList.map((wallet, index) => {
        if(wallet.id === value) {
          this.setState({
            walletBalance: wallet.money
          })
        }
      })
    }
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let {walletID, transaction_type, money, walletBalance, message} = this.state
    if(walletID === '' || transaction_type === '' || money === '' || walletBalance === '' ){
      alert('Vui lòng nhập đủ thông tin yêu cầu!')
    }else{
      const { user: {id, name} } = this.props
      let userInfo = JSON.parse(localStorage.getItem(id))
      let {isLogin, user, wallets, transactions} = userInfo
      if(!Array.isArray(transactions)) {
        transactions = []
      }
      const transactionID = '_' + Math.random().toString(36).substr(2, 9)
      let transaction = null
      let walletName = null
      switch(transaction_type) {
        case '1':
          // Thu
          wallets.map((wallet, index) => {
            if(wallet.id === walletID) {
              wallet.money = parseInt(wallet.money) + parseInt(money)
              walletBalance = wallet.money
              walletName = wallet.name
            }
          })
          transaction = {
            id: transactionID,
            transferID: id,
            walletTransferID: walletID,
            walletTransferName: walletName,
            receiptID: id,
            receiverName: name,
            receiverWalletID: walletID,
            receiverWalletName: walletName,
            money: money,
            type: transaction_type,
            note: 'Nap tien vao vi',
            message: message
          }
          transactions.push(transaction)
          localStorage.setItem(id, JSON.stringify({
            isLogin: isLogin,
            user: user,
            wallets: wallets,
            transactions: transactions
          }))
          alert('Giao dịch thành công')
          this.setState({
            walletBalance: walletBalance
          })
          break;
        case '2':
          // Chi
          if(parseInt(walletBalance) < parseInt(money)){
            alert('Số dư không đủ để giao dịch')
            break
          }
          wallets.map((wallet, index) => {
            if(wallet.id === walletID) {
              wallet.money = parseInt(wallet.money) - parseInt(money)
              walletBalance = wallet.money
              walletName = wallet.name
            }
          })
          transaction = {
            id: transactionID,
            transferID: id,
            walletTransferID: walletID,
            walletTransferName: walletName,
            receiptID: id,
            receiverName: name,
            receiverWalletID: walletID,
            receiverWalletName: walletName,
            money: money,
            type: transaction_type,
            note: 'Giao dịch tiêu tiền khác chuyển tiền',
            message: message
          }
          transactions.push(transaction)
          localStorage.setItem(id, JSON.stringify({
            isLogin: isLogin,
            user: user,
            wallets: wallets,
            transactions: transactions
          }))
          alert('Giao dịch thành công')
          this.setState({
            walletBalance: walletBalance
          })
          break;
        default:
          console.log('transaction type default errors')
      }
    }
  }

  render () {
    const {walletsList, walletID, transaction_type, money, walletBalance, message} = this.state
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
              width: 300px;
              height: 30px;
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
        <h3>Giao dịch:</h3>
        <form onSubmit={this.handleSubmit}>
          <div className='row'>
            <select name='walletID' value={walletID} onChange={this.handleChange}>
                <option value=''>---------------------- Chọn Ví --------------------- </option>
                {
                  walletsList.map((wallet, index) => (
                    <option value={wallet.id} key={index}> {wallet.name} </option>
                  ))
                }
            </select>
            <span className='sodu'>Số dư: {walletBalance}$</span>
          </div>
          <div className='row'>
            <select name='transaction_type' value={transaction_type} onChange={this.handleChange}>
                <option value=''>----------------- Chọn loại giao dịch -----------------</option>
                <option value='1'>Thu</option>
                <option value='2'>Chi</option>
            </select>
          </div>
          <div className='row'>
            <select name='money' value={money} onChange={this.handleChange}>
                <option value=''>-------------------- Chọn Số tiền --------------------</option>
                <option value='100'>100$</option>
                <option value='200'>200$</option>
                <option value='500'>500$</option>
                <option value='1000'>1000$</option>
            </select>
          </div>
          <div className='row'>
            <label>Ghi chú:
              <br/>
              <textarea name='message' value={message} onChange={this.handleChange} />
            </label>
          </div>
          <input type='submit' value='Submit' className='submit' />
        </form>
      </>
    )
  }
}

export default Layout(Transaction)