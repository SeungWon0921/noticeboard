import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

// post /api/auth/register
auth.post('/register', authCtrl.register);
// post /api/auth/login
auth.post('/login', authCtrl.login);
// get /api/auth/check
auth.get('/check', authCtrl.check);
// post /api/auth/logout
auth.post('/logout', authCtrl.logout);


export default auth;