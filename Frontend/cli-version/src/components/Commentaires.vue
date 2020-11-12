<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="OneMessage">
                    <!-- <a href="#" class="my-2 btn btn-small btn-block btn-light text-dark">Poster un message...</a> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import router from '../router'

export default {
	name: "Messages",
    created: function () {
        axios.get('http://127.0.0.1:3000/api/messages/' + this.$route.params.id, { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(res => {
                console.log(res)
                const rep = res.data
                const MessagesByCard = document.getElementById("OneMessage")
                const OneCard = document.createElement("div")
                OneCard.classList.add("card", "bg-light", "my-3")
                OneCard.innerHTML=
                    `<div class="card-header bg-light d-flex align-items-center m-0 p-1">
                        <img src="${rep.userAvatar}" height="40" class="m-0 rounded-circle"/>
                        <span class="small text-dark m-0 p-1">Posté par "${rep.userName}", le ${rep.date}</span>
                    </div>
                    <div class="card-body text-dark text-left" id="MessageContainer">
                        <!--<p class="small">${rep.text}</p>
                        <img src="${rep.image}" class="w-100"/>-->
                    </div>
                    <div class="card-footer bg-light text-dark text-left m-0" id="Commentaire">
                        <!--<p class="h6 small">Il y a ${rep.Commentaire} commentaire(s)</a>-->
                    </div>`
                MessagesByCard.appendChild(OneCard)
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
                const Comment = cmt.data.data
                console.log(Comment)
                ///////////////////////////////////////////////////////////////////////////////////////
                ////////                                                                         //////
                ////////           DECOUPER LES COMMENTAIRES                                     //////
                ////////                                                                         //////
                ///////////////////////////////////////////////////////////////////////////////////////

            })
    }
}
</script>

<style>
  body {
    background-color: #091F43;
  }
</style>