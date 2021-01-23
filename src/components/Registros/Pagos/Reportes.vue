<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="6" class="mt-3">
                <label>Pastor</label>
                <v-select :options="pastores" label="nombre" :reduce="nombre => nombre.nombre" v-model="pastor"></v-select>
            </b-col>
            <b-col sm="12" md="6" class="mt-3">
                <label>Iglesia</label>
                <v-select :options="iglesias_array" label="iglesia" :reduce="iglesia => iglesia.iglesia" v-model="iglesia"></v-select>
            </b-col>
            <b-col sm="12" md="3" class="mt-3">
                <label>Tipo de pago</label>
                <select class="form-control form-control-sm" v-model="tipodepago">
                    <option value="">Selecciona</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transaccion">Transacción</option>
                    <option value="deposito">Depósito</option>
                </select>
            </b-col>
            <b-col sm="12" md="3" class="mt-3">
                <label>Del</label>
                <b-form-input type="date" size="sm" v-model="del"></b-form-input>
            </b-col>
            <b-col sm="12" md="3" class="mt-3">
                <label>Al</label>
                <b-form-input type="date" size="sm" v-model="al"></b-form-input>
            </b-col>
            <b-col sm="12" md="3" class="mt-5">
                <b-button type="button" size="sm" block variant="success" @click="getdatos">Consultar</b-button>
            </b-col>
            <b-col sm="12" class="mt-4">
                <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 14.28%">
                                Código
                            </th>
                            <th style="width: 14.28%">
                                Nombre
                            </th>
                            <th style="width: 14.28%">
                                Pastor
                            </th>
                            <th style="width: 14.28%">
                                Iglesia
                            </th>
                            <th style="width: 14.28%; text-align: center;">
                                Fecha pago
                            </th>
                            <th style="width: 14.28%; text-align: center;">
                                Tipo Pago
                            </th>
                            <th style="width: 14.28%;text-align: center;">
                                Monto
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in datos_pagos" :key="index">
                            <td>
                                {{item.codigo_alumno}}
                            </td>
                            <td>
                                {{item.alumno}}
                            </td>
                            <td>
                               {{item.pastor}}
                            </td>
                            <td>
                               {{item.iglesia}}
                            </td>
                            <td style="text-align: center;">
                               {{item.fecha}}
                            </td>
                            <td style="text-align: center;">
                                {{item.tipodepago}}
                            </td>
                            <td style="text-align: center;">
                                Q{{item.monto}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <Pacman :accion="loading"/>

    </b-container>
</template>

<script>
import { mapState } from 'vuex'
import { IP, PUERTO} from '@/config/parametros'
import axios from 'axios'
import moment from "moment";
import Pacman from '@/components/varios/_Loading.vue'

export default {
    name: 'Reportes',
    components:{
        Pacman
    },
    computed:{
        ...mapState(['pastores', 'iglesias'])
    },
    data() {
        return {
            tipodepago: '',
            pastor: '',
            iglesia: '',
            iglesias_array: [],
            datos_pagos: [],
            del: moment(Date.now()).format('YYYY-MM-DD'),
            al: moment(Date.now()).format('YYYY-MM-DD'),
            loading: false
        }
    },
    methods: {
        getIglesiaxPastor(){
            let filtro = this.iglesias.filter(iglesia => iglesia.pastor == this.pastor)
            this.iglesias_array = filtro
        },
        async getdatos(){
            
            let info = {
                pastor: this.pastor,
                iglesia: this.iglesia,
                tipodepago: this.tipodepago,
                del: this.del,
                al: this.al
            }

            this.loading = true
            let d = await axios.post(`http://${IP}:${PUERTO}/api/pagos/reportes1/`, info, this.$store.state.token)
            if (d.status == 200) {
                this.loading = false
            }
            this.datos_pagos = d.data

        },
    },
    watch:{
        pastor: function(val){
            if (val != '') {
                this.getIglesiaxPastor()
            }
        }
    }
}
</script>

<style>

</style>