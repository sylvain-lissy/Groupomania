<template>
    <div id="navbarContent" class="m-0 p-0 justify-content-end align-self-center">
        <div class="nav-item dropdown m-0 p-0">
            <a class="nav-item nav-link m-0 p-0" href="#" data-toggle="dropdown" id="my_account" aria-haspopup="true" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
                <!-- <img src="./images/avatars/default_user.jpg" alt="Profil par défaut" height="37" class="my-0 rounded-circle"/> -->
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="my_account">
                <a class="dropdown-item" href="#/connexion">Connexion</a>
                <a class="dropdown-item" href="#/inscription">Inscription</a>
            </div>
        </div>            
    </div>
</template>

<script>
export default {
    name: 'NavDefault',
}
</script>