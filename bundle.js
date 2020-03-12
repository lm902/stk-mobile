(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('leancloud-storage')) :
    typeof define === 'function' && define.amd ? define(['leancloud-storage'], factory) :
    (global = global || self, global.StkMobile = factory(global.AV));
}(this, (function (AV) { 'use strict';

    class StkMobile {
        /**
         * User profile client library
         *
         * @param {string} username Email address for authentication purposes
         * @param {string} password Password for authentication purposes
         * @param {boolean} debug Enable debug message output
         */
        constructor(email, password, debug = false) {
            this.email = email;
            this.password = password;
            if (debug) {
                window.localStorage.debug = 'leancloud*';
            }
            AV.init({
                appId: 'W5s1EwL7qA12qOkA7IINQ23S-9Nh9j0Va',
                appKey: 'crb6g0edNaDaHcffiz1F5Y43',
                serverURLs: 'https://stk-mobile.lm902.cn'
            });
        }
        /**
         * Current signed in user
         */
        get user() {
            return AV.User.current();
        }
        /**
         * Sign up for a new account
         * User must verify email address to log in
         *
         * @param {string} name Preferred display name of the user
         * @param {string} email Email address for account recovery purposes
         * @returns {AV.Promise<AV.User>} Current signed in user
         */
        signUp(name) {
            const user = new AV.User();
            user.setUsername(this.email);
            user.setEmail(this.email);
            user.setPassword(this.password);
            user.set('name', name);
            user.set('balance', 1000000);
            return user.signUp();
        }
        /**
         * Log in to an existing account
         *
         * @returns {AV.Promise<AV.User>} Current signed in user
         */
        logIn() {
            return AV.User.logIn(this.email, this.password);
        }
        /**
         * Request a password reset email to be sent
         *
         * @returns {AV.Promise<unknown>}
         */
        requestPasswordReset() {
            return AV.User.requestPasswordReset(this.email);
        }
    }

    return StkMobile;

})));
