<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-striped table-bordered table_productos">
                    <thead>
                        <tr>
                            <th style="width: 15%;">
                                Código
                            </th>
                            <th style="width: 55%;">
                                Nombre
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Iglesia
                            </th>   
                            <th style="width: 10%;text-align: center;">
                                Oficina
                            </th>         
                            <th style="width: 10%;text-align:center;">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in inventario_productos" :key="index">
                            <td>
                                {{item.codigo}}
                            </td>
                            <td>
                                {{item.nombre}}
                            </td>
                            <td :class="[item.existencia_iglesia == 0 ? '_rojo' : item.existencia_iglesia == 1 ? '_anaranjado': item.existencia_iglesia == 2 ? '_amarillo': '']" style="text-align: center;">
                                {{item.existencia_iglesia}}
                            </td>
                            <td :class="[item.existencia_oficina == 0 ? '_rojo' : item.existencia_oficina == 1 ? '_anaranjado': item.existencia_oficina == 2 ? '_amarillo': '']" style="text-align: center;">
                                {{item.existencia_oficina}}
                            </td>
                            <td>
                                <div class="btns">
                                    <b-button type="button" size="sm" variant="primary" style="margin-right: 10px;" @click="abrirModal_1({id: item.codigo, nombre: item.nombre, iglesia: item.existencia_iglesia, oficina: item.existencia_oficina, descripcion: item.descripcion})"><i class="fas fa-info-circle"></i></b-button>
                                    <!-- <b-button type="button" size="sm" variant="success" style="margin-right: 10px;" @click="descargaInventario(item._id)" title="Descargar inventario"><i class="fas fa-arrow-circle-down"></i></b-button>
                                    <b-button type="button" size="sm" variant="danger" @click="cargarInventario({id: item.id_existencia,nombre: item.nombre})" title="Cargar inventario"><i class="fas fa-spinner"></i></b-button> -->
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <EntradaProductoModal v-if="modal_entrada_productos" :idp="id_producto" v-on:cerrarModal="cerrarModal_1" />
        <!-- <Less v-if="modal_less" v-on:clsModal="cerrarModal_less" /> -->

        <!-- <div class="btn_flotante_less" @click="abriModal_less">
            <i class="far fa-question-circle"></i>
        </div> -->

    </b-container>
</template>

<script>

import EntradaProductoModal from '@/components/Inventarios/EntradaProducto-modal.vue'
//import Less from './Less.vue'
import { mapState } from 'vuex'



export default {
    name: "Productos",
    components: {
        EntradaProductoModal,
        
    },
    computed: {
        ...mapState(['inventario_productos'])
    },
    data() {
        return {
            modal_entrada_productos: false,
            modal_less: false,
            id_producto: ''
        }
    },
    methods: {
        abrirModal_1(id){
            this.modal_entrada_productos = true
            this.id_producto = id
        },
        cerrarModal_1(){
            this.modal_entrada_productos = false
        },
        // abriModal_less(){
        //     this.modal_less = true
        // },
        // cerrarModal_less(){
        //     this.modal_less = false
        // }
    },
}
</script>

<style>
    .table_productos{
        font-size: 13px;
    }

    .btns{
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: center;
        
    }
        /* .btn_flotante_less{
            width: 45px;
            height: 45px;
            background-color: orangered;
            border-radius: 50%;
            position: fixed;
            bottom: 15px;
            right: 15px;
            transition: .4s ease;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }

            .btn_flotante_less:hover{
                background-color: blue;
            } */
</style>