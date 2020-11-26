<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="allMessages">
                    <div class="row">
                        <div class="col-6 pr-1"><a href="#/messages" class="btn btn-sm btn-block btn-success">...retour aux messages</a></div>
                        <div class="col-6 pl-1"><a href="#/compte" class="btn btn-sm btn-block btn-primary">retour à mon compte...</a></div>
                    </div>
                    <noUserMessage v-if="noUserMessage"></noUserMessage>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import noUserMessage from "./NoUserMessage"
import axios from "axios"
import Swal from "sweetalert2"

export default {
    name: "Messages",
    components: { 
        noUserMessage
    },
    data() {
        return {
            noUserMessage: false,
            isAdmin: false,
            isActive: true,
            newImage: "",
            currentUserId: "", 
            newMessage: "",
            file: null
        }
    },
    created: function() {
        this.isAdmin = localStorage.getItem("role")
        this.currentUserId = localStorage.getItem("userId")
        if (localStorage.getItem("refresh")===null) {
            localStorage.setItem("refresh", 0)
            location.reload()
        }
        axios.get("http://127.0.0.1:3000/api/messages/users/" + localStorage.getItem("userId") ,{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            const rep = res.data.ListeMessages
            if (rep.length === 0) { this.noUserMessage = true } else { this.noUserMessage = false }
            for (const message in rep) {
                const MessagesByCard = document.getElementById("allMessages")
                const OneCard = document.createElement("div")
                if (rep[message].isActive === false) {
                    this.isActive = "<span class='text-danger small'> (supprimé)</span>"
                } else {
                    this.isActive = ""
                }
                OneCard.classList.add("card", "bg-light", "my-3")
                OneCard.innerHTML=
                    `<div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <img src="${rep[message].avatar}" height="40" class="m-0 rounded-circle"/>
                            <span class="small text-dark m-0 p-1">Posté par ${rep[message].userName} ${this.isActive}, le ${rep[message].createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + rep[message].createdAt.slice(11,16)}</span>
                            <div id="adus${rep[message].id}"></div>                               
                    </div>
                    <div class="card-body text-dark text-left" id="MessageContainer${rep[message].id}">
                    </div>
                    <div class="card-footer bg-light text-dark text-left m-0">
                        <a href="#/commentaires/${rep[message].id}" class="h6 small">Voir les commentaires</a>
                    </div>`
                MessagesByCard.appendChild(OneCard)
                if (!rep[message].message == null || !rep[message].message == "") {
                    const MessageTexte = document.getElementById("MessageContainer"+`${rep[message].id}`)
                    const TextContainer = document.createElement("p")
                    TextContainer.classList.add("small")
                    TextContainer.innerHTML= `${rep[message].message}`
                    MessageTexte.appendChild(TextContainer)
                }
                if (!rep[message].messageUrl == null || !rep[message].messageUrl == '') {
                    const MessageImage = document.getElementById("MessageContainer"+`${rep[message].id}`)
                    const ImageContainer = document.createElement("img")
                    ImageContainer.classList.add("w-100")
                    ImageContainer.setAttribute("src", `${rep[message].messageUrl}`)
                    MessageImage.appendChild(ImageContainer)
                }
                if (rep[message].UserId == localStorage.getItem("userId") || localStorage.getItem("role") == "true" ) {
                    const showAdminPost = document.getElementById("adus"+`${rep[message].id}`)
                    const addAdminPanel = document.createElement("div")
                    addAdminPanel.innerHTML = `
                        <a href="#/message/edit/${rep[message].id}"><img src="../images/edit.svg" class="m-1 p-0" alt="Editer le message" title="Editer le message"/></a>
                        <a href="#/message/drop/${rep[message].id}"><img src="../images/drop.svg" class="m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>`
                    showAdminPost.appendChild(addAdminPanel)
                }
            }
        })
        .catch((error)=>{
            const codeError = error.message.split("code ")[1]
            let messageError = ""
            switch (codeError){
                case "400": messageError = "La liste des messages n'a pas été récupérer !"; break
            }
            Swal.fire({
                title: "Une erreur est survenue",
                text: messageError || error.message,
                icon: "error",
                timer: 3500,
                showConfirmButton: false,
                timerProgressBar: true
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