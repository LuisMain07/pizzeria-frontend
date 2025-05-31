<template>
  <div class="container">
    <h1 class="text-start">Editar Ingrediente Extra</h1>
    
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="updateExtraIngredient">
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
  name: 'EditarExtraIngredients',
  data() {
    return {
      extraIngredient: {
        id: '',
        name: '',
        price: ''
      }
    }
  },
  methods: {
    async updateExtraIngredient() {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/extra-ingredient/${this.extraIngredient.id}`, 
          this.extraIngredient
        )
        
        if (response.data.success) {
          Swal.fire({
            title: '¡Actualizado!',
            text: 'El ingrediente extra se ha actualizado correctamente.',
            icon: 'success'
          }).then(() => {
            this.$router.push({ name: 'ExtraIngredients' })
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo actualizar el ingrediente extra.', 'error')
      }
    },
    cancel() {
      this.$router.push({ name: 'ExtraIngredients' })
    },
    async loadExtraIngredient() {
      try {
        const id = this.$route.params.id
        const response = await axios.get(`http://127.0.0.1:8000/api/extra-ingredient/${id}`)
        this.extraIngredient = response.data.extraIngredient
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar el ingrediente extra.', 'error')
        this.$router.push({ name: 'ExtraIngredients' })
      }
    }
  },
  async mounted() {
    await this.loadExtraIngredient()
  }
}
</script>