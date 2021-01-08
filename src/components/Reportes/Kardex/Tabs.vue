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
                        <h1>Reporte de movimientos</h1>
                    </b-col>
                    <b-col sm="12">
                        <b-tabs content-class="mt-3">
                            <b-tab v-if="permisos.pacientes.listar" title="Movimientos" @click="setSubModulo('movimientos')" active></b-tab>
                            <!-- <b-tab v-if="permisos.pacientes.listar" title="Crea producto" @click="setSubModulo('creaproducto')"></b-tab> -->
                            <!-- <b-tab title="Bloqueados" @click="setSubModulo('Bloqueados')"></b-tab> -->
                        </b-tabs>
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'movimientos'">
                        <Movimientos />
                    </b-col>

                    <!-- <b-col sm="12" v-if="submodulo == 'creaproducto'">
                        <CreaProducto />
                    </b-col> -->



                </b-row>
            </b-container>

        </div>
     </div>
</template>

<script>

import Movimientos from '@/components/Reportes/Kardex/Reportes_kardex.vue'
// import CreaProducto from '@/components/Inventarios/CreaProducto.vue'


//--> GIF ANIMADO PARA LAS DESCARGAS

import Loading from '@/components/varios/Loading.vue'


import { mapState } from 'vuex'


export default {
    name: "Template",
    components:{
        Movimientos,
        Loading
    },
    data() {
        return {
            icono: true,
            submodulo: 'movimientos',
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