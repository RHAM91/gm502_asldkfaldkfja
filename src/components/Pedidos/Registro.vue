<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="4" class="mt-3">
                <label>No. Pedido</label>
                <b-form-input type="text" id="no_pedido" v-model="nopedido" size="sm" placeholder="#"></b-form-input>
            </b-col>
            <b-col sm="12" md="8" class="mt-3">
                <label>Proveedor</label>
                <select class="form-control form-control-sm" v-model="proveedor">
                    <option value="">Selecciona</option>
                    <option v-for="(item, index) in inventario_proveedores" :key="index" :value="item.proveedor">{{item.proveedor}}</option>
                </select>
            </b-col>
            <b-col sm="12" md="8" class="mt-3">
                <label>Descripción</label>
                <b-form-input type="text" size="sm" v-model="descripcion"></b-form-input>
            </b-col>
            <b-col sm="12" md="4" class="mt-3">
                <label>Fecha</label>
                <b-form-input type="date" size="sm" v-model="fecha"></b-form-input>
            </b-col>
            <b-col sm="12" md="8" class="mt-3">
                <label>Artículo</label>
                <b-form-input type="text" id="articulo" size="sm" v-model="articulo"></b-form-input>
            </b-col>
            <b-col sm="12" md="2" class="mt-5">
                <b-button type="button" size="sm" title="Agregar elemento" block variant="primary" @click="agregarelemento"><i class="fas fa-plus"></i></b-button>
            </b-col>
            <b-col sm="12" md="2" class="mt-5">
                <b-button type="button" size="sm" title="Guardar" block variant="success" @click="guardarLista"><i class="fas fa-save"></i></b-button>
            </b-col>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 90%;">
                                Artículo
                            </th>
                            <th style="width: 10%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in productos" :key="index">
                            <td>
                                {{item.articulo}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="danger" @click="borrarelemento(index)"><i class="fas fa-minus"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
    name: "Registro",
    computed:{
        ...mapState(['inventario_proveedores'])
    },
    data() {
        return {
            productos: [],
            nopedido: '',
            proveedor: '',
            descripcion: '',
            fecha: moment(Date.now()).format('YYYY-MM-DD'),
            articulo: ''
        }
    },
    methods: {
        agregarelemento(){
            if (this.articulo == '') {
                alert('Escribe la descripción del articulo')
                document.getElementById('articulo').focus()
            }else{
                let data = {
                    articulo: this.articulo,
                    completo: false,
                    fecha: '0000-00-00'
                }
                this.productos.unshift(data)
                this.articulo = ''
                document.getElementById('articulo').focus()
            }
        },
        borrarelemento(id){
            this.productos.splice(id,1)
        },
        async guardarLista(){
            let data = {
                api: 'pedidos',
                formulario: {
                    nopedido: this.nopedido,
                    proveedor: this.proveedor,
                    descripcion: this.descripcion,
                    fecha: this.fecha,
                    completo: false,
                    articulo: JSON.stringify(this.productos)
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.inventario_pedidos)

            this.nopedido = ''
            this.proveedor = ''
            this.descripcion = ''
            this.articulo = ''
            this.productos = []

        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('no_pedido').focus()
    },
}
</script>

<style>

</style>