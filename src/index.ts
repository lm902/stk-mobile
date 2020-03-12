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
    if (debug && window && window.localStorage) {
      window.localStorage.debug = 'leancloud*'
    }
    try {
      AV.init({
        appId: 'W5s1EwL7qA12qOkA7IINQ23S-9Nh9j0Va',
        appKey: 'crb6g0edNaDaHcffiz1F5Y43',
        serverURLs: 'https://stk-mobile.lm902.cn'
      })
      ;(AV.Object as any).register(Watching)
      ;(AV.Object as any).register(Transaction)
      ;(AV.Object as any).register(Holding)
    } catch { }
  }

  /**
   * Current signed in user
   */
  public static get user (): AV.User {
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
    return AV.User.requestPasswordReset(this.email)
  }

  /**
   * Request a verification email to be sent in case the user did not receive the first one
   * 
   * @returns {AV.Promise<unknown>}
   */
  public requestEmailVerify (): AV.Promise<unknown> {
    return AV.User.requestEmailVerfiy(this.email)
  }
}

export class Watching extends AV.Object {
  
}

export class Transaction extends AV.Object {
  
}

export class Holding extends AV.Object {
  
}
