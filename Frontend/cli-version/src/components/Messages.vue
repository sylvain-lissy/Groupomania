<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="allMessages">
                    <a href="#" class="my-2 btn btn-small btn-block btn-light text-dark disabled">Poster un message...</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
	name: "Messages",
    created: function () {
        axios.get('http://127.0.0.1:3000/api/messages',{ headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')} })
            .then(res => {
                console.log(res)
                const rep = res.data.ListeMessages
                for (const message in rep){
                    const MessagesByCard = document.getElementById("allMessages")
                    const OneCard = document.createElement("div")
                    OneCard.classList.add("card", "bg-light", "my-3")
                    OneCard.innerHTML=
                        `<div class="card-header bg-light d-flex align-items-center m-0 p-1">
                            <img src="${rep[message].msgIcn}" height="40" class="m-0 rounded-circle"/>
                            <span class="small text-dark m-0 p-1">Posté par "${rep[message].msgUsr}", le ${rep[message].msgDate.slice(0,10).split('-').reverse().join('/') + ' à ' + rep[message].msgDate.slice(11,16)}</span>
                        </div>
                        <div class="card-body text-dark text-left" id="MessageContainer${rep[message].msgId}">
                            <!--<p class="small">${rep[message].msgTxt}</p>
                            <img src="${rep[message].msgImg}" class="w-100"/>-->
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