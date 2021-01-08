<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="10" class="mt-3">
                <label>Buscar pedido</label>
                <b-form-input type="text" id="campo_busqueda_pedido" size="sm"></b-form-input>
            </b-col>
            <b-col sm="12" md="2" class="mt-5">
                <b-button type="button" size="sm" block variant="primary">Buscar</b-button>
            </b-col>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 15%;">
                                Proveedor
                            </th>
                            <th style="width: 20%;">
                                No. pedido
                            </th>
                            <th style="width: 40%;">
                                Descripción
                            </th>
                            <th style="width: 15%;">
                                Fecha
                            </th>
                            <th style="width: 10%;text-align:center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in inventario_pedidos" :key="index">
                            <td>
                                {{item.proveedor}}
                            </td>
                            <td>
                                {{item.nopedido}}
                            </td>
                            <td>
                                {{item.descripcion}}
                            </td>
                            <td>
                                {{item.fecha}}
                            </td>
                            <td style="text-align:center;">
                                <b-button type="button" size="sm" variant="warning" @click="detalle(item._id)"><i class="fas fa-info-circle"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>


        <Detalle v-if="modal_detalle" :idpedido="idp" v-on:cerrarModal="cerrarModal" />
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
import Detalle from './ModalDetallePeidido.vue'


export default {
    name: 'Pendientes',
    components:{
        Detalle
    },
    computed: {
        ...mapState(['inventario_pedidos'])
    },
    data() {
        return {
            modal_detalle: false,
            idp: ''
        }
    },
    methods: {
        detalle(id){
            this.idp = id
            this.modal_detalle = true
        },
        cerrarModal(){
            this.modal_detalle = false
        },
    },
    mounted() {
        document.getElementById('campo_busqueda_pedido').focus()
    },
}
</script>

<style>

</style>