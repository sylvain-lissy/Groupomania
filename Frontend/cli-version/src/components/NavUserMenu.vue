<template>
    <div id="navbarContent" class="m-0 p-0 justify-content-end align-self-center">
        <div class="nav-item dropdown m-0 p-0">
            <a class="nav-item nav-link m-0 p-0" href="#" data-toggle="dropdown" id="my_account" aria-haspopup="true" aria-expanded="false">
                <img :src="avatar" alt="Image de profile" height="37" class="my-0 rounded-circle"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="my_account">
                <p class="h5 dropdown-item-text">{{ userName}}</p>
                <div class="dropdown-divider"></div>
                <div class="d-flex"><img src="/images/edit.svg" fill="text-primary" class="pl-4"><router-link to="/compte" class="dropdown-item pl-2">Mon compte</router-link></div>
                <div class="d-flex"><img src="/images/mail.svg" fill="text-primary" class="pl-4"><router-link to="/compte/messages" class="dropdown-item pl-2">Mes messages</router-link></div>
                <div class="dropdown-divider"></div>
                <div class="d-flex"><img src="/images/info.svg" fill="text-primary" class="pl-4"><router-link to="/aide" class="dropdown-item pl-2">Aide</router-link></div>
                <div class="dropdown-divider"></div>
                <div class="d-flex"><img src="/images/pass.svg" fill="text-primary" class="pl-4"><a class ="dropdown-item pl-2 text-danger" @click="deconnexion" href="#">Déconnexion</a></div>
            </div>
        </div>            
    </div>
</template>

<script>
import Swal from "sweetalert2"

export default {
    name: "NavUserMenu",
    data() {
        return {
            userName: "", 
            avatar: "/images/avatars/default_user.jpg"
        }
    },
    created: function() {
            this.userName = localStorage.getItem("userName") 
            this.avatar = localStorage.getItem("avatar") 
    },
    methods: {
        deconnexion: function() {
            localStorage.clear()
            Swal.fire({
                text: "Déconnexion en cours !",
                footer: "Redirection en cours...",
                icon: "info",
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { location.reload() }
            })
        }
    }
}
</script>