import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Dashboard from '@/components/Dashboard'
import LogIn from '@/components/User/login'
import SignUp from '@/components/User/Signup'
import Teacher from '@/components/User/teacher'
import Student from '@/components/User/student'
import Profile from '@/components/User/profile'
import CreateWebQuest from '@/components/WebQuest/Create'
import Quest from '@/components/WebQuest/Quest'
import WebQuests from '@/components/WebQuest/WebQuests'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/quest/:id',
      props: true,
      name: 'Quest',
      component: Quest,
      beforeEnter: AuthGuard
    },
    {
      path: '/webQuests',
      name: 'WebQuests',
      component: WebQuests,
      beforeEnter: AuthGuard
    },
    {
      path: '/create',
      name: 'CreateWebQuest',
      component: CreateWebQuest,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signup/Teacher',
      name: 'Teacher',
      component: Teacher,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup/student',
      name: 'Student',
      component: Student,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    }
  ]
})
