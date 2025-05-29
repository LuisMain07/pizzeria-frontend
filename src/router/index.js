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
import PizzaRawMaterial from '@/views/PizzaRawMaterial.vue'
import EditarPizzaRawMaterial from '@/components/PizzaRawMaterial/EditarPizzaRawMaterial.vue'
import NewPizzaRawMaterial from '@/components/PizzaRawMaterial/NewPizzaRawMaterial.vue'
import User from '@/views/User.vue'
import EditarUser from '@/components/Users/EditarUser.vue'
import NewUser from '@/components/Users/NewUser.vue'
import Cliente from '@/views/Clientes.vue'
import EditarCliente from '@/components/Clientes/EditarClientes.vue'
import NewCliente from '@/components/Clientes/NewClientes.vue'

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
    path: '/pizza-raw-material',
    name: 'PizzaRawMaterial',
    component: PizzaRawMaterial
  },
  {
    path: '/editar-pizza-raw-material/:id',
    name: 'EditarPizzaRawMaterial',
    component: EditarPizzaRawMaterial
  },
  {
    path: '/add-pizza-raw-material/',
    name: 'NewPizzaRawMaterial',
    component: NewPizzaRawMaterial
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/editar-user/:id',
    name: 'EditarUser',
    component: EditarUser
  },
  {
    path: '/add-user/',
    name: 'NewUser',
    component: NewUser
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: Cliente
  },
  {
    path: '/editar-cliente/:id',
    name: 'EditarCliente',
    component: EditarCliente
  },
  {
    path: '/add-cliente/',
    name: 'NewCliente',
    component: NewCliente
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
