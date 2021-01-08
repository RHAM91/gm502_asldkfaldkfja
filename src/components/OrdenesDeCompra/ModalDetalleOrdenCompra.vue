<template>
    <div class="contenedor_etrada_producto">
        <div class="formulario_entrada_producto2">
            <div class="cabecera_formulario_entrada_producto">

            </div>
            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            Detalle orden # {{idproducto}}
                        </h2>
                    </b-col>
                    <b-col sm="12" class="mt-1">
                        <p>
                            {{justificacion}}
                        </p>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-bordered table-striped" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <th>
                                        Código
                                    </th>
                                    <th>
                                        Nombre
                                    </th>
                                    <th style="text-align: center;">
                                        Proveedor
                                    </th>
                                    <th style="text-align: center;">
                                        Para
                                    </th>
                                    <th style="text-align: center;">
                                        Cantidad
                                    </th>
                                    <th style="text-align: center;">
                                        Precio
                                    </th>
                                    <th style="text-align: center;">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in detalleOrden" :key="index">
                                    <td>
                                        {{item.codigo}}
                                    </td>
                                    <td>
                                        {{item.nombre}}
                                    </td>
                                    <td style="text-align: center;">
                                        {{item.proveedor}}
                                    </td>
                                    <td style="text-align: center;">
                                        {{item.bodega}}
                                    </td>
                                    <td style="text-align: center;">    
                                        {{item.cantx}}
                                    </td>
                                     <td style="text-align: center;">    
                                        Q{{item.precio}}
                                    </td>
                                     <td style="text-align: center;">    
                                        Q{{item.subtotal}}
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td style="text-align: center;background-color: black;color: white;">Total</td>
                                    <td style="text-align: center;">
                                        Q{{total}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>

import {IP, PUERTO} from '@/config/parametros'
import axios from 'axios'

export default {
    name: 'DetalleOrden',
    props:['idproducto'],
    data() {
        return {
            detalleOrden: [],
            justificacion: '',
            total: 0
        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    methods: {
        cerrar(){
            this.$emit('cerrarModalDet', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        async getdetalle(){
            let datos = await axios.get(`http://${IP}:${PUERTO}/api/ordenes/${this.idproducto}`, this.$store.state.token)
            this.detalleOrden = JSON.parse(datos.data.detalle)
            this.justificacion = datos.data.comentarios

            let contador = 0

            this.detalleOrden.forEach(e => {
                contador += e.subtotal
            });

            this.total = contador
        }
    },
    mounted() {
        this.getdetalle()
    },
}
</script>

<style>
    .formulario_entrada_producto2{
        width: 750px;
        height: 600px;
        background-color: white;
    }
</style>