<template>
    <div>
        <NavHeader></NavHeader>
        
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8" id="allMessages">
                    <a href="" class="my-2 btn btn-small btn-block btn-light text-dark">Poster un message...</a>
                    <div class="card bg-light my-3">
                        <div class="card-header bg-light d-flex align-items-center m-0 p-1">
                            <img src="/images/avatars/default_user.jpg" height="40" class="m-0 rounded-circle"/>
                            <span class="small text-dark m-0 p-1">Posté par "Administrateur", le 28/10/2020 à 15:38</span>
                        </div>
                        <div class="card-body text-dark text-left">
                            <p class="small">Voici le premier message !</p>
                            <p class="small">Et oui :)</p>
                            <img src="../images/background.png" class="w-100"/>
                        </div>
                        <div class="card-footer bg-light text-dark text-left m-0">
                                <a href="#/comments" class="h6 small">01 commentaire(s) +</a>
                        </div>
                    </div>
                </div>           
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavHeader from '../components/NavHeader'

export default {
	name: "Messages",
	components: {
		NavHeader
    },
    data () {
        return {
            Mname:"",
            Mdate:"",
            Mmsg:"",
            Mimg:"",
            Mcmt:""
        }
    },
    created: function () {
        axios.get('http://127.0.0.1:3000/api/messages/')
            .then(message => {
                console.log(message)
                // message.array.forEach(element => {
                // });
            })
    }
}
</script>

<style>
  body {
    background-color: #091F43;
  }
</style>