<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="4" class="mt-3">
                <label>Tipo de pago</label>
                <select class="form-control form-control-sm" v-model="tipodepago" @change="tipopago">
                    <option value="">Selecciona</option>
                    <option value="cualquiera">Cualquiera</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="deposito">Depósito</option>
                    <option value="Inscripcion">Inscripción</option>
                    <option value="transaccion">Transacción</option>
                </select>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>Del</label>
                <b-form-input type="date" size="sm" v-model="del"></b-form-input>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>Al</label>
                <b-form-input type="date" size="sm" v-model="al"></b-form-input>
            </b-col>
            <b-col sm="12" md="5" class="mt-3">
                <label>Pastor</label>
                <v-select :options="pastores" label="nombre" :disabled="selects ? true: false" :reduce="nombre => nombre.nombre" v-model="pastor"></v-select>
            </b-col>
            <b-col sm="12" md="5" class="mt-3">
                <label>Iglesia</label>
                <v-select :options="iglesias_array" label="iglesia" :disabled="selects ? true: false" :reduce="iglesia => iglesia.iglesia" v-model="iglesia"></v-select>
            </b-col>
            <b-col sm="12" md="2" class="mt-5">
                <b-button type="button" size="sm" block :disabled="btn_consultar ? true : false"  variant="success" @click="getdatos">Consultar</b-button>
            </b-col>
            <b-col sm="12" class="mt-4">
                <h1>
                    Total Q{{total}}
                </h1>
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

        <Pacman v-on:resp="btn_change" />

    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from "moment";
import Pacman from '@/components/varios/_Loading.vue'

export default {
    name: 'Reportes',
    components:{
        Pacman
    },
    computed:{
        ...mapState(['pastores', 'iglesias', 'data_res'])
    },
    data() {
        return {
            tipodepago: '',
            pastor: '',
            iglesia: '',
            iglesias_array: [],
            datos_pagos: [],
            total: 0,
            selects: false,
            btn_consultar: false,
            del: moment(Date.now()).format('YYYY-MM-DD'),
            al: moment(Date.now()).format('YYYY-MM-DD')
        }
    },
    methods: {
        getIglesiaxPastor(){
            let filtro = this.iglesias.filter(iglesia => iglesia.pastor == this.pastor)
            this.iglesias_array = filtro
        },
        async getdatos(){

            let info = {
                api: 'pagos/reportes1',
                position: 0,
                formulario: {
                    pastor: this.pastor == null ? '' : this.pastor,
                    iglesia: this.iglesia == null ? '': this.iglesia,
                    tipodepago: this.tipodepago,
                    del: this.del,
                    al: this.al
                }
            }

            await this.response_data(info)

            this.datos_pagos = this.data_res[0]

            let contador = 0

            for (let i = 0; i < this.datos_pagos.length; i++) {
                const e = this.datos_pagos[i];

                contador += e.monto
            }

            this.total = contador

        },
        tipopago(){
            if (this.tipodepago == 'cualquiera') {
                this.selects = true
            }else{
                this.selects = false
            }
        },
        btn_change(d){
            this.btn_consultar = d
        },
        ...mapActions(['response_data'])
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