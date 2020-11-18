<template>
    <div id="app">
      <NavHeader></NavHeader>
      <router-view></router-view>
    </div>
</template>

<script>
import NavHeader from './components/NavHeader'

export default {
  name: 'App',
  components: { NavHeader }
}
</script>

<style>
body {
  background-color: #091F43;
}
</style>
