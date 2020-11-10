<template>
    <div id="navbarContent" class="m-0 p-0 justify-content-end align-self-center">
        <div class="nav-item dropdown m-0 p-0">
            <a class="nav-item nav-link m-0 p-0" href="" data-toggle="dropdown" id="my_account" aria-haspopup="true" aria-expanded="false">
                <span class="navbar-toggler-icon"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="my_account">
                <router-link to="/connexion" class="dropdown-item">Connexion</router-link>
                <router-link to="/inscription" class="dropdown-item">Inscription</router-link>
            </div>
        </div>            
    </div>
</template>

<script>
export default {
    name: 'NavDefault',
}
</script>