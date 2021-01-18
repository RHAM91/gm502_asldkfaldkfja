<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" v-model="buscar" id="campo_busqueda_pago" size="sm" placeholder="Buscar (F2 para buscar por nombre)" @keydown.enter="ejectuar_busqueda" @keydown.113="abrir_modal_busqueda_alumno" autocomplete="off"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col sm="12" clas="mt-3" v-if="alumno_info != ''">
                <div class="ficha_alumno">
                    <h3>
                        {{alumno_info.nombre}}
                    </h3>
                    <table  style="width: 100%;">
                        <tr>
                            <td style="width: 5%;">
                                <i class="fas fa-guitar" title="Instrumento"></i>
                            </td>
                            <td style="width: 95%;">
                                {{alumno_info.curso}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 5%;">
                                <i class="fas fa-cross" title="Iglesia"></i>
                            </td>
                            <td style="width: 95%;">
                                {{alumno_info.iglesia}}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 5%;">
                                <i class="fas fa-user" title="Pastor"></i>
                            </td>
                            <td style="width: 95%;">
                                {{alumno_info.pastor}}
                            </td>
                        </tr>
                    </table>
                </div>
            </b-col>
            <b-col sm="12" md="6" class="mt-3" v-if="alumno_info != ''">
                <label>Monto a pagar</label>
                <b-form-input type="number" size="sm" v-model="monto" step="0.01" placeholder="Q"></b-form-input>
            </b-col>
            <b-col sm="12" md="6" class="mt-3" v-if="alumno_info != ''">
                <label>Mes</label>
                <select class="form-control form-control-sm" v-model="mes">
                    <option value="">Selecciona</option>
                    <option value="enero">Enero</option>
                    <option value="febrero">Febrero</option>
                    <option value="marzo">Marzo</option>
                    <option value="abril">Abril</option>
                    <option value="mayo">Mayo</option>
                    <option value="junio">Junio</option>
                    <option value="julio">Julio</option>
                    <option value="agosto">Agosto</option>
                    <option value="septiembre">Septiembre</option>
                    <option value="octube">Octubre</option>
                    <option value="noviembre">Noviembre</option>
                    <option value="diciembre">Diciembre</option>
                </select>
            </b-col>
            <b-col sm="12" md="6" class="mt-3" v-if="alumno_info != ''">
                <label>Fecha</label>
                <b-form-input type="date" size="sm" v-model="fecha"></b-form-input>
            </b-col>
            <b-col sm="12" md="6" class="mt-3" v-if="alumno_info != ''">
                <label>Tipo de pago</label>
                <select class="form-control form-control-sm" v-model="tipodepago">
                    <option value="">Selecciona</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="deposito">Depósito</option>
                    <option value="transferencia">Transferencia</option>
                </select>
            </b-col>
            <div class="contenedor_formulario" v-if="alumno_info != ''">
                <b-col sm="12" class="mt-3" v-if="tipodepago == 'deposito'">
                    <label>No. Depósito</label>
                    <b-form-input type="text" size="sm" placeholder="No." v-model="deposito"></b-form-input>
                </b-col>
                <b-col sm="12" class="mt-3" v-if="tipodepago == 'transferencia'">
                    <label>No. de transacción</label>
                    <b-form-input type="text" size="sm" placeholder="No." v-model="deposito"></b-form-input>
                </b-col>
            </div>
            <b-col sm="12" class="mt-3 d-flex flex-row-reverse" v-if="alumno_info != ''">
                <b-button type="button" size="sm" variant="success" @click="guardar">Guardar</b-button>
            </b-col>
        </b-row>

        <BuscarAlumno v-if="modal_buscar_alumnos" v-on:codigo_alumno="selecciona_alumno" v-on:cerrar_modal="cerrar_modal_busqueda_alumno" />


    </b-container>
</template>

<script>

import BuscarAlumno from './BuscarAlumno.vue'

import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import {minix} from '@/components/functions/alertas'

export default {
    name: 'Pagos',
    components:{
        BuscarAlumno
    },
    computed: {
        ...mapState(['alumnos'])
    },
    data() {
        return {
            buscar: '',
            monto: '',
            mes: '',
            tipodepago: '',
            deposito: '',
            modal_buscar_alumnos: false,
            fecha: moment(Date.now()).format('YYYY-MM-DD'),
            alumno_info: ''

        }
    },
    methods: {
        abrir_modal_busqueda_alumno(){
            this.modal_buscar_alumnos = true
        },
        cerrar_modal_busqueda_alumno(){
            this.modal_buscar_alumnos = false
        },
        ejectuar_busqueda(){
            let info = this.alumnos.filter(alumno => alumno.codigo == this.buscar) 
            this.alumno_info = info[0]

        },
        selecciona_alumno(codigo){
            this.buscar = codigo
            this.ejectuar_busqueda()
            document.getElementById('campo_busqueda_pago').focus()
        },
        async guardar(){

            if (this.monto == '' || this.mes == '' || this.fecha == '' || this.tipodepago == '') {
                minix({icon: 'error', mensaje: 'Uno o más campos están vacios', tiempo: 3000})
            }else{
                let info = {
                    api: 'pagos',
                    formulario:{
                        monto: this.monto,
                        alumno: this.alumno_info.nombre,
                        codigo_alumno: this.alumno_info.codigo,
                        mes: this.mes,
                        tipodepago: this.tipodepago,
                        deposito: this.deposito,
                        fecha: this.fecha
                    }
                }
    
                await this.insert_data(info)
                this.monto = ''
                this.mes = ''
                this.tipodepago = ''
            }

        },
        ...mapActions(['insert_data'])
    },
    mounted() {
        document.getElementById('campo_busqueda_pago').focus()
    },
}
</script>

<style>
    .ficha_alumno{
        width: 100%;
        height: auto;
        /* background-color: #e9ecef; */
        border-top: 1px solid #ced4da;
        border-bottom: 1px solid #ced4da;
        margin-top: 25px;
        padding: 10px;
    }
        .contenedor_formulario{
            width: 100%;
        }
</style>