
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
import router from '../router'

export default {
    name: 'NavHeader',
    computed:{
        isLogged(){
            if (localStorage.getItem('token') !== null){
                router.push('/messages')
                return true
            }
            return false

        }
    },
    components: {
        NavBrand,
        NavUserMenu,
        NavDefault
    }
}
</script>