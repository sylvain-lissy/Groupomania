<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="allMessages">
                    <a  href="" data-toggle="modal" data-target="#modalAddMessage" class="my-2 btn btn-sm btn-block btn-success">Poster un message...</a>
                    <div class="modal fade" id="modalAddMessage" tabindex="-1" aria-labelledby="modalAddMessage" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <form enctype="multipart/form-data">
                                    <div class="modal-header">
                                        <p class="modal-title h5">Poster un nouveau message</p>
                                    </div>
                                    <div class="row modal-body">
                                        <div class="col-12 justify-content-center form-group">
                                            <label for="newMessage" class="sr-only">Message :</label>
                                            <textarea class="form-control" v-model="newMessage" id="newMessage" name="message" rows="10" placeholder="Votre message ici..."></textarea>
                                        </div>
                                        <div class="col-12 justify-content-center text-center">
                                            <img :src="newImage" class="w-50 rounded">
                                            <p class="small text-center">Image à partager</p>
                                        </div>
                                        <div class="col-12 justify-content-center">
                                            <div class="form-group justify-content-center">
                                                <label for="File" class="sr-only">Choisir une nouvelle photo</label>
                                                <input @change="onFileChange()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="row w-100 justify-content-spacebetween">
                                            <div class="col-6"><a data-dismiss="modal" class="btn btn-secondary btn-block">Annuler</a></div>
                                            <div class="col-6"><button type="submit" @click.prevent="addNewMessage()" class="btn btn-success btn-block">Valider</button></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'Messages',
    data () {
        return {
            isAdmin:false,
            newImage:'',
            currentUserId:'', 
            newMessage:'', 
            file:null
        }
    },
    methods:{
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        addNewMessage() {
            const formData = new FormData()
            formData.set('image', this.file)
            formData.set('UserId', this.currentUserId.toString())
            formData.set('message', this.newMessage.toString())
            axios.post('http://127.0.0.1:3000/api/messages/',
                formData,
                {headers: 
                    {
                        'Authorization':'Bearer ' + localStorage.getItem('token')
                    }
                },
            )
            .then(()=> {
                this.UserId = ''
                this.newMessage = ''
                this.file = null
                Swal.fire({
                    text: 'Message posté !',
                    footer: 'Redirection en cours...',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { location.reload() }
                })
            })
            .catch((error)=>{
                const codeError = error.message.split('code ')[1]
                let messageError = ""
                switch (codeError){
                    case '400': messageError = "Le message n'a pas été posté !";break
                    case '401': messageError = "Requête non-authentifiée !";break
                }
                Swal.fire({
                    title: 'Une erreur est survenue',
                    text: messageError,
                    icon: 'error',
                    timer: 3500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                }) 
            })
        }
    },
    created: function () {
        this.isAdmin = localStorage.getItem('role')
        this.currentUserId = localStorage.getItem('userId')
        if (localStorage.getItem('refresh')===null) {
            localStorage.setItem('refresh', 0)
            location.reload()
        }
        axios.get('http://127.0.0.1:3000/api/messages',{ headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(res => {
                const rep = res.data.ListeMessages
                for (const message in rep){
                    const MessagesByCard = document.getElementById("allMessages")
                    const OneCard = document.createElement("div")
                    OneCard.classList.add("card", "bg-light", "my-3")
                    OneCard.innerHTML=
                        `<div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <div>
                                <img src="${rep[message].msgIcn}" height="40" class="m-0 rounded-circle"/>
                                <span class="small text-dark m-0 p-1">Posté par "${rep[message].msgUsr}", le ${rep[message].msgDate.slice(0,10).split('-').reverse().join('/') + ' à ' + rep[message].msgDate.slice(11,16)}</span>
                            </div>
                            <div id="adus${rep[message].msgId}"></div>
                        </div>
                        <div class="card-body text-dark text-left" id="MessageContainer${rep[message].msgId}">
                        </div>
                        <div class="card-footer bg-light text-dark text-left m-0">
                            <a href="#/commentaires/${rep[message].msgId}" class="h6 small">Voir les commentaires</a>
                        </div>`
                    MessagesByCard.appendChild(OneCard)
                    if (!rep[message].msgTxt == null || !rep[message].msgTxt == '') {
                        const MessageTexte = document.getElementById("MessageContainer"+`${rep[message].msgId}`)
                        const TextContainer = document.createElement("p")
                        TextContainer.classList.add("small")
                        TextContainer.innerHTML= `${rep[message].msgTxt}`
                        MessageTexte.appendChild(TextContainer)
                    }
                    if (!rep[message].msgImg == null || !rep[message].msgImg == '') {
                        const MessageImage = document.getElementById("MessageContainer"+`${rep[message].msgId}`)
                        const ImageContainer = document.createElement("img")
                        ImageContainer.classList.add("w-100")
                        ImageContainer.setAttribute("src", `${rep[message].msgImg}`)
                        MessageImage.appendChild(ImageContainer)
                    }
                    if (rep[message].msgUID == localStorage.getItem('userId') || localStorage.getItem('role') == 'true' ) {
                        const showAdminPost = document.getElementById("adus"+`${rep[message].msgId}`)
                        const addAdminPanel = document.createElement("div")
                        addAdminPanel.innerHTML = `
                            <a href="#/message/edit/${rep[message].msgId}"><img src="../images/edit.png" class="m-1 p-0" alt="Editer le message" title="Editer le message"/></a>
                            <a href="#/message/drop/${rep[message].msgId}"><img src="../images/drop.png" class="m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>`
                        showAdminPost.appendChild(addAdminPanel)
                    }
                }
            })
            .catch((error)=>{
                const codeError = error.message.split('code ')[1]
                let messageError = ""
                switch (codeError){
                    case '400': messageError = "La liste des messages n'a pas été récupérer !";break
                }
                Swal.fire({
                    title: 'Une erreur est survenue',
                    text: messageError,
                    icon: 'error',
                    timer: 3500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                }) 
            })
    }
}
</script>

<style>
  body {
    background-color: #091F43;
  }
</style>