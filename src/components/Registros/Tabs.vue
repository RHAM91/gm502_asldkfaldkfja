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
                        <h1>Inscripciones</h1>
                    </b-col>
                    <b-col sm="12">
                        <b-tabs content-class="mt-3">
                            <b-tab title="Alumno" @click="setSubModulo('alumno')" active></b-tab>
                            <!-- <b-tab title="Búsqueda avanzada" @click="setSubModulo('busqueda_avanzada')"></b-tab> -->
                            <b-tab title="Solventes" @click="setSubModulo('solventes')"></b-tab>
                            <b-tab title="Insolventes" @click="setSubModulo('insolventes')"></b-tab>
                            <b-tab title="Desactivados" @click="setSubModulo('desactivados')"></b-tab>
                            <b-tab title="Estadisticas" @click="setSubModulo('conteo')"></b-tab>
                            <b-tab title="Ajustes" @click="setSubModulo('ajustes')"></b-tab>
                            <!-- <b-tab title="Bloqueados" @click="setSubModulo('Bloqueados')"></b-tab> -->
                        </b-tabs>
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'alumno'">
                        <Alumno />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'ajustes'">
                        <Ajustes />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'busqueda_avanzada'">
                        <BusquedaAvanzada />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'solventes'">
                        <Solventes />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'insolventes'">
                        <Insolventes />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'conteo'">
                        <Estadisticas />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'desactivados'">
                        <Desactivados />
                    </b-col>

                </b-row>
            </b-container>

        </div>
     </div>
</template>

<script>

import Alumno from '@/components/Registros/Inscripciones/Alumno.vue'
import BusquedaAvanzada from '@/components/Registros/Inscripciones/Alumno/Busqueda_avanzada.vue'
import Solventes from './Inscripciones/Alumno/Solventes.vue'
import Insolventes from './Inscripciones/Alumno/Insolventes.vue'
import Estadisticas from './Inscripciones/Estadisticas/Conteo.vue'
import Desactivados from './Inscripciones/Alumno/Desactivados.vue'

//--> GIF ANIMADO PARA LAS DESCARGAS

import Loading from '@/components/varios/Loading.vue'


import { mapState } from 'vuex'
import Ajustes from './Inscripciones/Ajustes.vue'


export default {
    name: "Template",
    components:{
        Loading,
        Alumno,
        Ajustes,
        BusquedaAvanzada,
        Solventes,
        Insolventes,
        Desactivados,
        Estadisticas
    },
    data() {
        return {
            icono: true,
            submodulo: 'alumno',
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