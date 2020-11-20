<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <router-link to="/messages" class="my-2 btn btn-small btn-block btn-danger">...retour aux messages</router-link>                
                </div>
                <div class="col-12 col-md-10 col-lg-8" id="OneMessage">
                </div>
                <div class="col-12 col-md-10 col-lg-8">
                    <a  href="" data-toggle="modal" data-target="#modalAddComment" class="my-2 btn btn-small btn-block btn-success">Poster un commentaire...</a>
                    <div class="modal fade" id="modalAddComment" tabindex="-1" aria-labelledby="modalAddComment" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <form enctype="multipart/form-data">
                                    <div class="modal-header">
                                        <p class="modal-title h5">Poster un nouveau commentaire</p>
                                    </div>
                                    <div class="row modal-body">
                                        <div class="col-12 justify-content-center form-group">
                                            <label for="newComment" class="sr-only">Commentaire :</label>
                                            <textarea class="form-control" v-model="newComment" id="newComment" name="comment" rows="10" placeholder="Votre commentaire ici..." required :class="{ 'is-invalid': submitted && !newComment }"></textarea>
                                            <div v-show="submitted && !newComment" class="invalid-feedback">Une commentaire est requis !</div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="row w-100 justify-content-spacebetween">
                                            <div class="col-6"><a data-dismiss="modal" class="btn btn-secondary btn-block">Annuler</a></div>
                                            <div class="col-6"><button type="submit" @click.prevent="addNewComment()" class="btn btn-success btn-block">Valider</button></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-10 col-lg-8" id="Comments">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

