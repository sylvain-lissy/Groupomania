<template>
    <div>    
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card bg-light">
                        <p class="h5 my-3 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
                        <div class="card-header bg-light d-flex flex-column justify-content-center">
                            <img src="../assets/logo_black.svg" class="m-0 p-0" height="60" alt="logo groupomania">
                            <h5 class="h6 text-center" style="color:#091F43;">Veuillez-vous identifier !</h5>
                        </div>
                        <div class="card-body col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                            <form @submit.prevent="handleSubmit">
                                <div class="form-group">
                                    <label for="InputEmail" class="sr-only">Adresse e-mail :</label>
                                    <input type="email" v-model="InputEmail" name="InputEmail" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="adresse e-mail" :class="{ 'is-invalid': submitted && !InputEmail }">
                                    <div v-show="submitted && !InputEmail" class="invalid-feedback">Une adresse e-mail est requise !</div>
                                </div>
                                <div class="form-group">
                                    <label for="InputPassword" class="sr-only">Mot de passe :</label>
                                    <input type="password" v-model="InputPassword" name="InputPassword" class="form-control" id="InputPassword" placeholder="mot de passe" :class="{ 'is-invalid': submitted && !InputPassword }">
                                    <div v-show="submitted && !InputPassword" class="invalid-feedback">Un mot de passe est requis !</div>
                                </div>
                                <button class="btn btn-primary btn-sm btn-block">Se connecter</button>
                            </form>
                        </div>
                        <div class="card-footer bg-light">
                            <span class="text-dark">Pas de compte ? <router-link to="/inscription">Inscrivez-vous</router-link> !</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import router from "../router"
import Swal from "sweetalert2"

export default {
    name: "Connexion",
    data() {
        return {
            InputEmail: "",
            InputPassword: "",
            submitted: false
        }
    },
    methods: {
        handleSubmit() {            
            this.submitted = true
            axios.post('http://127.0.0.1:3000/api/auth/login', { email: this.InputEmail, password: this.InputPassword })
            .then(function (response) {
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("userId",response.data.userId)
                localStorage.setItem("userName",response.data.userName)
                localStorage.setItem("avatar",response.data.avatar)
                localStorage.setItem("role",response.data.role)
                Swal.fire({
                    text: "Connexion réussie !",
                    footer: "Redirection en cours...",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { router.push("/messages") }
                })  
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "401": messageError = "Mot de passe erroné !"; break
                    case "403": messageError = "Le compte associé à cette adresse email a été supprimé !"; break
                    case "404": messageError = "Utilisateur non-trouvé !"; break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.message,
                    icon: "error",
                    timer: 4000,
                    showConfirmButton: false,
                    timerProgressBar: true
                })  
            })
        }
    }
}
</script>

<style>
    body {
        background-color: #091F43
    }
</style>
