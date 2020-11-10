<template>
    <div id="app">
      <!--NAVBAR - SEE COMPONENT 'navBar.vue'-->
      <NavHeader></NavHeader>

      <!--ROUTER - SEE 'router/index.js'-->
      <router-view></router-view>

    </div>
</template>

<script>
import NavHeader from './components/NavHeader'
export default {
  name: 'App',
  components: {NavHeader}
}
</script>
<style>
body {
  background-color: #091F43;
}

hr {
  background-color:white;
}
</style>
