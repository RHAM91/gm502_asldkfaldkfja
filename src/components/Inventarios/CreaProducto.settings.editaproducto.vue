<template>
    <div class="contendor-edicionproducto">
        <b-container fluid>
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Edición de producto
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-3">
                    <b-form-input type="text" size="sm" id="codigobxc" v-model="codigobusqueda" placeholder="F2 para buscar" @keydown.113="abrirModalB"></b-form-input>
                </b-col>

                <b-col sm="2" class="mt-3">
                    <b-button type="button" size="sm" block variant="warning" @click="buscarproducto">Búscar</b-button>
                </b-col>

                <b-col sm="12" md="4" class="mt-5">
                    <label>Código</label>
                    <b-form-input type="text" v-model="codigo" size="sm"></b-form-input>
                </b-col>
                <b-col sm="12" md="8" class="mt-5">
                    <label>Nombre</label>
                    <b-form-input type="text" v-model="nombre" size="sm"></b-form-input>
                </b-col>
                <b-col sm="12" md="4" class="mt-3">
                    <label>Categoría</label>
                    <select class="form-control form-control-sm" v-model="categoria">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in inventario_categorias" :key="index" :value="item.categoria">{{item.categoria}}</option>
                    </select>
                </b-col>
                <b-col sm="12" md="4" class="mt-3">
                    <label>Medida</label>
                    <select class="form-control form-control-sm" v-model="medida">
                        <option value="">Selecciona</option>
                        <option v-for="(item, index) in inventario_medidas" :key="index" :value="item.medida">{{item.medida}}</option>
                    </select>
                </b-col>
                <b-col sm="12" md="4" class="mt-3">
                    <label>Stock mínimo</label>
                    <b-form-input type="number" size="sm" v-model="minimo"></b-form-input>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <label>Observaciones</label>
                    <b-form-textarea
                        id="textarea-small"
                        size="sm"
                        placeholder="Observaciones"
                        v-model="observaciones"
                    ></b-form-textarea>
                </b-col>
                <b-col sm="12" class="mt-4 d-flex flex-row-reverse">
                    <b-button tybe="button" variant="success" size="sm" @click="actualizarDatos">Guardar cambios</b-button>
                </b-col>
            </b-row>
        </b-container>

        <ModalBusqueda v-if="modalb"  v-on:cerrarmodal="cerrarModalB" v-on:IDP="pegarid" />
    </div>
    
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { minix } from '@/components/functions/alertas'
import {IP, PUERTO} from '@/config/parametros'
import ModalBusqueda from './Ingreso.modal.productos.vue'
import { inAppPurchase } from 'electron'


export default {
    name: "CreaProducto",
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
            minimo:'',
            observaciones: '',
            id: ''
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
            document.getElementById('codigobxc').focus()
        },
        async buscarproducto(){

            if (this.codigobusqueda == '') {
                minix({icon: 'error', mensaje: 'Ingresa un código para realizar búsqueda', tiempo: 3000})
            }else{
                let datos = await axios.get(`http://${IP}:${PUERTO}/api/productos/${this.codigobusqueda}`, this.$store.state.token)

                if (datos.data.message == 'NOT FOUND') {
                    minix({icon: 'error', mensaje: 'Código de producto NO existe', tiempo: 3000})
                    document.getElementById('codigobxc').focus()
                }else{

                    this.codigo = datos.data.codigo
                    this.nombre = datos.data.nombre
                    this.categoria = datos.data.categoria
                    this.medida = datos.data.medida
                    this.minimo = datos.data.minimo
                    this.observaciones = datos.data.observaciones
                    this.id = datos.data._id
                }

            }

            
        },
        async actualizarDatos(){

            if (this.codigo == '' || this.nombre == '' || this.categoria == '' || this.medida == '') {
                minix({icon: 'error', mensaje: 'Uno o más campos están vacios', tiempo: 3000})
            }else{

                let data = {
                    codigo: this.codigo,
                    nombre: this.nombre,
                    categoria: this.categoria,
                    medida: this.medida,
                    minimo: this.minimo,
                    observaciones: this.observaciones
                }
                
                let update = await axios.put(`http://${IP}:${PUERTO}/api/productos/${this.id}`, data, this.$store.state.token)
                minix({icon: 'success', mensaje: update.data.message, tiempo: 3000})
            }

        }
    }
}
</script>

<style>
    .contendor-edicionproducto{

    }
</style>