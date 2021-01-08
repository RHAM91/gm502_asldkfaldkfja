<template>
    <div class="seccion_ajustes">
        <div class="seccion_ajustes_titulo">
            <h4>
                Ubicaciones
            </h4>
            <b-button v-b-toggle.collapse-3 variant="outline-info" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_seccion = !btn_seccion">{{btn_seccion ? 'Expandir': 'Contraer'}}</b-button>
        </div>
        <p>
            Registro de país, iglesia y región
        </p>
        <b-collapse id="collapse-3" class="mt-2">
            <b-card style="background-color: #fafafa;">
                <table class="table table-bordered table-striped table-sm" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 90%;">
                                Módulo
                            </th>
                            <th style="width: 10%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Países
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Abrir" @click="abrir_modal_paises"><i class="fas fa-pen"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cuidades / Departamentos
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Abrir" @click="abrir_modal_ciudades"><i class="fas fa-pen"></i></b-button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Regiónes
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Abrir" @click="abrir_modal_regiones"><i class="fas fa-pen"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-card>
        </b-collapse>

        <Paises v-if="modal_paises" v-on:cerrar_modal="cerrar_modal_paises"/>
        <Ciudades v-if="modal_ciudades" v-on:cerrar_modal="cerrar_modal_ciudades" />
        <Regiones v-if="modal_regiones" v-on:cerrar_modal="cerrar_modal_regiones" />
    </div>
</template>

<script>

import Paises from './Paises/Registro.vue'
import Ciudades from './Ciudades/Registro.vue'
import Regiones from './Regiones/Registro.vue'

export default {
    name: 'SeccionUbicacion',
    components: {
        Paises,
        Ciudades,
        Regiones
    },
    data() {
        return {
            btn_seccion: true,
            modal_paises: false,
            modal_ciudades: false,
            modal_regiones: false
        }
    },
    methods: {
        abrir_modal_paises(){
            this.modal_paises = true
        },
        cerrar_modal_paises(){
            this.modal_paises = false
        },
        abrir_modal_ciudades(){
            this.modal_ciudades = true
        },
        cerrar_modal_ciudades(){
            this.modal_ciudades = false
        },
        abrir_modal_regiones(){
            this.modal_regiones = true
        },
        cerrar_modal_regiones(){
            this.modal_regiones = false
        }
    },
}
</script>

<style>

</style>