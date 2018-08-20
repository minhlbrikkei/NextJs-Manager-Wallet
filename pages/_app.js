import App, {Container} from 'next/app'
import React from 'react'

export default class MyApp extends App {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: '',
      user: {
        id: '',
        name: '',
        email: ''
      }
    }
  }

  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }
  
  componentDidMount () {
    const currentUser = localStorage.getItem('currentUser')
    if(currentUser){
      const user = JSON.parse(localStorage.getItem(currentUser))
      this.setState({
        isLogin: true,
        user:{
          id: currentUser,
          name: user.name,
          email: user.email
        }
      })
    }else{
      this.setState({
        isLogin: false
      })
    }
  }

  fsetState (isLogin, user) {
    this.state({
      isLogin: isLogin,
      user: user
    })
  }
  render () {
    const {Component, pageProps} = this.props
    const {user, isLogin} = this.state
    if(isLogin === '' ){
      return <div>Loading....</div>
    }
    return <Container>
      <Component {...pageProps} isLogin={isLogin} user={user} />
    </Container>
  }
}