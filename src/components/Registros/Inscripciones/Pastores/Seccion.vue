<template>
    <div class="seccion_ajustes">
        <div class="seccion_ajustes_titulo">
            <h4>
                Pastores
            </h4>
            <b-button v-b-toggle.collapse-4 :variant="btn_seccion ? 'outline-info': 'danger'" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_seccion = !btn_seccion">{{btn_seccion ? 'Expandir': 'Contraer'}}</b-button>
        </div>
        <p>
            Registro de país, iglesia y región
        </p>
        <b-collapse id="collapse-4" class="mt-2">
            <b-card style="background-color: #fafafa;">
                <div class="btn_agregar">
                    <b-button type="button" variant="success" size="sm" @click="abrir_modal">Nuevo registro</b-button>
                </div>
                <table class="table table-bordered table-striped table-sm" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 80%;">
                                Nombre
                            </th>
                            <th style="width: 20%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in pastores" :key="index">
                            <td>
                                {{item.nombre}} {{item.apellidos}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar" @click="editar(item._id)"><i class="fas fa-edit"></i></b-button>
                                <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar" @click="borrar(item._id)"><i class="far fa-trash-alt"></i></b-button>
                                <b-button type="button" size="sm" variant="warning"  title="Información" @click="informacion(item._id)"><i class="fas fa-info-circle"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-card>
        </b-collapse>

        <Registro v-if="modal" v-on:cerrar_modal="cerrar_modal" />
        <Editar v-if="modal_editar" :id="id" v-on:cerrar_modal="cerrar_modal_editar" />

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { pregunta } from '@/components/functions/alertas'

import Registro from './Registro.vue'
import Editar from './Editar.vue'

export default {
    name: 'Seccion',
    components:{
        Registro,
        Editar
    },
    computed:{
        ...mapState(['pastores'])
    },
    data() {
        return {
            btn_seccion: true,
            modal: false,
            modal_editar: false,
            id: ''
        }
    },
    methods: {
        abrir_modal(){
            this.modal = true
        },
        cerrar_modal(){
            this.modal = false
        },
        async borrar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'pastores',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.pastores)
                }
            })

        },
        async editar(id){
            this.modal_editar = true
            this.id = id

        },
        cerrar_modal_editar(){
            this.modal_editar = false
        },
        async informacion(id){

        },
        ...mapActions(['deleteData', 'wse'])
    },
}
</script>

<style>

</style>