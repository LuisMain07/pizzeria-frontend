import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

//Pizza Sizes
import EditPizza from '../components/pizzas/EditPizza.vue'
import NewPizza from '../components/pizzas/NewPizza.vue'
import PizzaSizes from '../views/PizzaSizes.vue'

// Pizzas
import EditPizzaSize from '../components/pizzasizes/EditPizzaSize.vue'
import NewPizzaSize from '../components/pizzasizes/NewPizzaSize.vue'
import Pizzas from '../views/Pizzas.vue'

//Ingredients
import EditIngredient from '../components/ingredients/EditIngredient.vue'
import NewIngredient from '../components/ingredients/NewIngredient.vue'
import Ingredients from '../views/Ingredients.vue'

const routes = [
  
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