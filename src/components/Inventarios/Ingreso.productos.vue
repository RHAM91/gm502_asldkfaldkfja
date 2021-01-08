<template>
    <b-container fluid>
        <form @submit.prevent="guardarDatos">
            <b-row>
                <b-col sm="12" md="10" class="mt-2">
                    <label>Código</label>
                    <b-form-input type="text" id="buscarcodigo" v-model="codigo" size="sm" @keydown.113="abrirModalB" @keydown.enter="busquedaporcodigo" required  placeholder="F2 para buscar"></b-form-input>
                </b-col>
                <b-col sm="12" md="2" style="margin-top:40px;">
                    <b-button type="button" size="sm" @click="busquedaporcodigo" block variant="success">Buscar</b-button>
                </b-col>
                <b-col v-if="producto != ''" sm="12" class="mt-3">
                    <!-- <div class="titulillo">
                        Producto seleccionado:
                    </div> -->
                    <div class="producto_muestra">
                        <h1>
                            {{producto.nombre}}
                        </h1>
                    </div>
                </b-col>
                <b-col v-if="producto != ''" sm="12" md="3" class="mt-3">
                    <label>Tipo de movimiento</label>
                    <select class="form-control form-control-sm" required v-model="movimiento">
                        <option value="">Selecciona</option>
                        <option value="ingreso">Ingreso</option>
                        <!-- <option value="salida">Salida</option> -->
                        <option value="devolucion">Devolución</option>
                    </select>
                </b-col>
                <b-col v-if="producto != ''" sm="12" md="3" class="mt-3">
                    <label>Unidad de medida</label>
                    <select class="form-control form-control-sm" required v-model="medida">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in inventario_medidas" :key="index" :value="item.medida">{{item.medida}}</option>
                    </select>
                </b-col>
                <b-col v-if="producto != ''" sm="12" md="3" class="mt-3">
                    <label>Fecha</label>
                    <b-form-input type="date" v-model="fecha" required size="sm"></b-form-input>
                </b-col>
                <b-col v-if="producto != ''" sm="12" md="3" class="mt-3">
                    <label>Bodega</label>
                    <select class="form-control form-control-sm" required v-model="entidad">
                        <option value="">Selecciona</option>
                        <option value="iglesia">Iglesia</option>
                        <option value="oficina">Oficina</option>
                    </select>
                </b-col>
                <b-col v-if="producto != ''" sm="12" md="10" class="mt-3">
                    <label>Número de documento</label>
                    <b-form-input type="text" v-model="nodocumento" required size="sm"></b-form-input>
                </b-col>
                <b-col v-if="producto != ''" sm="12" md="2" class="mt-3">
                    <label>Cantidad</label>
                    <b-form-input type="number" v-model="cantidad" required size="sm"></b-form-input>
                </b-col>

                <b-col v-if="producto != ''" sm="12" class="mt-3">
                    <label>Proveedor</label>
                    <select class="form-control form-control-sm" :disabled="movimiento != 'ingreso'" required v-model="proveedor">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in inventario_proveedores" :key="index" :value="item.proveedor">{{item.proveedor}}</option>
                    </select>
                </b-col>
                <!-- <b-col v-if="producto != ''" sm="12" md="6" class="mt-3">
                    <label>Destino</label>
                    <b-form-input type="text" v-model="destino" required size="sm"></b-form-input>
                </b-col> -->
                <b-col v-if="producto != ''" sm="12" class="mt-3">
                    <label>Observaciones</label>
                    <b-form-textarea
                        id="textarea"
                        placeholder="Escribe..."
                        rows="3"
                        max-rows="6"
                        v-model="observaciones"
                    ></b-form-textarea>
                </b-col>
                <b-col v-if="producto != ''" sm="12" class="mt-3 d-flex flex-row-reverse">
                    <b-button type="submit" size="sm" variant="success">Guardar</b-button>
                </b-col>
            </b-row>
        </form>

        <ModalBusqueda v-if="modal_b" v-on:cerrarmodal="cerrarModalB" v-on:IDP="pegarid"/>

    </b-container>
</template>

<script>


import ModalBusqueda from './Ingreso.modal.productos'

import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
    name: "Ingreso",
    components:{
        ModalBusqueda
    },
    computed: {
        ...mapState(['inventario_medidas', 'inventario_proveedores'])
    },
    data() {
        return {
            codigo: '',
            producto: '',
            modal_b: false, // debe estar en false
            medida: '',
            fecha: '',
            nodocumento: '',
            movimiento: '',
            cantidad: '',
            proveedor: '',
            destino: 'n/a',
            entidad: '',
            observaciones: ''
        }
    },
    methods: {
        async busquedaporcodigo(){

            if (this.codigo == '') {
                minix({icon: 'error', mensaje: 'Ingresa un código para realizar búsqueda', tiempo: 3000})
                document.getElementById('buscarcodigo').focus()
            }else{

                let articulo = await axios.get(`http://${IP}:${PUERTO}/api/productos/${this.codigo}`, this.$store.state.token)
                this.producto = articulo.data
                
            }

        },
        abrirModalB(){
            this.modal_b = true
        },
        cerrarModalB(){
            this.modal_b = false
            document.getElementById('buscarcodigo').focus()
        },
        pegarid(id){
            this.codigo = id
            document.getElementById('buscarcodigo').focus()
            this.busquedaporcodigo()
        },
        async guardarDatos(){
            let data = {
                codigo: this.codigo,
                movimiento: this.movimiento,
                medida: this.medida,
                fecha: this.fecha,
                entidad: this.entidad,
                nodocumento: this.nodocumento,
                cantidad: this.cantidad,
                proveedor: this.proveedor,
                destino: this.destino,
                observaciones: this.observaciones
            }

            let movimientos = await axios.post(`http://${IP}:${PUERTO}/api/movimientos`, data, this.$store.state.token)
            await this.wse(this.$store.state.rutas.inventario_productos)


            minix({icon: 'success', mensaje: movimientos.data.message, tiempo: 3000})

            this.codigo = ''
            this.movimiento = ''
            this.medida = ''
            this.entidad = ''
            this.cantidad = ''
            this.proveedor = ''
            this.observaciones = ''

            document.getElementById('buscarcodigo').focus()

        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('buscarcodigo').focus()
        this.fecha = moment(Date.now()).format('YYYY-MM-DD')
    },
}
</script>

<style>
    .titulillo{
        width: 100%;
        text-align: center;
    }

    .producto_muestra{
        
        text-align: center;
    }
</style>