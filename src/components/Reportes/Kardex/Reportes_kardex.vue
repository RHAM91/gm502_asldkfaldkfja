<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="12" class="mt-3">
                <label>Producto</label>
                <b-form-input type="text" id="codigo_producto_movimientos" size="sm" v-model="codigo" @keydown.113="abrirModalBusqueda" placeholder="Código (F2 para buscar)"></b-form-input>
            </b-col>
            <b-col sm="12" md="3" class="mt-2">
                <label>Del</label>
                <b-form-input type="date" size="sm" v-model="finicial"></b-form-input>
            </b-col>
            <b-col sm="12" md="3" class="mt-2">
                <label>Al</label>
                <b-form-input type="date" size="sm" v-model="ffinal"></b-form-input>
            </b-col>
            <b-col sm="12" md="3" class="mt-2">
                <label>Bodega</label>
                <select class="form-control form-control-sm" v-model="bodega">
                    <option value="">Selecciona</option>
                    <option value="iglesia">Iglesia</option>
                    <option value="oficina">Oficina</option>
                </select>
            </b-col>
            <b-col sm="12" md="3" style="margin-top:40px;">
                <b-button type="button" size="sm" block variant="success" @click="consulta">Consultar</b-button>
            </b-col>
            <b-col sm="12" class="mt-3">
                <table class="table table-striped table-sm" style="font-size: 14px;">
                    <thead>
                        <tr>
                            <th>
                                Articulo
                            </th>
                            <!-- <th>
                                Medida
                            </th> -->
                            <th>
                                Fecha
                            </th>
                            <th>
                                Movimiento
                            </th>
                            <th>
                                Doc.
                            </th>
                            <th>
                                Cantidad
                            </th>
                            <th>
                                Saldo
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in resultados" :key="index">
                            <td>
                                {{item.nombre}}
                            </td>
                            <!-- <td>
                                
                            </td> -->
                            <td>
                                {{item.fecha}}
                            </td>
                            <td>
                                {{item.movimiento}}
                            </td>
                            <td>
                                {{item.nodocumento}}
                            </td>
                            <td>
                                {{item.cantidad}}
                            </td>
                            <td>
                                {{item.saldo_iglesia}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>


        <!-- <Flotante /> -->

        <ModalBusqueda v-if="modalbusqueda" v-on:cerrarmodal="closemodal" v-on:IDP="setIDP"/>


    </b-container>

</template>

<script>

import axios from 'axios'
import moment from 'moment'
import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import Flotante from '../../varios/Btn_flotante'
import ModalBusqueda from '../../Inventarios/Ingreso.modal.productos.vue'

export default {
    name: "Kardex",
    components:{
        Flotante,
        ModalBusqueda
    },
    data() {
        return {
            codigo: "",
            resultados: [],
            bodega: "",
            finicial: "",
            ffinal: "",
            modalbusqueda: false
        }
    },
    methods: {
        async consulta(){

            if (this.codigo == "" || this.bodega == "" || this.finicial == '' || this.ffinal == '') {
                 minix({icon: 'error', mensaje: 'Uno o más campos están vacios', tiempo: 3000})
            }else{
                let info = {
                    codigo: this.codigo,
                    bodega: this.bodega,
                    finicial: this.finicial,
                    ffinal: this.ffinal
                }


                let res = await axios.post(`http://${IP}:${PUERTO}/api/movimientos/k`, info, this.$store.state.token)
                this.resultados = res.data
            }

        },
        abrirModalBusqueda(){
            this.modalbusqueda = true
        },
        closemodal(){
            this.modalbusqueda = false
        },
        setIDP(id){
            this.codigo = id
            this.modalbusqueda = false
            document.getElementById('codigo_producto_movimientos').focus()
        }
    },
    mounted() {
        document.getElementById('codigo_producto_movimientos').focus()
    },
}
</script>

<style>

</style>