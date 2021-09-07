import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TestDescription from '../views/TestDescription.vue'
import TestQuestions from '../views/TestQuestions.vue'
import TestResult from '../views/TestResult.vue'
import MobileMenu from '../views/MobileMenu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/test-description/:testId',
    name: 'testDescription',
    component: TestDescription,
    props: true,
  },
  {
    path: '/test-questions',
    name: 'testQuestions',
    component: TestQuestions,
    props: true,
  },
  {
    path: '/test-result',
    name: 'testResult',
    component: TestResult,
    props: true,
  },
  {
    path: '/mobile-menu',
    name: 'mobileMenu',
    component: MobileMenu,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
