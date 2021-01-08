<template>
    <b-container fluid>
        <b-row>
             <b-col sm="12">
                <label>Quién solicita?</label>
                <b-form-input type="text" id="incodigo" v-model="persona" required size="sm"></b-form-input>
            </b-col>
            <b-col sm="12" md="6" class="mt-3">
                <label>Destino</label>
                <b-form-input type="text" v-model="destino" required size="sm" placeholder="Destino"></b-form-input>
            </b-col>
            <b-col sm="12" md="3" class="mt-3">
                <label>Cantidad</label>
                <b-form-input type="number" id="cantidad_" v-model="cantidad" required size="sm"></b-form-input>
            </b-col>
            <b-col sm="12" md="3" class="mt-3">
                <label>Bodega</label>
                <select class="form-control form-control-sm" required v-model="entidad">
                    <option value="">Selecciona</option>
                    <option value="iglesia">Iglesia</option>
                    <option value="oficina">Oficina</option>
                </select>
            </b-col>
            <b-col sm="12" md="10" class="mt-4">
                <label>Código</label>
                <b-form-input type="text" id="xcodigo" v-model="codigo" required size="sm" autocomplete="off" @keydown.113="abrirModalBusqueda" @keydown.enter="getCode" placeholder="F2 para buscar"></b-form-input>
            </b-col>
            <b-col sm="12" md="2" style="margin-top: 55px;">
                <b-button type="button" size="sm" block variant="success" @click="obtenerProucto">Agregar</b-button>
            </b-col>

            <b-col sm="12" class="mt-5">
                <table class="table table-sm table-striped table-bordered table-hover table_">
                    <thead>
                        <tr>
                            <th style="width: 15%;">
                                Código
                            </th>
                            <th style="width: 55%;">
                                Nombre
                            </th>
                            <th style="width: 10%;">
                                Cantidad
                            </th>
                            <th style="width: 10%;">
                                Entidad
                            </th>
                            <th style="width: 10%;">
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
                            <td>
                                {{item.cantidad}}
                            </td>
                            <td>
                                {{item.entidad}}
                            </td>
                            <td class="d-flex align-content-center">
                                <b-button type="button" size="sm" variant="danger" @click="borrarElemento(index)" ><i class="fas fa-trash"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>

            <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                <b-button type="button" size="sm" variant="primary" @click="guardarDatos">Generar salida</b-button>
            </b-col>
        </b-row>

        <buscarProducto v-if="modalB" v-on:cerrarmodal="cerrarModalB" v-on:IDP="pegarid" />


    </b-container>
</template>

<script>

