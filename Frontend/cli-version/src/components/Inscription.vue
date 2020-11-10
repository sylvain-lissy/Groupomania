<template>
<div>
    <!-- <NavHeader></NavHeader> -->
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-4">
                <div class="card bg-light">
                    <p class="h5 my-3 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
                    <div class="card-header bg-light">
                        <img src="../assets/logo_black.svg" class="w-75 m-0 p-0" alt="logo groupomania">
                        <h5 class="h6 text-center" style="color:#091F43;">Veuillez-vous inscrire !</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="form-group">
                                <label for="InputName" class="sr-only">Nom d'utilisateur :</label>
                                <input type="text" v-model="InputName" name="InputName" class="form-control" id="InputName" aria-describedby="nameHelp" placeholder="nom d'utilisateur" :class="{ 'is-invalid': submitted && !InputName }">
                                <div v-show="submitted && !InputName" class="invalid-feedback">Un nom d'utilisateur est requis !</div>
                            </div>
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
                            <button class="btn btn-primary btn-sm btn-block">S'incrire</button>
                            <!-- <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> -->
                        </form>
                    </div>
                    <div class="card-footer bg-light">
                        <span class="text-dark">Déjà un compte ? <router-link to="/connexion">Connectez-vous</router-link> !</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
    body {
        background-color: #091F43;
    }
</style>

<script>
import axios from 'axios'

export default {
    name: "Inscription",
    data () {
        return {
          InputName:'',
          InputEMail:'',
          InputPassword:'',
          submitted:false
        }
    },
    methods: {
        handleSubmit () {
            const InputName = this.InputName
            const InputEmail = this.InputEmail
            const InputPassword = this.InputPassword
            this.submitted = true;
            axios.post('http://127.0.0.1:3000/api/auth/signup', {
                user_name: InputName,
                user_email: InputEmail,
                user_password: InputPassword
            })
            .then(function (response) {
                console.log(response)
                if (response.statusText==='Created'){
                    axios.post('http://127.0.0.1:3000/api/auth/login', {
                        user_email: InputEmail,
                        user_password: InputPassword
                    })
                    .then(function (response) {
                        //console.log(response)
                        localStorage.setItem('connected','false')
                        localStorage.setItem('token',response.data.token)
                        localStorage.setItem('userId',response.data.userId)
                        localStorage.setItem('userName',response.data.userName)
                        localStorage.setItem('userAvatar',response.data.userAvatar)
                        this.$router.push('/messages')

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }
}
</script>