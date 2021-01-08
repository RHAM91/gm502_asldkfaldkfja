<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-bordered table-hover" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 10%;">
                                Código
                            </th>
                            <th style="width: 25%;">
                                Nombre
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Para
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Cantidad
                            </th>
                            <th style="width: 15%;text-align: center;">
                                Proveedor
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Precio
                            </th>
                            <th style="width: 10%;text-align: center;">
                                Subtotal
                            </th>
                            <th style="width: 10%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in carrito" :key="index">
                            <td>
                                {{item.codigo}}
                            </td>
                            <td>
                                {{item.nombre}}
                            </td>
                            <td style="text-align:center;">
                                {{item.bodega}}
                            </td>
                            <td style="text-align: center;">
                                {{item.cantx}}
                            </td>
                            <td style="text-align:center;">
                                <select :id="[`select_proveedor_${index}`]" class="form-control form-control-sm" @change="selectProveedor(index)">
                                    <option value="">Selecciona</option>
                                    <option v-for="(item, index) in inventario_proveedores" :key="index" :value="item.proveedor">{{item.proveedor}}</option>
                                </select>
                            </td>
                            <td style="text-align:center;">
                                <b-form-input :id="`precio_elemento_${index}`" type="number" step="0.01" size="sm" placeholder="Q" @keyup="setPrecio(index)"></b-form-input>
                            </td>
                            <td style="text-align:center;">
                                Q{{item.subtotal}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="success" style="margin-right: 5px;" @click="sumar(index)"><i class="fas fa-plus"></i></b-button>
                                <b-button type="button" size="sm" variant="danger"><i class="fas fa-minus" @click="restar(index)"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <Less v-if="modal_less" v-on:clsModal="cerrarModal_less" />
        <OrdenCompra v-if="modal_ordencompra" v-on:ocmodal="cerrarModal_oc" />

        <div v-if="carrito.length != 0" class="btn_flotante_enviar" @click="abriModal_enviar">
            <i class="fas fa-paper-plane"></i>
        </div>

         <div class="btn_flotante_less" @click="abriModal_less">
            <i class="fas fa-cart-plus"></i>
        </div>
    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Less from '@/components/Inventarios/Less.vue'
import OrdenCompra from './EnviarOrdenCompra.vue'

export default {
    name: "Carrito",
    components:{
        Less,
        OrdenCompra
    },
    computed:{
        ...mapState(['carrito', 'inventario_proveedores'])
    },
    data() {
        return {
            modal_less: false,
            modal_ordencompra: false,
            proveedor_temp: ''
        }
    },
    methods: {
        abriModal_less(){
            this.modal_less = true
        },
        abriModal_enviar(){
            this.modal_ordencompra = true
        },
        cerrarModal_less(){
            this.modal_less = false
        },
        cerrarModal_oc(){
            this.modal_ordencompra = false
        },
        sumar(index){
            this.sumarCompra(index)
        },
        restar(index){
            this.restarCompra(index)
        },
        mostrarProveedores(){
            for (let i = 0; i < this.carrito.length; i++) {
                const e = this.carrito[i];
                
                document.getElementById(`select_proveedor_${i}`).value = e.proveedor
                document.getElementById(`precio_elemento_${i}`).value = e.precio
                
            }
        },
        selectProveedor(index){
            let id_elemento = `select_proveedor_${index}`
            let row = document.getElementById(id_elemento).value
            let info = {
                index,
                proveedor: row
            }

            this.setProveedorLista(info)
        },
        setPrecio(index){
            let precio_elemento = document.getElementById(`precio_elemento_${index}`).value

            let info = {
                index,
                precio: precio_elemento == '' ? 0: parseFloat(precio_elemento)
            }

            this.setPrecioLista(info)
        },
        ...mapActions(['sumarCompra','restarCompra', 'setProveedorLista', 'setPrecioLista'])
    },
    mounted() {
        this.mostrarProveedores()
    },
}
</script>

<style>
    .btn_flotante_less{
        width: 40px;
        height: 40px;
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
            transform: scale(1.25);
        }

    .btn_flotante_enviar{
        width: 40px;
        height: 40px;
        background-color: #5b85aa;
        border-radius: 50%;
        position: fixed;
        bottom: 70px;
        right: 15px;
        transition: .4s ease;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
        .btn_flotante_enviar:hover{
            transform: scale(1.25);
        }
</style>