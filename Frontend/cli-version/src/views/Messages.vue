<template>
    <div style="background-color: #091F43;">
        <div class="container">
            <div class="row">
                <nav class="col navbar navbar-expand-md navbar-dark">
                    <a class="navbar-brand" href="#">
                        <img src="../assets/logo_white.svg" alt="logo groupomania" height="40" class="my-0"/>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarContent" class="m-0 p-0 h6 collapse navbar-collapse justify-content-end align-self-center">
                        <div class="nav-item dropdown">
                            <a class="nav-item nav-link mr-md-2" href="#" data-toggle="dropdown" id="my_account" aria-haspopup="true" aria-expanded="false">
                                <img src="../assets/default_user.jpg" alt="Image de profile" height="48" class="my-0 rounded-circle"/>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="my_account">
                                <a class="dropdown-item" href="#/account">Mon compte</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#/messages">Mes messages</a>
                                <a class="dropdown-item" href="#/comments">Mes commentaires</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#/logout">Déconnexion</a>
                            </div>
                        </div>            
                    </div>
                </nav>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card bg-light">
                        <div class="card-header bg-light">
                            <ul class="nav nav-tabs card-header-tabs justify-content-center">
                              <li class="nav-item">
                                <a class="nav-link" href="#/addmessage">Poster</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link active" href="#/messages">Derniers messages</a>
                              </li>
                            </ul>
                        </div>
                        <div class="card-body" style="background-color:#D4D4D4;">
                            <div class="row mt-3">
                                <div class="col-12">
                                    <div class="card bg-light">
                                        <div class="card-header bg-light d-flex align-items-center m-0 p-1">
                                            <img src="../assets/default_user.jpg" height="40" class="m-0 rounded-circle"/>
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
                </div>
            </div>
        </div>
    </div>
</template>
<style>
  body {
    background-color: #091F43;
  }
</style>