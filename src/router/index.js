import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/UserList'
import UserDetails from '@/components/UserDetails'
import PostList from '@/components/PostList'
import PostDetails from '@/components/PostDetails'
import PostEdit from '@/components/PostEdit'
import CommentList from '@/components/CommentList'
import CommentCreate from '@/components/CommentCreate'
import CommentDetails from '@/components/CommentDetails'
import CommentEdit from '@/components/CommentEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: PostList,
      alias: '/posts'
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/users/:id',
      name: 'UserDetails',
      component: UserDetails
    },
    {
      path: '/posts',
      name: 'PostList',
      component: PostList
    },
    {
      path: '/posts/:id',
      name: 'PostDetails',
      component: PostDetails
    },
    {
      path: '/posts/:id/edit',
      name: 'PostEdit',
      component: PostEdit
    },
    {
      path: '/comments',
      name: 'CommentList',
      component: CommentList
    },
    {
      path: '/comments/create',
      name: 'CommentCreate',
      component: CommentCreate
    },
    {
      path: '/comments/:id',
      name: 'CommentDetails',
      component: CommentDetails
    },
    {
      path: '/comments/:id/edit',
      name: 'CommentEdit',
      component: CommentEdit
    }
  ]
})
