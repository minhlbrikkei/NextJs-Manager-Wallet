import React, { Component } from 'react'
import Layout from '../components/Layout'
import {withRouter} from 'next/router'

class User extends Component {
  componentDidMount() {
    const { router } = this.props
    router.prefetch('/dynamic')
  }
  render() {
    const { router } = this.props
    console.log(router.query)
    return (
      <Layout user={router.query.user}>
        <form>
          <div>
            <label>
              Email:
            <input className='emailInfo' type='text' name='email' readOnly />
            </label>
          </div>
          <div>
            <label>
              Name:
            <input className='nameInfo' type='text' name='name' />
            </label>
          </div>
          <input type='submit' value='Update' />
        </form>
      </Layout>
    )
  }
}
export default withRouter(User)
