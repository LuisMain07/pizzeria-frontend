<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/user">Users</router-link> |
    <router-link to="/Clientes">Clientes</router-link> |
    <router-link to="/employees">Employees</router-link> |
    <router-link to="/suppliers">Suppliers</router-link> |
    <router-link to="/rawmaterials">Raw_materials</router-link> |
    <router-link to="/purchases">Purchases</router-link> |
    <router-link to="/pizza-raw-material">Pizza_raw_material</router-link> 
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