import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'
import moment from 'moment'
import { minix } from '@/components/functions/alertas'
import buscarProducto from './Ingreso.modal.productos'
import { mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
// window.ipcRenderer = ipcRenderer


export default {
    name: "Salida",
    components:{
        buscarProducto
    },
    data() {
        return {
            modalB: false,

            carrito: [],
            existencias: '',
            codigo: '',
            cantidad: '',
            entidad: '',
            movimento: '',
            fecha: moment(Date.now()).format('YYYY-MM-DD'),
            persona: '',
            destino: ''
        }
    },
    methods: {
        getCode(){
            let code_completo = this.codigo.split('*')
           
            if (code_completo.length == 1) {
                this.codigo = code_completo[0]
                this.cantidad = 1

                this.obtenerProucto()

            }else{
                let cant = code_completo[0]
                let codProducto = code_completo[1]

                this.codigo = codProducto
                this.cantidad = cant

                this.obtenerProucto()
            }
            
        },
        async obtenerProucto(){

            if (this.codigo == '' || this.cantidad == '' || this.entidad == '') {
                minix({icon: 'error', mensaje: 'Uno o mas campos están vacios', tiempo: 3000})
            }else{

                let articulo = await axios.get(`http://${IP}:${PUERTO}/api/productos/${this.codigo}`, this.$store.state.token)

                if (articulo.data.message == "NOT FOUND") {
                    minix({icon: 'error', mensaje: 'Este código no existe :/', tiempo: 3000})
                    document.getElementById('xcodigo').focus()
                }else{

                    if (this.entidad == 'iglesia') {

                        if (parseInt(this.cantidad) > parseInt(articulo.data.existencia_iglesia)) {

                            minix({icon: 'info', mensaje: `Disponible: ${articulo.data.existencia_iglesia}`, tiempo: 5000})
                            document.getElementById('cantidad_').focus()

                        }else{

                            let acomulado = 0

                            this.carrito.forEach(e => {
                                if (this.codigo == e.codigo) {
                                    acomulado += parseInt(e.cantidad)
                                }
                            });


                            if (parseInt(acomulado) + parseInt(this.cantidad) > parseInt(articulo.data.existencia_iglesia)) {

                                minix({icon: 'info', mensaje: `Disponible: ${articulo.data.existencia_iglesia}`, tiempo: 6000})

                                this.codigo = ''
                                document.getElementById('xcodigo').focus()
                                
                            }else{

                                let datos = {
                                    codigo: articulo.data.codigo,
                                    nombre: articulo.data.nombre,
                                    cantidad: this.cantidad,
                                    entidad: this.entidad,
                                    fecha: this.fecha,
                                    destino: this.destino
                                }
                    
                                this.carrito.unshift(datos)
                                this.codigo = ''
                                this.cantidad = ''
                                //this.entidad = ''
                                
                    
                                document.getElementById('xcodigo').focus()
                            }

                        }
                    }else if(this.entidad == 'oficina'){


                        if (parseInt(this.cantidad) > parseInt(articulo.data.existencia_oficina)) {

                            minix({icon: 'info', mensaje: `Disponible: ${articulo.data.existencia_oficina}`, tiempo: 6000})
                            document.getElementById('cantidad_').focus()

                        }else{

                            let acomulado = 0

                            this.carrito.forEach(e => {
                                if (this.codigo == e.codigo) {
                                    acomulado += parseInt(e.cantidad)
                                }
                            });


                            if (parseInt(acomulado) + parseInt(this.cantidad) > parseInt(articulo.data.existencia_oficina)) {

                                minix({icon: 'info', mensaje: `Disponible: ${articulo.data.existencia_oficina}`, tiempo: 6000})

                                this.codigo = ''
                                document.getElementById('xcodigo').focus()
                                
                            }else{

                                let datos = {
                                    codigo: articulo.data.codigo,
                                    nombre: articulo.data.nombre,
                                    cantidad: this.cantidad,
                                    entidad: this.entidad,
                                    fecha: this.fecha,
                                    destino: this.destino
                                }
                    
                                this.carrito.unshift(datos)
                                this.codigo = ''
                                this.cantidad = ''
                                //this.entidad = ''
                                
                    
                                document.getElementById('xcodigo').focus()
                            }


                            
                        }
                    }
                }   
            }

        },
        async guardarDatos(){

            if (this.solicitante == '' || this.destino == '') {
                minix({icon: 'error', mensaje: 'Uno o mas campos están vacios', tiempo: 3000})
                document.getElementById('incodigo').focus()
            }else{
                if (this.carrito.length == 0) {
                    minix({icon: 'error', mensaje: 'Agrega al menos 1 producto a la lista', tiempo: 4000})
                    document.getElementById('xcodigo').focus()
                }else{
                    let data = {
                        solicitante: this.persona,
                        carrito: this.carrito
                    }

                    let datos = await axios.post(`http://${IP}:${PUERTO}/api/movimientos/s`, data, this.$store.state.token)
                    await this.wse(this.$store.state.rutas.inventario_productos)

                    minix({icon: 'success', mensaje: datos.data.message, tiempo: 3000})
                    
                    await ipcRenderer.send('vale_salida', `http://${IP}:${PUERTO}/pdf/${datos.data.message}`)

                    this.codigo = ''
                    this.cantidad = ''
                    this.entidad = ''
                    this.destino = ''
                    this.carrito = []

                    document.getElementById('incodigo').focus()
                }
            }
        },
        // async validarExistencias(){
        //     let articulo = await axios.get(`http://${IP}:${PUERTO}/api/productos/${this.codigo}`, this.$store.state.token)
        //     this.existencias = articulo.data
        // },
        borrarElemento(el){
            this.carrito.splice(el,1)
        },
        abrirModalBusqueda(){
            this.modalB = true
        },
        cerrarModalB(){
            this.modalB = false
            document.getElementById('xcodigo').focus()
        },
        pegarid(id){
            this.codigo = id
        },
        ...mapActions(['wse'])
    },
    mounted() {
        document.getElementById('incodigo').focus()
    },
}
</script>

<style>
    .table_{
        font-size: 13px;
    }
</style>