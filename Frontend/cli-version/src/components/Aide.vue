<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <router-link v-if="isLogged" to="/messages" class="my-2 btn btn-sm btn-block btn-success">...retour aux messages</router-link>                
                    <div class="card">
                        <div class="card-header bg-light d-flex flex-column justify-content-center">
                            <p class="h5 text-center" style="color:#091F43;">Bienvenu sur la page d'aide</p>
                            <p class="h6 text-center" style="color:#091F43;">Quel est votre problème ?</p>
                        </div>
                        <div class="card-body m-0">
                            <div class="accordion" id="accordionExample">
                                <div class="card border-0">
                                    <div class="card-header bg-white border-0 m-1 p-1" id="headingOne">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link btn-sm btn-block btn-primary text-left text-light collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            Connexion et Inscription
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div class="card-body border-0">
                                            <p class="h6">Comment s'inscrire ?</p>
                                            <ul>
                                                <li class="small">Rendez-vous sur la page d'accueil et choisissez "Inscrivez-vous" ou via le menu en haut à droite.</li>
                                                <li class="small">Remplissez le formulaire avec un nom d'utilisateur, une adresse email et un mot de passe.</li>
                                                <li class="small">Validez et le tour est joué !</li>
                                                <li class="small text-primary">NB: Une photo de profil par défaut vous sera attribuée. Vous pourrez la modifier plus tard.</li>
                                            </ul>
                                            <p class="h6">Comment se connecter ?</p>
                                            <ul>
                                                <li class="small">Rendez-vous sur la page d'accueil et choisissez "Connectez-vous" ou via le menu en haut à droite.</li>
                                                <li class="small">Remplissez le formulaire avec l'adresse email et le mot de passe utilisés lors de l'inscription.</li>
                                                <li class="small">Validez et le tour est joué !</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card border-0">
                                    <div class="card-header bg-white border-0 m-1 p-1" id="headingTwo">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link btn-sm btn-block btn-primary text-left text-light collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Les messages
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="alert alert-danger" role="alert">
                                                À tout moment, un administrateur peut modifier ou supprimer un de vos message si le contenu n'est pas approprié ! 
                                            </div>
                                            <p class="h6">Comment publier un message ?</p>
                                            <ul>
                                                <li class="small">Une fois connecté, vous arriverez directement sur le fil de messages.</li>
                                                <li class="small">Pour publier un nouveau message, cliquer sur le bouton "Poster un message".</li>
                                                <li class="small">Replissez les champs.</li>
                                                <li class="small">Validez et le message est publié !</li>
                                                <li class="small text-primary">NB: Vous pouvez remplir soit le champs de texte, soit choissir une image ou bien les deux.</li>
                                            </ul>
                                            <p class="h6">Comment modifier un message ?</p>
                                            <ul>
                                                <li class="small">Si vous êtes le propriétaire du messages, un menu apparaîtra à droite du message vous offrant la possibilité de le modifier ou de le supprimer.</li>
                                                <li class="small">Pour modifier le message, cliquez sur l'icône <img src="/images/edit.svg"></li>
                                                <li class="small">Remplissez le champ de texte et/ou de l'image.</li>
                                                <li class="small">Validez et le message est modifié !</li>
                                                <li class="small text-primary">NB: Pour le moment, il n'est pas possible de supprimer l'image du message.</li>
                                            </ul>
                                            <p class="h6">Comment supprimer un message ?</p>
                                            <ul>
                                                <li class="small">Si vous êtes le propriétaire du messages, un menu apparaîtra à droite du message vous offrant la possibilité de le modifier ou de le supprimer.</li>
                                                <li class="small">Pour modifier le message, cliquez sur l'icône <img src="/images/drop.svg"></li>
                                                <li class="small">Une fenêtre de confirmation apparaît avec le message.</li>
                                                <li class="small">Validez et le message est supprimé !</li>
                                                <li class="small text-danger">NB: Supprimer un message entraînera la suppression de tout les commentaires associés.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card border-0">
                                    <div class="card-header bg-white border-0 m-1 p-1" id="headingThree">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link btn-sm btn-block btn-primary text-left text-light collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Les commentaires
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="alert alert-danger" role="alert">
                                                À tout moment, un administrateur peut modifier ou supprimer un de vos commentaire si le contenu n'est pas approprié ! 
                                            </div>
                                            <p class="h6">Comment lire les commentaires ?</p>
                                            <ul>
                                                <li class="small">Cliquez sur le lien au bas d'un message pour accéder aux commentaires.</li>
                                            </ul>
                                            <p class="h6">Comment publier un commentaire ?</p>
                                            <ul>
                                                <li class="small">Pour publier un nouveau commentaire, cliquer sur le bouton "Poster un commentaire".</li>
                                                <li class="small">Replissez le champ de text.</li>
                                                <li class="small">Validez et le commentaire est publié !</li>
                                                <li class="small text-primary">NB: Vous ne pouvez pas poster d'image dans un commentaire.</li>
                                            </ul>
                                            <p class="h6">Comment modifier un commentaire ?</p>
                                            <ul>
                                                <li class="small">Si vous êtes le propriétaire du commentaire, un menu apparaîtra à droite du commentaire vous offrant la possibilité de le modifier ou de le supprimer.</li>
                                                <li class="small">Pour modifier le commentaire, cliquez sur l'icône <img src="/images/edit.svg"></li>
                                                <li class="small">Remplissez le champ de texte .</li>
                                                <li class="small">Validez et le commentaire est modifié !</li>
                                            </ul>
                                            <p class="h6">Comment supprimer un commentaire ?</p>
                                            <ul>
                                                <li class="small">Si vous êtes le propriétaire du commentaire, un menu apparaîtra à droite du commentaire vous offrant la possibilité de le modifier ou de le supprimer.</li>
                                                <li class="small">Pour modifier le commentaire, cliquez sur l'icône <img src="/images/drop.svg"></li>
                                                <li class="small">Une fenêtre de confirmation apparaît avec le commentaire.</li>
                                                <li class="small">Validez et le commentaire est supprimé !</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card border-0">
                                    <div class="card-header bg-white border-0 m-1 p-1" id="headingFour">
                                        <h2 class="mb-0">
                                            <button class="btn btn-link btn-sm btn-block btn-primary text-left text-light collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            Mon compte
                                            </button>
                                        </h2>
                                    </div>
                                    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <p class="h6">Comment me déconnecter ?</p>
                                            <ul>
                                                <li class="small">Rendez-vous sur votre menu en haut à droite.</li>
                                                <li class="small">Choisisez "Déconnexion".</li>
                                                <li class="small">Validez et le tour est joué !</li>
                                            </ul>
                                            <p class="h6">Comment modifier ma photo de profil ?</p>
                                            <ul>
                                                <li class="small">Rendez-vous sur votre menu en haut à droite.</li>
                                                <li class="small">Choisissez "Mon compte".</li>
                                                <li class="small">Choisissez "Changer de photo".</li>
                                                <li class="small">Choisissez une nouvelle photo.</li>
                                                <li class="small">Validez et le tour est joué !</li>
                                            </ul>
                                            <p class="h6">Comment voir tous mes messages ?</p>
                                            <ul>
                                                <li class="small">Rendez-vous sur votre menu en haut à droite.</li>
                                                <li class="small">Choisissez "Mes messages".</li>
                                                <li class="small">Vous serez redirigé vers une page contenant tous vos messages !</li>
                                            </ul>
                                            <p class="h6">Comment supprimer mon compte ?</p>
                                                <ul>
                                                <li class="small">Rendez-vous sur votre menu en haut à droite.</li>
                                                <li class="small">Choisissez "Mon compte".</li>
                                                <li class="small">Choisissez "Supprimer mon compte".</li>
                                                <li class="small">Une fenêtre de confirmation apparaî.</li>
                                                <li class="small">Validez et votre compte sera supprimé et vous serez automatiquement déconnecté !</li>
                                                <li class="small text-danger">NB: Vous ne pourrez plus vous connecter avec cette adresse email mais vos messages et commentaires seront toujours visible par les autres utilisateurs.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>                
                        </div>
                        <div v-if="!isLogged" class="card-footer">
                            <router-link to="/connexion">Connectez-vous</router-link> ou
                            <router-link to="/inscription">Inscrivez-vous</router-link> !
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    Name: "Aide",
    computed:{
        isLogged() {
            if (localStorage.getItem("token") !== null) {   
                return true
            }
            return false
        }
    }
}
</script>

<style>
    body {
        background-color: #091F43
    }
</style>