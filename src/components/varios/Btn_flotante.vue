<template>
    <div class="_circulo" title="Imprimir reporte">
       <i class="fas fa-print"></i>
    </div>
</template>

<script>
export default {
    name: "Flotante",
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style>
    ._circulo{
        width: 55px;
        height: 55px;
        background-color: orangered;
        font-size: 23px;
        position: fixed;
        bottom: 25px;
        right: 25px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        transition: .3s ease;
    }

        ._circulo:hover{
            background-color: yellow;
            color: black;
        }
</style>