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
                                <img src="../assets/default_user.jpg" alt="Image de profile" height="40" class="my-0 rounded-circle"/>
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
                                <a class="nav-link active" href="#/addmessage">Poster</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#/messages">Derniers messages</a>
                              </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="Message_content" class="sr-only">Saisir votre texte ici</label>
                                    <textarea class="form-control" id="Message_content" rows="6" placeholder="Votre message ici..."></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="Upload_file" class="sr-only">Choix du fichier</label>
                                    <input type="file" class="form-control-file form-control-sm text-dark" id="upload_file">
                                </div>
                                <button type="submit" class="btn btn-primary btn-sm btn-block">Poster mon message</button>
                            </form>
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