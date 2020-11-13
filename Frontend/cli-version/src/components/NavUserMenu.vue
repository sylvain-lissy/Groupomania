<template>
    <div id="navbarContent" class="m-0 p-0 justify-content-end align-self-center">
        <div class="nav-item dropdown m-0 p-0">
            <a class="nav-item nav-link m-0 p-0" href="#" data-toggle="dropdown" id="my_account" aria-haspopup="true" aria-expanded="false">
                <img :src="avatar" alt="Image de profile" height="37" class="my-0 rounded-circle"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="my_account">
                <p class="h5 dropdown-item-text">{{ userName}}</p>
                <div class="dropdown-divider"></div>
                <router-link to="/compte" class="dropdown-item">Mon compte</router-link>
                <!-- <a class="dropdown-item" href="#/compte">Mon compte</a> -->
                <div class="dropdown-divider"></div>
                <a class ="dropdown-item text-danger" @click="deconnexion" href="#">Déconnexion</a>
                <!-- <a class ="dropdown-item text-danger" @click="deconnexion" href="#">Déconnexion</a> -->
            </div>
        </div>            
    </div>
</template>

<script>
//import router from '../router'
export default {
    name: 'NavUserMenu',
    data(){
        return{
            userName:"", 
            avatar:"/images/avatars/default_user.jpg",
        }
    },
    created: function(){
            this.userName = localStorage.getItem('userName') 
            this.avatar = localStorage.getItem('avatar') 
    },
    methods:{
        deconnexion:function(){
            localStorage.clear()
            location.reload()
            //router.push('/')
        }
    }
}
</script>