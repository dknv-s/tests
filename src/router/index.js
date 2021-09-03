import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TestDescription from '../views/TestDescription.vue'
import TestQuestions from '../views/TestQuestions.vue'
import TestResult from '../views/TestResult.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/test-description',
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
