<template>
    <div class="contenedor_modalbusqueda">
        <div class="cuerpo_modalbusqueda">
            <div class="cabecera_modalbusqueda">

            </div>

            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <b-form-input type="text" id="campobusquedamodal" v-model="campobusquedaproducto" size="sm" @keydown.enter="buscarproducto" placeholder="Escribe algo"></b-form-input>
                    </b-col>

                    <!-- <b-col sm="2" class="mt-3">
                        <b-button type="button" size="sm" variant="warning" @click="buscarproducto">Buscar</b-button>
                    </b-col> -->

                    <b-col sm="12" class="mt-3">
                        <div class="cuadro_modalbusqueda">
                        <table class="table table-sm table-striped tabla_">
                            <thead>
                                <tr>
                                    <th style="width: 15%">
                                        Código
                                    </th>
                                    <th style="width: 40%">
                                        Nombre
                                    </th>
                                    <th style="width: 15%;text-align: center;">
                                        B.Iglesia
                                    </th>
                                    <th style="width: 15%;text-align: center;">
                                        B.Oficina
                                    </th>
                                    <th style="width: 15%;text-align: center;">
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in req_productos" :key="index">
                                    <td>
                                        {{item.codigo}}
                                    </td>
                                    <td>
                                        {{item.nombre}}
                                    </td>
                                    <td style="text-align: center;">
                                       {{item.existencia_iglesia}}
                                    </td>
                                    <td style="text-align: center;">
                                        {{item.existencia_oficina}}
                                    </td>
                                    <td>
                                        <b-button type="button" size="sm" @click="seleccionarelemento(item.codigo)" variant="danger">Seleccionar</b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </b-col>
                </b-row>
            </b-container>

        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'


export default {
    name: "ModalBusqueda",
    data() {
        return {
            campobusquedaproducto: '',
            req_productos: [],
        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    methods: {
        salir(){
            this.$emit('cerrarmodal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.salir()
            }
        },
        async buscarproducto(){
            let productos = await axios.get(`http://${IP}:${PUERTO}/api/productos/p/${this.campobusquedaproducto}`, this.$store.state.token)
            this.req_productos = productos.data

            this.campobusquedaproducto = ''
            document.getElementById('campobusquedamodal').focus()
        },
        seleccionarelemento(id){
            this.$emit('IDP', id)
            this.salir()
        }
    },
    mounted() {
        document.getElementById('campobusquedamodal').focus()
    },
}
</script>

<style>
    .contenedor_modalbusqueda{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .cuerpo_modalbusqueda{
            width: 700px;
            height: 500px;
            background-color: white;

        }

        .cabecera_modalbusqueda{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #ededed;
        }

        .cuadro_modalbusqueda{
            width: 100%;
            margin-top: 10px;
            height: 375px;
            overflow: auto;
        }

        .tabla_{
            width: 100%;
            font-size: 13px;
        }
</style>