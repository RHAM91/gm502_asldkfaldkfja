<template>
    <div class="contenedor_pagos">
        <div class="banner_pagos">
            <b-button type="button" variant="outline-info" @click="cerrar" size="sm">Cerrar</b-button>
        </div>
        <b-container fluid>
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Pagos
                    </h3>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <div class="meses">
                        <div :class="['mes', enero ? 'pagado' : 'pendiente']">
                            Ene
                        </div>
                        <div :class="['mes', febrero ? 'pagado' : 'pendiente']">
                            Feb
                        </div>
                        <div :class="['mes', marzo ? 'pagado' : 'pendiente']">
                            Mar
                        </div>
                        <div :class="['mes', abril ? 'pagado' : 'pendiente']">
                            Abr
                        </div>
                        <div :class="['mes', mayo ? 'pagado' : 'pendiente']">
                            May
                        </div>  
                        <div :class="['mes', junio ? 'pagado' : 'pendiente']">
                            Jun
                        </div>
                        <div :class="['mes', julio ? 'pagado' : 'pendiente']">
                            Jul
                        </div>
                        <div :class="['mes', agosto ? 'pagado' : 'pendiente']">
                            Ago
                        </div>
                        <div :class="['mes', septiembre ? 'pagado' : 'pendiente']">
                            Sep
                        </div>
                        <div :class="['mes', octubre ? 'pagado' : 'pendiente']">
                            Oct
                        </div>
                        <div :class="['mes', noviembre ? 'pagado' : 'pendiente']">
                            Nov
                        </div>
                        <div :class="['mes', diciembre ? 'pagado' : 'pendiente']">
                            Dic
                        </div>
                    </div>
                </b-col>
                
                <b-col sm="12" md="10" class="mt-3">
                    <label>Año</label>
                    <select class="form-control form-control-sm" v-model="yy">
                        <option value="">Selecciona</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                    </select>
                </b-col>
                <b-col sm="12" md="2" class="mt-5">
                    <b-button type="button" size="sm" block variant="primary" @click="get_datos_por_year">Buscar</b-button>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-bordered table-striped" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 10%;">
                                    Pago
                                </th>
                                <th style="width: 10%;text-align:center;">
                                    Fecha de registro
                                </th>
                                <th style="width: 10%;text-align:center;">
                                    Mes
                                </th>
                                <th style="width: 15%;text-align:center;">
                                    Instrumento
                                </th>
                                <th style="width: 15%;text-align:center;">
                                    Tipo pago
                                </th>
                                <th style="width: 15%;text-align:center;">
                                    No. Documento
                                </th>
                                <th style="width: 15%;text-align:center;">
                                    Receptor
                                </th>
                                <th style="text-align: center;width: 10%;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in pagos" :key="index">
                                <td>
                                    Q{{item.monto}}
                                </td>
                                <td style="text-align:center;">
                                    {{item.fecha | formato}}
                                </td>
                                <td style="text-align: center;">
                                    {{item.mes}}
                                </td>
                                <td style="text-align: center;">
                                    {{item.curso}}
                                </td>
                                <td :style=" item.tipodepago == 'mora' ? 'text-align: center;background-color: red;color: white' : 'text-align: center;'">
                                    {{item.tipodepago}}
                                </td>
                                <td style="text-align:center;">
                                    {{item.deposito}}
                                </td>
                                <td style="text-align:center;">
                                    {{item.receptor}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" size="sm" variant="info" @click="editar(item._id)" style="margin-right: 5px;"><i class="fas fa-pen"></i></b-button>
                                    <b-button type="button" size="sm" variant="danger" @click="anular(item._id)"><i class="fas fa-minus-circle"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>

        </b-container>

        <EditarPagos v-if="modal_editar_pagos" :id_edicion="id_edicion" :cod_alumno="codigo_alumno" v-on:cerrar_edicion="cerrar_modal_edicion" v-on:refresh="get_meses_pagados" />

    </div>
</template>

<script>

import {IP, PUERTO} from '@/config/parametros'
import axios from 'axios'
import moment from 'moment'
import { mapActions } from 'vuex'
import { pregunta } from '@/components/functions/alertas'
import EditarPagos from '@/components/Registros/Pagos/EditarPagos.vue'


export default {
    name: 'Pagos',
    props:['codex', 'codigo_alumno'],
    filters:{
        formato: function(val){
            let newdate = moment(val).format('DD/MM/YYYY')
            return newdate
        }
    },
    components:{
        EditarPagos
    },
    data() {
        return {
            enero: false,
            febrero: false,
            marzo: false,
            abril: false,
            mayo: false,
            junio: false,
            julio: false,
            agosto: false,
            septiembre: false,
            octubre: false,
            noviembre: false,
            diciembre: false,
            modal_editar_pagos: false,
            id_edicion: '',
            yy: moment(Date.now()).format('YYYY'),
            pagos: []

        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrar_modal', false)
        },
        async get_meses_pagados(){

            this.reset_meses()

            let info = {
                codigo: this.codex,
                yy: this.yy
            }

            let meses = await axios.post(`http://${IP}:${PUERTO}/api/pagos/xmes`, info, this.$store.state.token)
            this.pagos = meses.data

            meses.data.forEach(e => {                

                if (e.mes == 'enero' && e.tipodepago != 'mora') {
                    this.enero = true
                }else if(e.mes == 'febrero' && e.tipodepago != 'mora'){
                    this.febrero = true
                }else if(e.mes == 'marzo' && e.tipodepago != 'mora'){
                    this.marzo = true
                }else if(e.mes == 'abril' && e.tipodepago != 'mora'){
                    this.abril = true
                }else if(e.mes == 'mayo' && e.tipodepago != 'mora'){
                    this.mayo = true
                }else if(e.mes == 'junio' && e.tipodepago != 'mora'){
                    this.junio = true
                }else if(e.mes == 'julio' && e.tipodepago != 'mora'){
                    this.julio = true
                }else if(e.mes == 'agosto' && e.tipodepago != 'mora'){
                    this.agosto = true
                }else if(e.mes == 'septiembre' && e.tipodepago != 'mora'){
                    this.septiembre = true
                }else if(e.mes == 'octubre' && e.tipodepago != 'mora'){
                    this.octubre = true
                }else if(e.mes == 'noviembre' && e.tipodepago != 'mora'){
                    this.noviembre = true
                }else if(e.mes == 'diciembre' && e.tipodepago != 'mora'){
                    this.diciembre = true
                }
            });
            
        },
        async get_datos_por_year(){

            let data = {
                codigo: this.codex,
                yy: this.yy
            }

            let info = await axios.post(`http://${IP}:${PUERTO}/api/pagos/xyy`, data, this.$store.state.token)

            this.pagos = info.data
            this.get_meses_pagados()
        },
        reset_meses(){
            this.enero = false
            this.febrero = false
            this.marzo = false
            this.abril = false
            this.mayo = false
            this.junio = false
            this.julio = false
            this.agosto = false
            this.septiembre = false
            this.octubre = false
            this.noviembre = false
            this.diciembre = false
        },
        async anular(id){

            pregunta({titulo: 'Seguro que deseas anularlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'pagos',
                        id,
                        formulario:{
                            estado: 'Anulado'
                        }
                    }

                    await this.updateData(data)
                    this.get_meses_pagados()
                }
            })
        },
        async editar(id){
            this.modal_editar_pagos = true
            this.id_edicion = id
        },
        cerrar_modal_edicion(){
            this.modal_editar_pagos = false
        },
        refresh_datos(){
            this.get_meses_pagados()
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.get_meses_pagados()
    },
}
</script>

<style>
    .contenedor_pagos{
        width: 100%;
        height: 100vh;
        background-color: white;
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
    }
        .banner_pagos{
            width: 100%;
            height: 45px;
            border-bottom: 1px solid #ebebeb;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            padding-right: 10px;
        }

        .meses{
            width: 100%;
            height: 100px;
            /* border-top: 1px solid black;
            border-left: 1px solid black;
            border-bottom: 1px solid black; */
            display: flex;
        }
            .mes{
                width: 8.33%;
                height: 100%;
                border-right: 1px solid white;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-weight: bold;
            }

            .pendiente{
                background-color: #ebebeb;
                color: #a1b0ab;
            }

            .pagado{
                background-color: #0d324d;
                color: white;
            }

            .nopagado{
                color: purple;
            }
</style>