<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="3" class="">
                <label>Código</label>
                <b-form-input id="codigo_producto" v-model="codigo" autocomplete="off" type="text" size="sm"></b-form-input>
            </b-col>

            <b-col sm="12" md="9" class="">
                <label>Nombre</label>
                <b-form-input v-model="nombre" type="text" size="sm"></b-form-input>
            </b-col>

            <b-col sm="12" md="3" class="mt-3" >
                <label>Bodega</label>
                <select class="form-control form-control-sm" required v-model="lugar">
                    <option value="">Seleccciona</option>
                    <option value="iglesia">Iglesia</option>
                    <option value="oficina">Oficina</option>
                </select>
            </b-col>


            <!-- <b-col sm="12" md="3" class="mt-3" >
                <label>Ubicación</label>
                <select class="form-control form-control-sm" required v-model="ubicacion">
                    <option value="">Seleccciona</option>
                    <option v-for="(item, index) in inventario_ubicaciones" :key="index" :value="item.ubicacion">{{item.ubicacion}}</option>
                </select>
            </b-col> -->

            <!-- <b-col sm="12" md="3" class="mt-3">
                <label>Precio de compra</label>
                <b-form-input type="number" placeholder="Q." v-model="precio" step="0.01" size="sm"></b-form-input>
            </b-col> -->

            <b-col sm="12" md="3" class="mt-3">
                <label>Categoría</label>
                <select class="form-control form-control-sm" v-model="categoria">
                    <option value="">Selecciona</option>
                    <option v-for="(item, index) in inventario_categorias" :key="index" :value="item.categoria">{{item.categoria}}</option>
                </select>
            </b-col>

            <b-col sm="12" md="3" class="mt-3">
                <label>Medida</label>
                <select class="form-control form-control-sm" v-model="medida">
                    <option value="">Selecciona</option>
                    <option v-for="(item, index) in inventario_medidas" :key="index" :value="item.medida">{{item.medida}}</option>
                </select>
            </b-col>

            <b-col sm="12" md="3" class="mt-3">
                <label>Stock mínimo</label>
                <b-form-input type="number" size="sm" v-model="minimo" required></b-form-input>
            </b-col>

            <b-col sm="12" class="mt-3">
                <label>Descripción</label>
                <b-form-textarea
                    id="textarea"
                    placeholder="Escribe..."
                    rows="3"
                    max-rows="6"
                    v-model="observaciones"
                ></b-form-textarea>
            </b-col>

            <b-col sm="12" class="mt-3">
                <b-button type="button" size="sm" variant="success" @click="guardarDatos">Guardar</b-button>
            </b-col>

        </b-row>


        <div class="btn_ajustes" @click="abrirM">
            <i class="fas fa-cog"></i>
        </div>

        <Settings v-if="modal_settings" v-on:cerrarModal="cerrarM" />

    </b-container>
</template>

<script>

import Settings from './CreaProducto.settings.vue'
import {IP, PUERTO} from '@/config/parametros'
import {minix} from '@/components/functions/alertas'

import { mapActions, mapState } from 'vuex'
export default {
    name: "EntradaProductos",
    components:{
        Settings
    },
    computed: {
        ...mapState(['inventario_categorias', 'inventario_medidas', 'inventario_ubicaciones'])
    },
    data() {
        return {
            codigo: '',
            nombre: '',
            categoria: '',
            medida: '',
            lugar: '',
            minimo: '3',
            ubicacion: 'n/a',
            observaciones: '',
            modal_settings: false,
        }
    },
    methods: {
        async guardarDatos(){

            if (this.codigo == '' || this.nombre == '' || this.lugar == '' || this.categoria == '' || this.medida == '' || this.minimo == '') {
                minix({icon: 'error', mensaje: 'Uno o más campos están vacios', tiempo: 3000})
            }else{

                let data = {
                    api: 'productos',
                    formulario: {
                        codigo: this.codigo,
                        nombre: this.nombre,
                        categoria: this.categoria,
                        medida: this.medida,
                        lugar: this.lugar,
                        minimo: this.minimo,
                        ubicacion: this.ubicacion,
                        observaciones: this.observaciones
                    }
                }
    
                await this.insert_data(data)
    
                if (this.$store.state.no_formulario == 0) {
                    
                    await this.wse(this.$store.state.rutas.inventario_productos)
    
                    this.codigo = ''
                    this.nombre = ''
                    this.lugar = ''
                    this.ubicacion = ''
                    this.categoria = ''
                    this.medida = ''
                    this.observaciones = ''
                }

            }

        },
        abrirM(){
            this.modal_settings = true
        },
        cerrarM(){
            this.modal_settings = false
        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('codigo_producto').focus()
    },
}
</script>

<style>
    .btn_ajustes{
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: orangered;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>