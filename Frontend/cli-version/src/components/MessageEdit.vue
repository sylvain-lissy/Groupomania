<template>
    <div id="modalEditMessage" tabindex="-1" aria-labelledby="modalEditMessage" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <form enctype="multipart/form-data">
                    <div class="modal-header d-flex flex-column flex-md-row align-items-center justify-content-start">
                        <p class="modal-title h5 mr-1">Editer message</p>
                        <p class="modal-title mt-1" :class="editorColor">{{editorTag}}</p>
                    </div>
                    <div class="row modal-body">
                        <div class="col-12 justify-content-center form-group">
                            <label for="editMessage" class="sr-only">Message :</label>
                            <textarea class="form-control" v-model="editMessage" id="editMessage" name="message" rows="10" placeholder="Votre message ici..."></textarea>
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
                            <div class="col-6"><a href="#/messages" class="btn btn-secondary btn-block">Annuler</a></div>
                            <div class="col-6"><button type="submit" @click.prevent="updateMessage()" class="btn btn-success btn-block">Valider</button></div>
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
    name: "Message Edit",
    data() {
        return {
            editMessage: "",
            editUserId: "",
            newImage: "",
            editorTag: "",
            editorColor: "text-secondary",
            file: null,
            isSucces: false
        }
    },
    methods: {
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        updateMessage() {
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("message", this.editMessage.toString())
            axios.put("http://127.0.0.1:3000/api/messages/" + this.$route.params.id, formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(res=> {
                if (res.status === 200) {
                    Swal.fire({
                        text: "Le message à été mis à jour !",
                        footer: "Redirection en cours...",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => { this.file = null; router.push("/messages") }
                    })
                }
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "400": messageError = "Le message n'a pas été mis à jour !"; break
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
    beforeMount () {
        axios.get("http://127.0.0.1:3000/api/messages/" + this.$route.params.id, { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {
            this.editUserId = res.data.userId
            console.log(res)
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
        background-color: #091F43;
    }
</style>