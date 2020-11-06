<template>
  <div>
      <NavHeader />
      <Default />
  </div>
</template>

<style>
    body {
        background-color: #091F43;
    }
</style>

<script>
import NavHeader from "../components/NavHeader"
import Default from "../components/Default"

export default {
    name: "Home",
    components: {
        NavHeader,
        Default
    }
}
</script>