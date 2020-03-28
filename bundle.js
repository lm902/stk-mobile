(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('leancloud-storage')) :
    typeof define === 'function' && define.amd ? define(['exports', 'leancloud-storage'], factory) :
    (global = global || self, factory(global.StkMobile = {}, global.AV));
}(this, (function (exports, AV) { 'use strict';

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
            if (debug && window && window.localStorage) {
                window.localStorage.debug = 'leancloud*';
            }
            try {
                AV.init({
                    appId: 'W5s1EwL7qA12qOkA7IINQ23S-9Nh9j0Va',
                    appKey: 'crb6g0edNaDaHcffiz1F5Y43',
                    serverURLs: 'https://stk-mobile.lm902.cn'
                });
                AV.Object.register(Watching);
                AV.Object.register(Transaction);
                AV.Object.register(Holding);
            }
            catch { }
        }
        /**
         * Current signed in user
         */
        static get user() {
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
        /**
         * Request a verification email to be sent in case the user did not receive the first one
         *
         * @returns {AV.Promise<unknown>}
         */
        requestEmailVerify() {
            return AV.User.requestEmailVerfiy(this.email);
        }
    }
    class Watching extends AV.Object {
    }
    class Transaction extends AV.Object {
    }
    class Holding extends AV.Object {
    }

    exports.Holding = Holding;
    exports.Transaction = Transaction;
    exports.Watching = Watching;
    exports.default = StkMobile;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
