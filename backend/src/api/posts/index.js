import Router from 'koa-router';
import checkLoggedIn from '../../lib/checkLoggedIn';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

// /api/posts
posts.post('/', checkLoggedIn, postsCtrl.write);
// /api/posts
posts.get('/', postsCtrl.list);

const post = new Router();
// /api/posts/:id
post.get('/', postsCtrl.read);
// /api/posts/:id
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
// /api/posts/:id
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());
export default posts;