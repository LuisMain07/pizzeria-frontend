import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Suppliers from '@/views/Suppliers.vue'
import EditarSupplier from '@/components/Suppliers/EditarSupplier.vue'
import NewSupplier from '@/components/Suppliers/NewSupplier.vue'
import Raw_materials from '@/views/Raw_materials.vue'
import EditarRawMaterials from '@/components/Raw_materials/EditarRawMaterials.vue'
import NewRawMaterials from '@/components/Raw_materials/NewRawMaterials.vue'
import Purchases from '@/views/Purchases.vue'
import EditarPurchases from '@/components/Purchases/EditarPurchases.vue'
import NewPurchases from '@/components/Purchases/NewPurchases.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: Suppliers
  },
  {
    path: '/editar-supplier/:id',
    name: 'EditarSupplier',
    component: EditarSupplier
  },
  {
    path: '/add-supplier/',
    name: 'NewSupplier',
    component: NewSupplier
  },
  {
    path: '/rawmaterials',
    name: 'Rawmaterials',
    component: Raw_materials
  },
  {
    path: '/editar-raw-materials/:id',
    name: 'EditarRawMaterials',
    component: EditarRawMaterials
  },
  {
    path: '/add-raw-materials/',
    name: 'NewRawMaterials',
    component: NewRawMaterials
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: Purchases
  },
  {
    path: '/editar-purchases/:id',
    name: 'EditarPurchases',
    component: EditarPurchases
  },
  {
    path: '/add-purchases/',
    name: 'NewPurchases',
    component: NewPurchases
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
