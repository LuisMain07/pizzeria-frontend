<template>
  <div class="container">
    <h1 class="text-start">Agregar Ingrediente Extra</h1>
    
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="saveExtraIngredient">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre del Ingrediente Extra</label>
            <input 
              type="text" 
              v-model="extraIngredient.name" 
              class="form-control" 
              id="name" 
              placeholder="Ej: Pepperoni extra, Queso extra, etc."
              required
            >
          </div>
          
          <div class="mb-3">
            <label for="price" class="form-label">Precio</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input 
                type="number" 
                v-model="extraIngredient.price" 
                class="form-control" 
                id="price" 
                step="0.01"
                min="0"
                placeholder="0.00"
                required
              >
            </div>
          </div>
          
          <button type="submit" class="btn btn-success">
            <font-awesome-icon icon="save" /> Guardar
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
  name: 'NewExtraIngredients',
  data() {
    return {
      extraIngredient: {
        name: '',
        price: ''
      }
    }
  },
  methods: {
    async saveExtraIngredient() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/extra-ingredient', this.extraIngredient)
        
        if (response.data.success) {
          Swal.fire({
            title: '¡Guardado!',
            text: 'El ingrediente extra se ha guardado correctamente.',
            icon: 'success'
          }).then(() => {
            this.$router.push({ name: 'ExtraIngredients' })
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo guardar el ingrediente extra.', 'error')
      }
    },
    cancel() {
      this.$router.push({ name: 'ExtraIngredients' })
    }
  }
}
</script>