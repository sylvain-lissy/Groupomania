<template>
    <div id="modalDropMessage" tabindex="-1" aria-labelledby="modalDropMessage" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content border border-danger">
                <form enctype="multipart/form-data">
                    <div class="modal-header d-flex flex-column flex-md-row align-items-center justify-content-start">
                        <p class="modal-title h5 mr-1 text-danger">Supprimer le message ?</p>
                        <p class="modal-title mt-1" :class="editorColor">{{editorTag}}</p>
                    </div>
                    <div class="row modal-body">
                        <div class="col-12 justify-content-center form-group">
                            <label for="editMessage" class="sr-only">Message :</label>
                            <textarea class="form-control" v-model="editMessage" id="editMessage" name="message" rows="10" disabled></textarea>
                        </div>
                        <div class="col-12 justify-content-center text-center">
                            <img :src="newImage" class="w-50 rounded">
                            <p class="small text-center">Image à partager</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="row w-100 justify-content-spacebetween">
                            <div class="col-6"><a href="#/messages" class="btn btn-secondary btn-block">Annuler</a></div>
                            <div class="col-6"><button type="submit" @click.prevent="deleteMessage()" class="btn btn-success btn-block">Valider</button></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import router from "../router"
import Swal from "sweetalert2"

export default {
    name: "Message Drop",
    data() {
        return {
            newImage: "",
            editMessage: "",
            editUserId: "",
            editorTag: "",
            editorColor: "text-secondary",
            isSucces: false
        }
    },
    methods: {
        deleteMessage() {
            axios.delete("http://127.0.0.1:3000/api/messages/" + this.$route.params.id, { headers: { "Authorization":"Bearer " + localStorage.getItem("token") }})
            .then(res=> {
                if (res.status === 200) {
                    Swal.fire({
                        text: "Le message à été supprimé !",
                        footer: "Redirection en cours...",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => { router.push("/messages") }
                    })
                }
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "400": messageError = "Le message n'a pas été supprimé !"; break
                    case "401": messageError = "Requête non-authentifiée !"; break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.message,
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true
                })  
            })
        }
    },
    beforeMount() {
        axios.get("http://127.0.0.1:3000/api/messages/" + this.$route.params.id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            this.editUserId = res.data.userId
            if (this.editUserId == localStorage.getItem("userId"))  {
                this.editorTag = "( Utilisateur : " + res.data.userName + " )"
                this.editMessage = res.data.message
                this.newImage = res.data.messageUrl
            } else if ( localStorage.getItem("role") == "true") {
                this.editorTag = "( Administrateur : " + localStorage.getItem("userName") + " )"
                this.editMessage = res.data.message
                this.newImage = res.data.messageUrl
                this.editorColor = "text-danger"
            } else {
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: "Vous n'avez pas accès à cette fonctionnalité !",
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => { router.push("/messages") }
                })  
            }
        })
        .catch(function(error) {
            const codeError = error.message.split("code ")[1]
            let messageError = ""
            switch (codeError){
                case "400": messageError = "Le message n'a pas été mis à jour !"; break
                case "401": messageError = "Requête non-authentifiée !"; break
                case "404": messageError = "Le message n'existe pas !"; break
            }
            Swal.fire({
                title: "Une erreur est survenue",
                text: messageError || error.message,
                icon: "error",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { router.push("/messages") }
            })  
        })
    }
}
</script>

<style>
    body {
        background-color: #091F43
    }
</style>