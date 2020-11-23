<template>
    <div class="card bg-light">
        <p class="h5 my-3 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
        <div class="card-header bg-light d-flex justify-content-center">
            <img src="../assets/logo_black.svg" class="w-75 m-0 p-0" alt="logo groupomania">
        </div>
        <div class="card-body d-flex flex-column flex-md-row justify-content-center align-items-center p-1 m-1">
            <div class="col-12 col-md-9 mt-3 mt-md-0 p-0 p-md">
                <p>Vous êtes la première personne à vous connecter, félicitations !</p>
                <p>Il n'y a aucun message à lire pour le moment...</p>
                <p>À vous de commencer en postant le premier message !</p>
            </div>
            <div class="col-12 col-md-3 text-center">
                <img src="/images/edit.svg" width="100" height="100">
            </div>
        </div>
    </div>           
</template>

<script>
export default {
    Name: "No Message"
}
</script>