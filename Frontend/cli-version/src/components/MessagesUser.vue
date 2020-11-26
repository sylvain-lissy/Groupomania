<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="allMessages">
                    <div class="row my-2">
                        <div class="col-6 pr-1"><a href="#/messages" class="btn btn-sm btn-block btn-success">...retour aux messages</a></div>
                        <div class="col-6 pl-1"><a href="#/compte" class="btn btn-sm btn-block btn-primary">retour à mon compte...</a></div>
                    </div>
                    <div v-for="message in userMessages" :key="message.id" class="card bg-light my-3">
                        <div class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <div>
                                <img :src="message.avatar" height="40" class="m-0 rounded-circle"/>
                                <span class="small text-dark m-0 p-1" >
                                    Posté par {{message.userName}} 
                                    <span v-if="!message.isActive" class="small text-danger">(supprimé)</span>, 
                                    le {{message.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + message.createdAt.slice(11,16)}}
                                </span>
                            </div>                                
                            <div>
                                <a :href="'#/message/edit/' + message.id"><img src="/images/edit.svg" class="m-1 p-0" alt="Editer le message" title="Editer le message"/></a>
                                <a :href="'#/message/drop/' + message.id"><img src="/images/drop.svg" class="m-1 p-0" alt="Supprimer le message" title="Supprimer le message"/></a>
                            </div>                               
                        </div>
                        <div class="card-body text-dark text-left">
                            <p class="small" v-if="message.message !== ''"> {{message.message}} </p>
                            <img class="w-100" :src="message.messageUrl" v-if="message.messageUrl !== ''">
                        </div>
                        <div class="card-footer bg-light text-dark text-left m-0">
                            <a :href="'#/commentaires/' + message.id" class="h6 small">Voir les commentaires</a>
                        </div>
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
    name: "Messages User",
    components: { 
        noUserMessage
    },
    data() {
        return {
            noUserMessage: false,
            newImage: "",
            currentUserId: "", 
            newMessage: "",
            file: null,
            userMessages: []
        }
    },
    created: function() {
        if (localStorage.getItem("refresh")===null) {
            localStorage.setItem("refresh", 0)
            location.reload()
        }
        axios.get("http://127.0.0.1:3000/api/messages/users/" + localStorage.getItem("userId") ,{ headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            const rep = res.data.ListeMessages
            if (rep.length === 0) { this.noUserMessage = true } else { this.noUserMessage = false }
            this.userMessages = rep
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