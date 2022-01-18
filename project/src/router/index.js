import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductAdd from '../views/ProductAdd.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-product',
    name: 'ProductAdd',
    component: ProductAdd
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
