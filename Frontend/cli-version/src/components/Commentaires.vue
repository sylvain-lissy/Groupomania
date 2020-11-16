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
                                            <textarea class="form-control" v-model="newComment" id="newComment" name="comment" rows="10" placeholder="Votre commentaire ici..."></textarea>
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

export default {
    name: "Messages",
    data() {
        return {
            newComment:'',
            currentUserId:'',
        }
    },
    methods:{
        addNewComment() {
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
                this.UserId = ''
                this.newComment = ''
                location.reload()
            }).catch((error)=>{console.log(error)})
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
                OneMessage.innerHTML=
                    `<div class="card-header bg-light d-flex align-items-center m-0 p-1">
                        <img src="${rep.userAvatar}" height="40" class="m-0 rounded-circle"/>
                        <span class="small text-dark m-0 p-1">Posté par "${rep.userName}", le ${rep.date.slice(0,10).split('-').reverse().join('/') + ' à ' + rep.date.slice(11,16)}</span>
                    </div>
                    <div class="card-body text-dark text-left" id="MessageContainer">
                        <!--<p class="small">${rep.text}</p>
                        <img src="${rep.image}" class="w-100"/>-->
                    </div>
                    <div class="card-footer bg-light text-dark text-left m-0" id="Commentaire">
                        <!--<p class="h6 small">Il y a ${rep.Commentaire} commentaire(s)</a>-->
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
        axios.get('http://127.0.0.1:3000/api/comments/messages/' + this.$route.params.id, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(cmt => {
                const Comment = cmt.data
                console.log(Comment)
                for (const i in Comment){
                    const CommentsByCard = document.getElementById("Comments")
                    const OneComment = document.createElement("div")
                    OneComment.classList.add("card", "bg-light", "my-3")
                    OneComment.innerHTML=
                        `<div class="card-header align-items-center m-0 p-1">
                            <p class="small text-dark m-0 p-1">Commentaire de ${Comment[i].User.userName}, le ${Comment[i].createdAt.slice(0,10).split('-').reverse().join('/')}</p>
                            <hr class="m-0 p-0 bg-secondary">
                            <p class="small text-dark m-0 p-1">${Comment[i].comment}</p>
                        </div>`
                    CommentsByCard.appendChild(OneComment)
                }
            })
    }
}
</script>

<style>
  body {
    background-color: #091F43;
  }
</style>