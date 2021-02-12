<template>
    <b-container fluid >
        <b-row>
            <b-col sm="12" class="mt-5 d-flex justify-content-center">
                <div class="rocket">
                    <img src="@/assets/startup.png" style="width: 100%;" alt="">
                </div>
            </b-col>
            <b-col sm="12" class="mt-5 d-flex justify-content-center">
                <h1>
                    Nos mudamos!!
                </h1>
            </b-col>
            <b-col sm="12" class="mt-5">
                <p style="font-size: 20px;">
                    Debido a las pláticas que tuvimos, llegamos a la conclusión que será mucho mejor tener una app directamente en la nube, por lo cual el sistema ha sido mudado a un servidor web. La app seguirá siendo la misma solo que en algún lugar del espacio.
                </p>

                <p style="font-size: 20px;">
                    Te pido encarecidamente que uses <b>Google Chrome, Chrome Edge</b> o cualquier navegador basado en <b>Chromium</b> para sacarle el mayor provecho al sistema.
                </p>
                <p style="font-size: 20px;">
                    Habiendo dicho esto....
                </p>
            </b-col>
            <b-col sm="12" class="mt-4 d-flex justify-content-center">
                <p style="font-size: 20px;">
                    Presiona el siguiente botón que te deberá llevar a la nueva app.
                </p>
            </b-col>
            <b-col sm="12" class="mt-4 d-flex justify-content-center">
                <b-button type="button" size="lg" variant="primary" @click="go_sitio">Ir al sitio</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import { ipcRenderer } from 'electron'

export default {
    name: 'Aviso',
    data() {
        return {
            
        }
    },
    methods: {
        go_sitio(){
            ipcRenderer.send('aviso')
        }
    },
}
</script>

<style>
    .rocket{

        width: 200px;
        height: 200px;
        
    }
</style>