<template>
    <div class="contendor-edicionproducto">
        <b-container fluid>
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Eliminar producto
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-3">
                    <b-form-input type="text" size="sm" id="codigobxcxxxx" v-model="codigobusqueda" placeholder="F2 para buscar" @keydown.113="abrirModalB"></b-form-input>
                </b-col>

                <b-col sm="2" class="mt-3">
                    <b-button type="button" size="sm" block variant="warning" @click="buscarproducto">Buscar</b-button>
                </b-col>

                <b-col v-if="mostrarlista" sm="12" class="mt-4">
                    <table class="table table-sm table-bordered table-striped" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 15%;">
                                    Código
                                </th>
                                <th  style="width: 75%;">
                                    Nombre
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {{codigo}}
                                </td>
                                <td>
                                    {{nombre}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" size="sm" variant="danger" @click="borrarDatos(id)"><i class="fas fa-trash"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </b-container>

        <ModalBusqueda v-if="modalb"  v-on:cerrarmodal="cerrarModalB" v-on:IDP="pegarid" />
    </div>
    
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import { minix, pregunta } from '@/components/functions/alertas'
import {IP, PUERTO} from '@/config/parametros'
import ModalBusqueda from './Ingreso.modal.productos.vue'


export default {
    name: "EliminaProducto",
    components:{
        ModalBusqueda
    },
    computed:{
        ...mapState(['inventario_categorias', 'inventario_medidas'])
    },
    data() {
        return {
            modalb: false,
            codigobusqueda: '',
            codigo: '',
            nombre: '',
            categoria: '',
            medida: '',
            observaciones: '',
            id: '',
            mostrarlista: false
        }
    },
    methods: {
        abrirModalB(){
            this.modalb = true
        },
        cerrarModalB(){
            this.modalb = false
        },
        pegarid(id){
            this.codigobusqueda = id
            document.getElementById('codigobxcxxxx').focus()
        },
        async buscarproducto(){

            if (this.codigobusqueda == '') {
                minix({icon: 'error', mensaje: 'Ingresa un código para realizar búsqueda', tiempo: 3000})
            }else{
                let datos = await axios.get(`http://${IP}:${PUERTO}/api/productos/${this.codigobusqueda}`, this.$store.state.token)

                if (datos.data.message == 'NOT FOUND') {
                    minix({icon: 'error', mensaje: 'Código de producto NO existe', tiempo: 3000})
                    document.getElementById('codigobxcxxxx').focus()
                }else{

                    this.codigo = datos.data.codigo
                    this.nombre = datos.data.nombre
                    this.categoria = datos.data.categoria
                    this.medida = datos.data.medida
                    this.observaciones = datos.data.observaciones
                    this.id = datos.data._id
                    this.mostrarlista = true
                }

            }

            
        },
        async borrarDatos(id){

           pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                   let borrado = await axios.delete(`http://${IP}:${PUERTO}/api/productos/${id}`, this.$store.state.token)
                   minix({icon: 'success', mensaje: borrado.data.message, tiempo: 3000})
                   await this.wse(this.$store.state.rutas.inventario_productos)
                   this.mostrarlista = false
                   this.codigobusqueda = ''
                   document.getElementById('codigobxcxxxx').focus()
                }
            })

        },
        ...mapActions(['wse'])
    }
}
</script>

<style>
    .contendor-edicionproducto{

    }
</style>