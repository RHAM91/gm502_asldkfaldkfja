<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">

                <div class="seccion_ajustes">
                    <div class="seccion_ajustes_titulo">
                        <h4>
                            Cursos
                        </h4>
                        <b-button v-b-toggle.collapse-1 variant="outline-info" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_cursos = !btn_cursos">{{btn_cursos ? 'Expandir': 'Contraer'}}</b-button>
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
                                        <th style="width: 80%;">
                                            Nombre
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
                                            <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar"><i class="fas fa-edit"></i></b-button>
                                            <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button type="button" size="sm" variant="warning"  title="Información"><i class="fas fa-info-circle"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-card>
                    </b-collapse>
                </div>
                
                <div class="seccion_ajustes">
                    <div class="seccion_ajustes_titulo">
                        <h4>
                            Docentes
                        </h4>
                        <b-button v-b-toggle.collapse-2 variant="outline-info" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_docentes = !btn_docentes">{{btn_docentes ? 'Expandir': 'Contraer'}}</b-button>
                    </div>
                    <p>
                        Registro de docentes
                    </p>
                    <b-collapse id="collapse-2" class="mt-2">
                        <b-card style="background-color: #fafafa;">
                            <div class="btn_agregar">
                                <b-button type="button" variant="success" size="sm">Nuevo registro</b-button>
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
                                    <tr>
                                        <td>
                                            Registro 1
                                        </td>
                                        <td style="text-align: center;">
                                            <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar"><i class="fas fa-edit"></i></b-button>
                                            <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button type="button" size="sm" variant="warning"  title="Información"><i class="fas fa-info-circle"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-card>
                    </b-collapse>
                </div>

                <div class="seccion_ajustes">
                    <div class="seccion_ajustes_titulo">
                        <h4>
                            Ubicaciones
                        </h4>
                        <b-button v-b-toggle.collapse-3 variant="outline-info" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_ubicaciones = !btn_ubicaciones">{{btn_ubicaciones ? 'Expandir': 'Contraer'}}</b-button>
                    </div>
                    <p>
                        Registro de país, iglesia y región
                    </p>
                    <b-collapse id="collapse-3" class="mt-2">
                        <b-card style="background-color: #fafafa;">
                            <div class="btn_agregar">
                                <b-button type="button" variant="success" size="sm">Nuevo registro</b-button>
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
                                    <tr>
                                        <td>
                                            Registro 1
                                        </td>
                                        <td style="text-align: center;">
                                            <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar"><i class="fas fa-edit"></i></b-button>
                                            <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button type="button" size="sm" variant="warning"  title="Información"><i class="fas fa-info-circle"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-card>
                    </b-collapse>
                </div>

                <div class="seccion_ajustes">
                    <div class="seccion_ajustes_titulo">
                        <h4>
                            Pastores
                        </h4>
                        <b-button v-b-toggle.collapse-4 variant="outline-info" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_pastores = !btn_pastores">{{btn_pastores ? 'Expandir': 'Contraer'}}</b-button>
                    </div>
                    <p>
                        Registro de país, iglesia y región
                    </p>
                    <b-collapse id="collapse-4" class="mt-2">
                        <b-card style="background-color: #fafafa;">
                            <div class="btn_agregar">
                                <b-button type="button" variant="success" size="sm">Nuevo registro</b-button>
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
                                    <tr>
                                        <td>
                                            Registro 1
                                        </td>
                                        <td style="text-align: center;">
                                            <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar"><i class="fas fa-edit"></i></b-button>
                                            <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar"><i class="far fa-trash-alt"></i></b-button>
                                            <b-button type="button" size="sm" variant="warning"  title="Información"><i class="fas fa-info-circle"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-card>
                    </b-collapse>
                </div>

            </b-col>
        </b-row>

        <RegistroCurso v-if="modal_cursos" v-on:cerrar_modal_cursos="cerrar_modal_cursos"/>

    </b-container>
</template>

<script>
import { mapState } from 'vuex'
import RegistroCurso from './Cursos/Regristro_curso.vue'



export default {
    name: "Ajustes",
    components: { 
        RegistroCurso
    },
    computed:{
        ...mapState(['cursos'])
    },
    data() {
        return {
            btn_docentes: true,
            btn_cursos: true,
            btn_ubicaciones: true,
            btn_pastores: true,
            modal_cursos: false
        }
    },
    methods: {
        abrir_modal_cursos(){
            this.modal_cursos = true
        },
        cerrar_modal_cursos(){
            this.modal_cursos = false
        }
    },
}
</script>

<style>
    .seccion_ajustes{
        width: 100%;
        height: auto;
        border-top: 1px solid rgba(0,0,0,.125);
        padding-top: 10px;
        padding-bottom: 10px;
        color: #303030;
    }
        .seccion_ajustes_titulo{
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
        }

            .btn_agregar{
                width: 100%;
                margin-bottom: 10px;
            }
</style>