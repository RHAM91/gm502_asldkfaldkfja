<template>
    <b-container>
        <b-row>
            <b-col sm="12" md="6" class="mt-3">
                <video autoplay></video>
                <canvas width="800" height="600"></canvas>
                <div id="takePhoto">
                    <b-button type="button" variant="success" size="sm" @click="takePhoto">Captura</b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
const { ipcRenderer } = require('electron')
let video


export default {
    name: 'Escritorio',
    data() {
        return {
            
        }
    },
    methods: {
        iniciar(){
            video = window.document.querySelector('video')
            let errorCallback = (error) =>{
                console.log('Hubo un error al conectar con el strim de video' + error.message)
            }

            window.navigator.webkitGetUserMedia({video: true}, (localMediaStream) => {
                video.srcObject = localMediaStream
            }, errorCallback);
        },
        takePhoto(){
            let canvas = window.document.querySelector('canvas');
            canvas.getContext('2d').drawImage(video, 0, 0, 800, 600);
            let photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

            ipcRenderer.send('foto', photoData);
        }
    },
    mounted() {
        this.iniciar()
    },
}
</script>

<style>
    #saveFile, canvas {
        display: none;
    }

</style>