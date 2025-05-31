import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Importaciones de componentes
// Pizzas
import Pizzas from '../views/Pizzas.vue'
import EditPizza from '../components/pizzas/EditPizza.vue'
import NewPizza from '../components/pizzas/NewPizza.vue'

// Pizza Sizes
import PizzaSizes from '../views/PizzaSizes.vue'
import EditPizzaSize from '../components/pizzasizes/EditPizzaSize.vue'
import NewPizzaSize from '../components/pizzasizes/NewPizzaSize.vue'

// Ingredients
import Ingredients from '../views/Ingredients.vue'
import EditIngredient from '../components/ingredients/EditIngredient.vue'
import NewIngredient from '../components/ingredients/NewIngredient.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // Rutas de Pizzas
  {
    path: '/pizzas',
    name: 'Pizzas',
    component: Pizzas
  },
  {
    path: '/edit-pizza/:id',
    name: 'EditPizza',
    component: EditPizza
  },
  {
    path: '/add-pizza',
    name: 'NewPizza',
    component: NewPizza
  },
  // Rutas de Pizza Sizes
  {
    path: '/pizza-sizes',
    name: 'PizzaSizes',
    component: PizzaSizes
  },
  {
    path: '/edit-pizza-size/:id',
    name: 'EditPizzaSize',
    component: EditPizzaSize
  },
  {
    path: '/add-pizza-size',
    name: 'NewPizzaSize',
    component: NewPizzaSize
  },
  // Rutas de Ingredients
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: Ingredients
  },
  {
    path: '/edit-ingredient/:id',
    name: 'EditIngredient',
    component: EditIngredient
  },
  {
    path: '/add-ingredient',
    name: 'NewIngredient',
    component: NewIngredient
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router