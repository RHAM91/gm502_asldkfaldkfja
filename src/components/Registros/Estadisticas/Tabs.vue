<template>

     <div>
        <div class="barra" id="navb">
            <div class="menu" @click="AbrirMenu" v-if="icono">
                <i class="far fa-arrow-alt-circle-left"></i>
            </div>
            <div class="menu" @click="AbrirMenu" v-else>
                <i class="fas fa-bars"></i>
            </div>

            <Loading />

            <!-- COMPONENTES DEL MENU -->
        </div>
        <div class="box">
            <b-container fluid>
                <b-row>
                    <b-col sm="12">
                        <h1>Estadísticas</h1>
                    </b-col>
                    <b-col sm="12">
                        <b-tabs content-class="mt-3">
                            <b-tab title="Escritorio" @click="setSubModulo('escritorio')" active></b-tab>
                            <b-tab title="Búsqueda avanzada" @click="setSubModulo('busqueda_avanzada')"></b-tab>
                        </b-tabs>
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'escritorio'">
                        <Escritorio />
                    </b-col>

                </b-row>
            </b-container>

        </div>
     </div>
</template>

<script>

import Escritorio from '@/components/Registros/Estadisticas/Escritorio.vue'

//--> GIF ANIMADO PARA LAS DESCARGAS

import Loading from '@/components/varios/Loading.vue'


import { mapState } from 'vuex'



export default {
    name: "Template",
    components:{
        Loading,
        Escritorio
    },
    data() {
        return {
            icono: true,
            submodulo: 'escritorio',
        }
    },
    computed: {
        ...mapState(['permisos'])
    },
    methods: {
        AbrirMenu(){
            this.$emit('OpenMenu', true)
            this.icono = !this.icono
        },
        setSubModulo(sub){
            this.submodulo = sub
        }
    },
    mounted() {
    },
}
</script>

<style scope>
    .menu{
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        cursor: pointer;
        color: rgb(63, 70, 76);
    }

    .barra{
        width: 100%;
        height: 48px;
        background-color: white;
        transition: .2s ease;
        position: sticky;
        top: 0;
    }

    .box{
        padding: 10px;
        box-sizing: border-box;
    }

   
</style>