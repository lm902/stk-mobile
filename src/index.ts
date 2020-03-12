import * as AV from 'leancloud-storage'

export default class StkMobile {
  /**
   * User profile client library
   * 
   * @param {string} username Email address for authentication purposes
   * @param {string} password Password for authentication purposes
   * @param {boolean} debug Enable debug message output
   */
  public constructor (private email: string, private password?: string, debug = false) {
    if (debug) {
      window.localStorage.debug = 'leancloud*'
    }
    AV.init({
      appId: 'W5s1EwL7qA12qOkA7IINQ23S-9Nh9j0Va',
      appKey: 'crb6g0edNaDaHcffiz1F5Y43',
      serverURLs: 'https://stk-mobile.lm902.cn'
    })
  }

  /**
   * Current signed in user
   */
  public get user (): AV.User {
    return AV.User.current()
  }

  /**
   * Sign up for a new account
   * User must verify email address to log in
   * 
   * @param {string} name Preferred display name of the user
   * @param {string} email Email address for account recovery purposes
   * @returns {AV.Promise<AV.User>} Current signed in user
   */
  public signUp (name: string): AV.Promise<AV.User> {
    const user = new AV.User()
    user.setUsername(this.email)
    user.setEmail(this.email)
    user.setPassword(this.password)
    user.set('name', name)
    user.set('balance', 1000000)
    return user.signUp()
  }

  /**
   * Log in to an existing account
   * 
   * @returns {AV.Promise<AV.User>} Current signed in user
   */
  public logIn (): AV.Promise<AV.User> {
    return AV.User.logIn(this.email, this.password)
  }

  /**
   * Request a password reset email to be sent
   * 
   * @returns {AV.Promise<unknown>}
   */
  public requestPasswordReset (): AV.Promise<unknown> {
    return AV.User.requestPasswordReset(this.email);
  }
}
