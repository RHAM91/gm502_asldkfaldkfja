<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner mods">
                <b-button type="button" variant="outline-info" size="sm" @click="cerrar">Cerrar</b-button>
            </div>
            <div class="cuadro_fondo">
                <b-container fluid>
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <label>Monto</label>
                            <b-form-input type="number" size="sm" step="0.01" v-model="monto"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Fecha de registro</label>
                            <b-form-input type="date" size="sm" v-model="fecha"></b-form-input>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Mes que pagado</label>
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
                                <option value="octubre">Octubre</option>
                                <option value="noviembre">Noviembre</option>
                                <option value="diciembre">Diciembre</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Ciclo</label>
                            <b-form-input type="number" size="sm" v-model="ciclo"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Tipo de pago</label>
                            <select class="form-control form-control-sm" v-model="tipodepago">
                                <option value="">Selecciona</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="deposito">Depósito</option>
                                <option value="transferencia">Transferencia</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>No. Documento</label>
                            <b-form-input type="text" size="sm" v-model="nodocumento"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="button" size="sm" variant="success" @click="editar">Actualizar</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>

        <Pacman/>

    </div>
</template>

<script>

import Pacman from '@/components/varios/_Loading.vue'
import { mapActions, mapState } from 'vuex'


export default {
    name: 'EditarPagos',
    props:['id_edicion', 'cod_alumno'],
    components:{
        Pacman
    },
    computed:{
        ...mapState(['data_res'])
    },
    data() {
        return {
            monto: '',
            fecha: '',
            mes: '',
            ciclo: '',
            tipodepago: '',
            nodocumento: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrar_edicion', false)
        },
        async getdatos(){
            let info = {
                api: 'pagos/registro',
                position: 0,
                formulario: {
                    id: this.id_edicion
                }
            }

            await this.response_data(info)
            this.monto = this.data_res[0].monto
            this.fecha = this.data_res[0].fecha
            this.tipodepago = this.data_res[0].tipodepago
            this.nodocumento = this.data_res[0].deposito
            this.mes = this.data_res[0].mes
            this.ciclo = this.data_res[0].ciclo
        },
        mes_cnv(mes){
            switch (mes) {
                case 'enero':
                    return 1
                    break;
                case 'febrero':
                    return 2
                    break;
                case 'marzo':
                    return 3
                    break;
                case 'abril':
                    return 4
                    break;
                case 'mayo':
                    return 5
                    break;
                case 'junio':
                    return 6
                    break;
                case 'julio':
                    return 7
                    break;
                case 'agosto':
                    return 8
                    break;
                case 'septiembre':
                    return 9
                    break;
                case 'octubre':
                    return 10
                    break;
                case 'noviembre':
                    return 11
                    break;
                case 'diciembre':
                    return 12
                    break;
                default:
                    break;
            }
        },
        async editar(){

            let info = {
                api: 'pagos',
                id: this.id_edicion,
                formulario: {
                    monto: this.monto,
                    fecha: this.fecha,
                    tipodepago: this.tipodepago,
                    deposito: this.nodocumento,
                    mes: this.mes,
                    ciclo: this.ciclo,
                    no_mes: this.mes_cnv(this.mes),
                    codigo_alumno: this.cod_alumno
                }
            }

            await this.updateData(info)
            await this.$emit('refresh', true)
        },
        ...mapActions(['response_data', 'updateData'])
    },
    mounted() {
        this.getdatos()
    },
}
</script>

<style scope>
    .mods{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: 8px;
    }
</style>