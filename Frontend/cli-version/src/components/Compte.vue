<template>
    <div style="background-color: #091F43;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card bg-light">
                        <div class="card-header text-center" style="background-color:ghostwhite;">
                            <span class="text-dark h6">{{userName}}</span>
                        </div>
                        <div class="card-body" style="background-color:#D4D4D4;">
                            <div class="row border d-flex align-items-center m-2 p-0" style="background-color: ghostwhite;">
                                <div class="col-12 col-md-4 text-center">
                                        <img :src="avatar" class="rounded-circle m-1 p-0" height="128"/>
                                        <a href="" class="btn btn-sm btn-primary mb-2 p-1" data-toggle="modal" data-target="#modalAvatar">Changer de photo</a>
                                </div>
                                <div class="modal fade" id="modalAvatar" tabindex="-1" aria-labelledby="modalAvatar" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <form enctype="multipart/form-data">
                                                <div class="modal-header">
                                                    <p class="modal-title h5">Changer la photo de profile</p>
                                                </div>
                                                <div class="row modal-body">
                                                    <div class="col-6 justify-content-center">
                                                        <img :src="avatar" class="w-100 rounded-circle">
                                                        <p class="small text-center">Photo actuelle</p>
                                                    </div>
                                                    <div class="col-6 justify-content-center">
                                                        <img :src="newAvatar" class="w-100 rounded-circle">
                                                        <p class="small text-center">Nouvelle photo</p>
                                                    </div>
                                                    <div class="col-12 justify-content-center">
                                                        <div class="form-group justify-content-center">
                                                            <label for="File" class="sr-only">Choisir une nouvelle photo</label>
                                                            <input v-on:change="onFileChange()" type="file" ref="file" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <div class="row w-100 justify-content-spacebetween">
                                                        <div class="col-6"><a data-dismiss="modal" class="btn btn-secondary btn-block">Annuler</a></div>
                                                        <div class="col-6"><a @click="updateAvatar()" class="btn btn-success btn-block">Valider</a></div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-8 text-dark">
                                    <p class="small text-left m-0 p-1">Adresse e-mail : {{email}}</p>
                                    <p class="small text-left m-0 p-1">Rôle : {{role}}</p>
                                    <p class="small text-left m-0 p-1">Crée le : {{createdAt}}</p>
                                    <p class="small text-left m-0 p-1">Votre contenu : </p>
                                    <ul>
                                        <li class="small text-left m-0 p-1">{{messagesCount}} message<span v-if="messagesCount > 1">s</span></li>
                                        <li class="small text-left m-0 p-1">{{commentsCount}} commentaire<span v-if="commentsCount > 1">s</span></li>
                                    </ul>
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
            userName:"", email:"", role:"", createdAt:"", messagesCount:"", commentsCount:"", avatar:"",
            newAvatar:"/images/avatars/default_user.jpg", file:''
        }
    },
    methods:{
        onFileChange() {
            this.file = this.$refs.file.files[0];
        },
        async updateAvatar() {
            //axios.post('http://127.0.0.1:3000/users/' + localStorage.getItem('UserId'), {avatar = ""})
            let formData = new FormData()
            formData.append('file', this.file);
            console.log(formData)
            axios.put('http://127.0.0.1:3000/api/users/' + localStorage.getItem('userId'), 
                formData, 
                { 
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function(){
                alert('OK message reçu !')
            })
            .catch(function(){
                alert('Oups problème !')
            })
        }
    },
    created: function(){
        axios.get('http://127.0.0.1:3000/api/users/' + localStorage.getItem('userId'),{ headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(user => {
                console.log(user)
                this.userName = user.data.userName
                this.email = user.data.email
                this.role = user.data.role
                this.createdAt = user.data.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + user.data.createdAt.slice(11,16)
                this.messagesCount = user.data.messagesCount
                this.commentsCount = user.data.commentsCount
                this.avatar = user.data.avatar
            })
    }
}
</script>