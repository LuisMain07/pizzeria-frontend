<template>
  <div class="container">
    <h1 class="text-start">Editar Ingrediente de Pizza</h1>
    
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="updatePizzaIngredient">
          <div class="mb-3">
            <label for="pizza_id" class="form-label">Pizza</label>
            <select 
              v-model="pizzaIngredient.pizza_id" 
              class="form-select" 
              id="pizza_id" 
              required
            >
              <option value="">Seleccione una pizza</option>
              <option 
                v-for="pizza in pizzas" 
                :key="pizza.id" 
                :value="pizza.id"
              >
                {{ pizza.name }}
              </option>
            </select>
          </div>
          
          <div class="mb-3">
            <label for="ingredient_id" class="form-label">Ingrediente</label>
            <select 
              v-model="pizzaIngredient.ingredient_id" 
              class="form-select" 
              id="ingredient_id" 
              required
            >
              <option value="">Seleccione un ingrediente</option>
              <option 
                v-for="ingredient in ingredients" 
                :key="ingredient.id" 
                :value="ingredient.id"
              >
                {{ ingredient.name }}
              </option>
            </select>
          </div>
          
          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Actualizar
          </button>
          <button @click="cancel" type="button" class="btn btn-secondary mx-2">
            <font-awesome-icon icon="times" /> Cancelar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditarPizzaIngredients',
  data() {
    return {
      pizzaIngredient: {
        id: '',
        pizza_id: '',
        ingredient_id: ''
      },
      pizzas: [],
      ingredients: []
    }
  },
  methods: {
    async updatePizzaIngredient() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/pizza-ingredient/${this.pizzaIngredient.id}`, 
          this.pizzaIngredient
        )
        
        if (response.data.success) {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El ingrediente de pizza se ha actualizado correctamente.',
            icon: 'success'
          }).then(() => {
            this.$router.push({ name: 'PizzaIngredients' })
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el ingrediente de pizza.', 'error')
      }
    },
    cancel() {
      this.$router.push({ name: 'PizzaIngredients' })
    },
    async loadPizzaIngredient() {
      try {
        const id = this.$route.params.id
        const response = await axios.get(`http://127.0.0.1:8000/api/pizza-ingredient/${id}`)
        this.pizzaIngredient = response.data.pizzaIngredient
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el ingrediente de pizza.', 'error')
        this.$router.push({ name: 'PizzaIngredients' })
      }
    },
    async loadPizzas() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pizza')
        this.pizzas = response.data.pizzas || []
      } catch (error) {
        console.error('Error cargando pizzas:', error)
      }
    },
    async loadIngredients() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ingredient')
        this.ingredients = response.data.ingredients || []
      } catch (error) {
        console.error('Error cargando ingredientes:', error)
      }
    }
  },
  async mounted() {
    await this.loadPizzaIngredient()
    await this.loadPizzas()
    await this.loadIngredients()
  }
}
</script>