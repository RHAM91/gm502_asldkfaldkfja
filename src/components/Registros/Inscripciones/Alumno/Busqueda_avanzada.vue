<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="4" class="mt-3">
                <label>Pastor</label>
                <select class="form-control form-control-sm" v-model="pastor">
                    <option value="">Selecciona</option>
                    <option value=""></option>
                </select>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>Iglesia</label>
                <select class="form-control form-control-sm" v-model="iglesia">
                    <option value="">Selecciona</option>
                    <option value=""></option>
                </select>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>País</label>
                <select class="form-control form-control-sm" v-model="pais">
                    <option value="">Selecciona</option>
                    <option value=""></option>
                </select>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>Región</label>
                <select class="form-control form-control-sm" v-model="region">
                    <option value="">Selecciona</option>
                    <option value=""></option>
                </select>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>Docente</label>
                <select class="form-control form-control-sm" v-model="docente">
                    <option value="">Selecciona</option>
                    <option value=""></option>
                </select>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>Instrumento</label>
                <select class="form-control form-control-sm" v-model="instrumento">
                    <option value="">Selecciona</option>
                    <option value=""></option>
                </select>
            </b-col>
            <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                <b-button type="button" variant="success" size="sm">Buscar</b-button>
            </b-col>
            <b-col sm="12" class="mt-4">
                <table class="table table-sm table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'

export default {
    name: 'Busqueda_avanzada',
    data() {
        return {
            pastor: '',
            iglesia: '',
            pais: '',
            region: '',
            docente: '',
            instrumento: '',
        }
    },
}
</script>

<style>

</style>