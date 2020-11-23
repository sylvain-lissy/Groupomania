<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card bg-light">
                    <p class="h5 my-3 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
                    <div class="card-header bg-light d-flex flex-column justify-content-center">
                        <img src="../assets/logo_black.svg" class="m-0 p-0" height="60" alt="logo groupomania">
                        <h5 class="h6 text-center" style="color:#091F43;">Voici quelques informations !</h5>
                    </div>
                    <div class="card-body">
                        <p>Cette application est strictement réservé au personnel du groupe.</p>
                        <p>Pour y accéder, merci de vous <router-link to="/connexion">connecter</router-link> ou de vous <router-link to="/inscription">inscrire</router-link> si vous ne l'avez pas encore fait.</p>
                        <p>Si vous rencontrez un problème ou si vous avez une question, rendez-vous sur la <router-link to="/aide">page d'aide</router-link> ou contactez-nous via la rubrique <a href="email:contactgroupomania.fr">contact</a></p>
                    </div>
                    <div class="card-footer bg-light d-flex justify-content-between">
                        <span class="text-dark">Bonne navigation !</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    Name: "Accueil"
}
</script>

<style>
    body {
        background-color: #091F43
    }
</style>