<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-bordered table-hover" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <td style="width: 20%;">
                                No. Orden
                            </td>
                            <td style="width: 45%;">
                                Razón
                            </td>
                            <td style="width: 10%;text-align: center;">
                                Estado
                            </td>
                            <td style="width: 10%;text-align: center;">
                                Fecha
                            </td>
                            <td style="width: 15%;text-align: center;">
                                ...
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in inventario_ordenes" :key="index">
                            <td>
                                {{item._id}}
                            </td>
                            <td>
                                {{item.comentarios}}
                            </td>
                            <td style="text-align: center;">
                                {{item.aprobada}}
                            </td>
                            <td style="text-align: center;">
                                {{item.fecha}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" variant="primary" size="sm" style="margin-right: 5px;" @click="abrirModaldetalle(item._id)"><i class="fas fa-info-circle"></i></b-button>
                                <b-button type="button" variant="danger" size="sm" @click="borrarOrden(item._id)"><i class="fas fa-trash"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <DetalleOrden v-if="modal_detalle_compra" v-on:cerrarModalDet="closeModalDetalle" :idproducto="id" />

    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import {pregunta} from '@/components/functions/alertas'
import DetalleOrden from './ModalDetalleOrdenCompra.vue'

export default {
    name: 'Ordenes',
    components:{
        DetalleOrden
    },
    filters:{
        aprobado: function(val){
            if(val == ''){
                return 'Aprobado'
            }else{
                return 'Pendiente'
            }
        }
    },
    computed:{
        ...mapState(['inventario_ordenes'])
    },
    data() {
        return {
            modal_detalle_compra: false,
            id: ''
        }
    },
    methods: {
        abrirModaldetalle(idp){
            this.modal_detalle_compra = true
            this.id = idp
        },
        closeModalDetalle(){
            this.modal_detalle_compra = false
        },
        async borrarOrden(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'ordenes',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.inventario_ordenes)
                }
            })
        },
        ...mapActions(['deleteData', 'wse'])
    },
}
</script>

<style>

</style>