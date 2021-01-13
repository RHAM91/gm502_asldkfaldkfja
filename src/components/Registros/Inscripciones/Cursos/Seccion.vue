<template>
    <div class="seccion_ajustes">
        <div class="seccion_ajustes_titulo">
            <h4>
                Cursos
            </h4>
            <b-button v-b-toggle.collapse-1 :variant="btn_seccion ? 'outline-info': 'danger'" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_seccion = !btn_seccion">{{btn_seccion ? 'Expandir': 'Contraer'}}</b-button>
        </div>
        <p>
            Registro de cursos que se imparten en la academia
        </p>
        <b-collapse id="collapse-1" class="mt-2">
            <b-card style="background-color: #fafafa;">
                <div class="btn_agregar">
                    <b-button type="button" variant="success" size="sm" @click="abrir_modal_cursos">Nuevo registro</b-button>
                </div>
                <table class="table table-bordered table-striped table-sm" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 70%;">
                                Nombre
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Código
                            </th>
                            <th style="width: 20%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cursos" :key="index">
                            <td>
                                {{item.curso}}
                            </td>
                            <td style="text-align: center;">
                                {{item.correlativo}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar" @click="editar(item._id)"><i class="fas fa-edit"></i></b-button>
                                <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar" @click="borrar(item._id)"><i class="far fa-trash-alt"></i></b-button>
                                <b-button type="button" size="sm" variant="warning"  title="Información"><i class="fas fa-info-circle"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-card>
        </b-collapse>

        <RegistroCurso v-if="modal_cursos" v-on:cerrar_modal_cursos="cerrar_modal_cursos"/>
        <Editar v-if="modal_editar" v-on:cerrar_modal="cerrar_modal_editar" :id="id" />

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RegistroCurso from './Registro.vue'
import Editar from './Editar.vue'
import { pregunta } from '@/components/functions/alertas'

export default {
    name: 'Listado',
    components:{
        RegistroCurso,
        Editar
    },
    computed:{
        ...mapState(['cursos'])
    },
    data() {
        return {
            btn_seccion: true,
            modal_cursos: false,
            modal_editar: false,
            id: ''
        }
    },
    methods: {
        abrir_modal_cursos(){
            this.modal_cursos = true
        },
        cerrar_modal_cursos(){
            this.modal_cursos = false
        },
        async borrar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'cursos',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.cursos)
                }
            })
        },
        editar(id){
            this.modal_editar = true
            this.id = id
        },
        cerrar_modal_editar(){
            this.modal_editar = false
        },
        ...mapActions(['deleteData', 'wse'])
    },
}
</script>

<style>

</style>