export default {
    name: "Messages",
    data() {
        return {
            newComment:null,
            currentUserId:'',
            submitted:false,
            isActive:''
        }
    },
    methods:{
        addNewComment() {
            this.submitted = true
            axios.post('http://127.0.0.1:3000/api/comments/',
                {
                    'MessageId': this.$route.params.id,
                    'UserId': this.currentUserId,
                    'comment': this.newComment
                },
                {headers: 
                    {
                        'Authorization':'Bearer ' + localStorage.getItem('token')
                    }
                },
            )
            .then(()=> {
                Swal.fire({
                    text: 'Commentaire ajouté !',
                    footer: 'Redirection en cours...',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { location.reload() }
                })
            })
            .catch(function(error) {
                const codeError = error.message.split('code ')[1]
                let messageError = ""
                switch (codeError){
                    case '400': messageError = "Le message n'a pas été ajouté !";break
                    case '401': messageError = "Requête non-authentifiée !";break
                }
                Swal.fire({
                    title: 'Une erreur est survenue',
                    text: messageError,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                })  
            })
        }
    },
    created: function () {
        this.currentUserId = localStorage.getItem('userId')
        axios.get('http://127.0.0.1:3000/api/messages/' + this.$route.params.id, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(res => {
                const rep = res.data
                const MessagesByCard = document.getElementById("OneMessage")
                const OneMessage = document.createElement("div")
                OneMessage.classList.add("card", "bg-light", "my-3")
                if (rep.isActive === false) {
                    this.isActive = "<span class='text-danger small'> (supprimé)</span>"
                }else{
                    this.isActive = ""
                }
                OneMessage.innerHTML=
                    `<div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                        <img src="${rep.userAvatar}" height="40" class="m-0 rounded-circle"/>
                        <span class="small text-dark m-0 p-1">Posté par ${rep.userName} ${this.isActive}, le ${rep.date.slice(0,10).split('-').reverse().join('/') + ' à ' + rep.date.slice(11,16)}</span>
                        <div id="adus${rep.id}"></div>
                    </div>
                    <div class="card-body text-dark text-left" id="MessageContainer">
                    </div>
                    <div class="card-footer bg-light text-dark text-left m-0" id="Commentaire">
                    </div>`
                MessagesByCard.appendChild(OneMessage)
                if (!rep.text == null || !rep.text == '') {
                    const MessageTexte = document.getElementById("MessageContainer")
                    const TextContainer = document.createElement("p")
                    TextContainer.classList.add("small")
                    TextContainer.innerHTML= `${rep.text}`
                    MessageTexte.appendChild(TextContainer)
                }
                if (!rep.image == null || !rep.image == '') {
                    const MessageImage = document.getElementById("MessageContainer")
                    const ImageContainer = document.createElement("img")
                    ImageContainer.classList.add("w-100")
                    ImageContainer.setAttribute("src", `${rep.image}`)
                    MessageImage.appendChild(ImageContainer)
                }
                if (rep.userID == localStorage.getItem('userId') || localStorage.getItem('role') == 'true' ) {
                    const showAdminPost = document.getElementById("adus"+`${rep.id}`)
                    const addAdminPanel = document.createElement("div")
                    addAdminPanel.innerHTML = `
                        <a href="#/message/edit/${rep.id}"><img src="../images/edit.svg" class="m-1 p-0" alt="Editer le message" title="Editer le message"/></a>
                        <a href="#/message/drop/${rep.id}"><img src="../images/drop.svg" class="m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>`
                    showAdminPost.appendChild(addAdminPanel)
                }
                if (rep.Commentaire === 0){
                    const MessageCommentaire = document.getElementById("Commentaire")
                    const CommentaireContainer = document.createElement("p")
                    CommentaireContainer.classList.add("h6", "small")
                    CommentaireContainer.innerHTML= `Il n'y a aucun commentaire.`
                    MessageCommentaire.appendChild(CommentaireContainer)
                } else if (rep.Commentaire === 1){
                    const MessageCommentaire = document.getElementById("Commentaire")
                    const CommentaireContainer = document.createElement("p")
                    CommentaireContainer.classList.add("h6", "small")
                    CommentaireContainer.innerHTML= `Il y a ${rep.Commentaire} commentaire.`
                    MessageCommentaire.appendChild(CommentaireContainer)
                } else if (rep.Commentaire > 1){
                    const MessageCommentaire = document.getElementById("Commentaire")
                    const CommentaireContainer = document.createElement("p")
                    CommentaireContainer.classList.add("h6", "small")
                    CommentaireContainer.innerHTML= `Il y a ${rep.Commentaire} commentaires.`
                    MessageCommentaire.appendChild(CommentaireContainer)
                } 
            })
            .catch((error)=> {
                const codeError = error.message.split('code ')[1]
                let messageError = ""
                switch (codeError){
                    case '400': messageError = "Le message n'a pas été récupéré !";break
                    case '401': messageError = "Requête non-authentifiée !";break
                    case '404': messageError = "Le message n'a pas été trouvé !";break
                }
                Swal.fire({
                    title: 'Une erreur est survenue',
                    text: messageError,
                    icon: 'error',
                    timer: 3500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { router.push('/messages') }
                })  
            })
        axios.get('http://127.0.0.1:3000/api/comments/messages/' + this.$route.params.id, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(cmt => {
                const Comment = cmt.data
                for (const i in Comment){
                    const CommentsByCard = document.getElementById("Comments")
                    const OneComment = document.createElement("div")
                    OneComment.classList.add("card", "bg-light", "my-3")
                    if (Comment[i].User.isActive === false) {
                        this.isActive = "<span class='text-danger small'> (supprimé)</span>"
                    }else{
                        this.isActive = ""
                    }
                    OneComment.innerHTML=
                        `<div class="card-header align-items-center m-0 p-1">
                            <div class="d-flex justify-content-between">
                                <span class="small text-dark m-0 p-1">Commentaire de ${Comment[i].User.userName} ${this.isActive}, le ${Comment[i].createdAt.slice(0,10).split('-').reverse().join('/')}</span>
                                <div id="adcom${Comment[i].id}"></div>
                            </div>
                            <hr class="m-0 p-0 bg-secondary">
                            <p class="small text-dark m-0 p-1">${Comment[i].comment}</p>
                        </div>`
                    CommentsByCard.appendChild(OneComment)
                    if (Comment[i].UserId == localStorage.getItem('userId') || localStorage.getItem('role') == 'true' ) {
                        const showAdminComment = document.getElementById("adcom"+`${Comment[i].id}`)
                        const addAdminPanel = document.createElement("div")
                        addAdminPanel.innerHTML = `
                            <a href="#/commentaire/edit/${Comment[i].id}"><img src="../images/edit.svg" class="m-1 p-0" alt="Editer le message" title="Editer le message"/></a>
                            <a href="#/commentaire/drop/${Comment[i].id}"><img src="../images/drop.svg" class="m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>`
                        showAdminComment.appendChild(addAdminPanel)
                    }
                }
            })
            .catch(function(error) {
                const codeError = error.message.split('code ')[1]
                let messageError = ""
                switch (codeError){
                    case '400': messageError = "La liste des commentaires n'a pas été récupéré !";break
                    case '401': messageError = "Requête non-authentifiée !";break
                }
                Swal.fire({
                    title: 'Une erreur est survenue',
                    text: messageError,
                    icon: 'error',
                    timer: 3500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { router.push('/messages') }
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