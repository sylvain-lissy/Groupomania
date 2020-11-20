<template>
    <div class="container">
        <div class="row">
            <nav class="col navbar navbar-dark mb-3">
                <NavBrand></NavBrand>
                <NavUserMenu v-if="isLogged"></NavUserMenu>
                <NavDefault v-else></NavDefault>
            </nav>
        </div>
    </div>
</template>

<script>
import NavBrand from "./NavBrand"
import NavUserMenu from "./NavUserMenu"
import NavDefault from "./NavDefault"

export default {
    name: "NavHeader",
    components: { 
        NavUserMenu, 
        NavDefault, 
        NavBrand
    },
    computed:{
        isLogged() {
            if (localStorage.getItem("token") !== null) {   
                return true
            }
            return false
        }
    }
}
</script>

<style>
    body {
        background-color: #091F43
    }
</style>