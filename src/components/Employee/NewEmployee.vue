<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Empleado</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Empleado
      </div>
      <div class="card-body">
        <form @submit.prevent="saveEmployee">

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="user" /></div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nombre completo"
                v-model="user.name"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="email" class="form-label">Correo electrónico :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="envelope" /></div>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Correo electrónico"
                v-model="user.email"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="password" class="form-label">Contraseña :</label>
            <div class="input-group">
              <div class="input-group-text"><font-awesome-icon icon="lock" /></div>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Contraseña"
                v-model="user.password"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="position" class="form-label">Posición :</label>
            <select
              class="form-select"
              id="position"
              v-model="employee.position"
              required
            >
              <option disabled value="">Seleccione una posición</option>
              <option value="cajero">Cajero</option>
              <option value="administrador">Administrador</option>
              <option value="cocinero">Cocinero</option>
              <option value="mensajero">Mensajero</option>
            </select>
          </div>

          <div class="row mb-3">
            <label for="identification_number" class="form-label">Número de Identificación :</label>
            <input
              type="text"
              id="identification_number"
              class="form-control"
              placeholder="Número de identificación"
              v-model="employee.identification_number"
              required
            />
          </div>

          <div class="row mb-3">
            <label for="salary" class="form-label">Salario :</label>
            <input
              type="number"
              step="0.01"
              min="0"
              id="salary"
              class="form-control"
              placeholder="Salario"
              v-model.number="employee.salary"
              required
            />
          </div>

          <div class="row mb-3">
            <label for="hire_date" class="form-label">Fecha de Contratación :</label>
            <input
              type="date"
              id="hire_date"
              class="form-control"
              v-model="employee.hire_date"
              required
            />
          </div>

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" @click="cancel" type="button">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewEmployee',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role: 'empleado'
      },
      employee: {
        position: '',
        identification_number: '',
        salary: null,
        hire_date: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Employees' })
    },
    async saveEmployee() {
      try {
        const payload = {
          user: this.user,
          position: this.employee.position,
          identification_number: this.employee.identification_number,
          salary: this.employee.salary,
          hire_date: this.employee.hire_date
        }

        const res = await axios.post('http://127.0.0.1:8000/api/employees', payload)

        if (res.status === 201) {
          this.$router.push({ name: 'Employees' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Empleado registrado exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        console.log(error) // Para depurar errores
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el empleado',
          text: error.response?.data?.message || 'Ocurrió un error inesperado'
        })
      }
    }
  }
}
</script>
