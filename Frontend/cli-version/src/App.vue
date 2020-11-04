<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Index</router-link> |
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/signup">Inscription</router-link>
    </div>
    <hr>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: ghostwhite;
  background-color: #091F43;
}

#nav {
  padding: 5px;

  a {
    font-weight: bold;
    color: ghostwhite;

    &.router-link-exact-active {
      color: #D1515A;
    }
  }
}
</style>
<style>
body {
  background-color: #091F43;
}

hr {
  background-color:white;
}
</style>
