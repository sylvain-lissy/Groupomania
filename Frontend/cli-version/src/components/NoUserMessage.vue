<template>
    <div class="card bg-light mt-3">
        <div class="card-body d-flex flex-column flex-md-row justify-content-center align-items-center p-1 m-1">
            <div class="col-12 col-md-3 text-center">
                <img src="/images/sad.svg" width="100" height="100">
            </div>
            <div class="col-12 col-md-9 mt-3 mt-md-0 p-0 p-md">
                <p>Vous n'avez posté aucun message pour le moment...</p>
                <p>C'est bien dommage, vous devriez peut-être commencé !</p>
                <p>N"hésitez plus et poster <a href="#/messages/">votre premier message</a>.</p>
            </div>
        </div>
    </div>           
</template>

<script>
export default {
    Name: "No User Message"
}
</script>