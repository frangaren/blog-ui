import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserList from '@/components/UserList'
import UserDetails from '@/components/UserDetails'
import PostList from '@/components/PostList'
import PostDetails from '@/components/PostDetails'
import CommentList from '@/components/CommentList'
import CommentDetails from '@/components/CommentDetails'
import CommentEdit from '@/components/CommentEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      path: '/comments',
      name: 'CommentList',
      component: CommentList
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
