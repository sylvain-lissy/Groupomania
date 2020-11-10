<template>
    <div style="background-color: #091F43;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card bg-light">
                        <div class="card-header text-center" style="background-color:ghostwhite;">
                            <span class="text-dark">Mon compte</span>
                        </div>
                        <div class="card-body" style="background-color:#D4D4D4;">
                            <div class="row border d-flex align-items-center mx-3 my-2 p-0" style="background-color: ghostwhite;">
                                
                                <div class="col-3">
                                    <img :src="Uavatar" class="rounded-circle m-1 p-0" height="128"/>
                                </div>
                                <div class="col-9 text-dark">
                                    <p class="text-left m-0 p-1">Nom d'utilisateur : {{Uname}}</p>
                                    <p class="text-left m-0 p-1">Adresse e-mail : {{Umail}}</p>
                                    <p class="text-left m-0 p-1">Profil crée le : {{Udate}}</p>
                                    <p class="text-left m-0 p-1">Votre contenu : {{Umsgc}} messages et {{Ucmtc}} commentaires.</p>
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
import axios from 'axios'

export default {
    name: "Compte",
    data(){
        return{
            Uname:"", Umail:"", Udate:"", Umsgc:"0", Ucmtc:"0"
        }
    },
    created: function(){
        axios.get('http://127.0.0.1:3000/api/users/' + localStorage.getItem('userId'))
            .then(uid=>{
                this.Uname = uid.data.name
                this.Umail = uid.data.mail
                this.Udate = uid.data.date
                this.Umsgc = uid.data.msgcount
                this.Ucmtc = uid.data.cmtcount
                this.Uavatar = uid.data.avatar
            })
    }
}
</script>