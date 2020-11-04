<template>
  <main class="my-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-4">
                    <div class="card bg-light">
                        <img src="../assets/logo.svg" class="card-img-top m-0 p-3" alt="logo groupomania">
                        <p class="h6 m-0 p-0 text-center" style="color:#091F43;">Bienvenu sur le réseau social interne</p>
                        <div class="card-header bg-light">
                            <ul class="nav nav-tabs card-header-tabs justify-content-center">
                              <li class="nav-item">
                                <a class="nav-link" href="#">Accueil</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link active" href="#/login">Connexion</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#/signup">Inscription</a>
                              </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="InputEmail" class="sr-only">Adresse e-mail :</label>
                                    <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="adresse e-mail">
                                </div>
                                <div class="form-group">
                                    <label for="InputPassword" class="sr-only">Mot de passe :</label>
                                    <input type="password" class="form-control" id="InputPassword" placeholder="mot de passe">
                                </div>
                                <button type="submit" class="btn btn-primary btn-sm btn-block">Se connecter</button>
                            </form>
                        </div>
                        <div class="card-footer bg-light">
                            <span class="text-dark">Pas de compte ? <a href="#/signup">Inscrivez-vous</a> !</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style>
  body {
    background-color: #091F43;
  }
</style>