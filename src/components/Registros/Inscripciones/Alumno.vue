<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-bordered table-striped" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 45%;">
                                Código
                            </th>
                            <th style="width: 45%;">
                                Nombre
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Instrumento
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Nivel
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Teléfono
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Iglesia
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Pastor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in alumnos" :key="index">
                            <td>
                                {{item.nombre}} {{item.apellidos}}
                            </td>
                            <td style="text-align: center;">
                                {{item.curso}}
                            </td>
                            <td style="text-align: center;">
                                {{item.pais}}
                            </td>
                            <td style="text-align: center;">
                                {{item.region}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="warning"><i class="fas fa-info-circle"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <Registro v-if="modal_registro" v-on:cerrar_modal="cerrar_modal_registro" />

        <div class="btn_flotante_add" @click="abrir_modal_registro">
            <i class="fas fa-plus"></i>
        </div>
    </b-container>
</template>

<script>

import Registro from './Alumno/Registro.vue'

import { mapState } from 'vuex'
export default {
    name: 'ListaAlumnos',
    computed:{
        ...mapState(['alumnos'])
    },
    components:{
        Registro
    },
    data() {
        return {
            modal_registro: false
        }
    },
    methods: {
        abrir_modal_registro(){
            this.modal_registro = true
        },
        cerrar_modal_registro(){
            this.modal_registro = false
        }
    },
}
</script>

<style>
    .btn_flotante_add{
        position: fixed;
        bottom: 15px;
        right: 15px;
        color: white;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #392f5a;
        transition: .4s ease-in-out;
        cursor: pointer;
    }

        .btn_flotante_add:hover{
            background-color: #ff8811;
        }
</style>