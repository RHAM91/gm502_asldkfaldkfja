<template>
    <div class="seccion_ajustes">
        <div class="seccion_ajustes_titulo">
            <h4>
                Docentes
            </h4>
            <b-button v-b-toggle.collapse-2 :variant="btn_seccion ? 'outline-info': 'danger'" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_seccion = !btn_seccion">{{btn_seccion ? 'Expandir': 'Contraer'}}</b-button>
        </div>
        <p>
            Registro de docentes
        </p>
        <b-collapse id="collapse-2" class="mt-2">
            <b-card style="background-color: #fafafa;">
                <div class="btn_agregar">
                    <b-button type="button" variant="success" size="sm" @click="abrir_modal">Nuevo registro</b-button>
                </div>
                <table class="table table-bordered table-striped table-sm" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 25%;">
                                Nombre
                            </th>
                            <th style="width: 15%;text-align: center;">
                                País
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Teléfono
                            </th>
                            <th style="width: 25%;text-align: center;">
                                Correo
                            </th>
                            <th style="width: 20%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in docentes" :key="index">
                            <td>
                                {{item.nombre}}
                            </td>
                            <td style="text-align: center;">
                                {{item.pais}}
                            </td>
                            <td style="text-align: center;">
                                {{item.telefono}}
                            </td>
                            <td style="text-align: center;">
                                {{item.correo}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar"><i class="fas fa-edit"></i></b-button>
                                <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar" @click="borrar(item._id)"><i class="far fa-trash-alt"></i></b-button>
                                <b-button type="button" size="sm" variant="warning"  title="Información"><i class="fas fa-info-circle"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-card>
        </b-collapse>


        <Registro v-if="modal_registro" v-on:cerrar_modal="cerrar_modal" />

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {pregunta} from '@/components/functions/alertas'

import Registro from './Registro.vue'

export default {
    name: 'SeccionDocentes',
    components:{
        Registro
    },
    computed:{
        ...mapState(['docentes'])
    },
    data() {
        return {
            btn_seccion: true,
            modal_registro: false
        }
    },
    methods: {
        abrir_modal(){
            this.modal_registro = true
        },
        cerrar_modal(){
            this.modal_registro = false
        },
        async borrar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data  = {
                        api: 'docentes',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.docentes)
                }
            })

        },
        ...mapActions(['deleteData', 'wse'])
    },
}
</script>

<style>

</style>