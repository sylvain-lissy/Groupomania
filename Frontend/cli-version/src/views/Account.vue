<template>
    <div style="background-color: #091F43;">
        <div class="container">
            <div class="row">
                <nav class="col navbar navbar-expand-md navbar-dark">
                    <a class="navbar-brand" href="#">
                        <img src="../assets/logo_white.svg" alt="logo groupomania" height="40" class="my-0"/>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarContent" class="m-0 p-0 h6 collapse navbar-collapse justify-content-end align-self-center">
                        <div class="nav-item dropdown">
                            <a class="nav-item nav-link mr-md-2" href="#" data-toggle="dropdown" id="my_account" aria-haspopup="true" aria-expanded="false">
                                <img src="../assets/default_user.jpg" alt="Image de profile" height="40" class="my-0 rounded-circle"/>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="my_account">
                                <a class="dropdown-item" href="#/account">Mon compte</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#/messages">Mes messages</a>
                                <a class="dropdown-item" href="#/comments">Mes commentaires</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#/logout">Déconnexion</a>
                            </div>
                        </div>            
                    </div>
                </nav>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card bg-light">
                        <div class="card-header" style="background-color:ghostwhite;">
                            <span class="text-dark">Administrateur / Mon compte</span>
                        </div>
                        <div class="card-body" style="background-color:#D4D4D4;">
                            <div class="row border d-flex align-items-center mx-3 my-2 p-0" style="background-color: ghostwhite;">
                                
                                <div class="col-3">
                                    <img src="../assets/default_user.jpg" class="rounded-circle m-1 p-0" height="128"/>
                                </div>
                                <div class="col-9 text-dark" id="userIdentity">
                                    <!-- <p class="text-left m-0 p-1" id="Uname">Nom d'utilisateur : </p>
                                    <p class="text-left m-0 p-1" id="Umail">Adresse e-mail : </p>
                                    <p class="text-left m-0 p-1" id="Udate">Profil crée le : </p> -->
                                </div>
                                <div class="col-9 offset-3 text-dark">
                                    <p class="text-left m-0 p-1" id="MsgPosted">Vous avez posté xx messages sur RSi</p>
                                    <p class="text-left m-0 p-1">Votre dernier messages date de xx jours</p>
                                    <p class="text-left m-0 p-1">Vous avez posté xx commentaires sur RSi</p>
                                    <p class="text-left m-0 p-1">Votre dernier commentaire date de xx jours</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer" style="background-color:ghostwhite;">
                            <div class="row d-flex align-items-center m-0 p-0">
                                <div class="col-12">
                                    <a href="#/deleteaccount" class="btn btn-sm btn-block btn-danger">Supprimer mon compte !</a>
                                </div>
                            </div>
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
export default{}
import axios from 'axios'
axios.get('http://127.0.0.1:3000/api/users/1')
    .then(uid=>{
        const userId = document.getElementById("userIdentity")
        userId.innerHTML=`
            <p class="text-left m-0 p-1" id="Uname">Nom d'utilisateur : ${uid.data.user_name}</p>
            <p class="text-left m-0 p-1" id="Umail">Adresse e-mail : ${uid.data.user_email}</p>
            <p class="text-left m-0 p-1" id="Udate">Profil crée le : ${uid.data.user_dateInscription}</p>`
    })
</script>