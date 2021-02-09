<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner ff">
                <i class="fas fa-guitar" style="margin-right: 5px;"></i>Instrumentos
                <b-button type="button" size="sm" @click="salir" variant="outline-info">Cerrar</b-button>
            </div>
            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-bordered" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <th style="width: 90%;">
                                        Instrumento
                                    </th>
                                    <th style="width: 10%;text-align: center;">
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in instrumentos" :key="index">
                                    <td>
                                        {{item.curso}}
                                    </td>
                                    <td style="text-align: center;">
                                        <b-button type="button" variant="danger" size="sm"><i class="fas fa-minus-square"></i></b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </b-container>
        </div>

        <Pacman />

    </div>
</template>

<script>

import Pacman from '@/components/varios/_Loading.vue'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ModalInstrumentos',
    props:['codigo_alumno'],
    components:{
        Pacman
    },
    computed:{
        ...mapState(['data_res'])
    },
    data() {
        return {
            instrumentos: []
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar_modal', true)
        },
        async getdatos(){
            let info = {
                api: 'cursos/instrumentoxcodigoalumno',
                position: 0,
                formulario: {
                    codigo: this.codigo_alumno
                }
            }

            await this.response_data(info)
            this.instrumentos = this.data_res[0]
        },
        async deleteData(){
            let info = {
                api: 'cursos',
                id
            }
        },
        ...mapActions(['response_data'])
    },
    mounted() {
        this.getdatos()
    },
}
</script>

<style scoped>
    .ff{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>