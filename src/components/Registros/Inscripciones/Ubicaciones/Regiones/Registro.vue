<template>
    <div class="contenedor_modal">
        <div v-if="modal_lista" class="cuerpo_modal" :style="`height: ${h};`">
            <div class="modal_banner style_reg_paises">
                <b-button type="button" size="sm" variant="outline-info" title="Lista de países" @click="ver_lista"><i class="fas fa-clipboard-list"></i></b-button>
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h3>
                                Regiones
                            </h3>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>País</label>
                            <select class="form-control form-control-sm" v-model="pais" @change="getDepartamentosxpais" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Ciudad / Departamento</label>
                            <select class="form-control form-control-sm" v-model="ciudad" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in ciudades_array" :key="index" :value="item.ciudad">{{item.ciudad}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="10" class="mt-3">
                            <label>Nombre de la región</label>
                            <b-form-input type="text" v-model="region" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="2" class="mt-5">
                            <b-button type="submit" variant="success" size="sm">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>

        <div v-else class="cuerpo_modal">
            <Lista v-on:cerrar_lista="close_lista" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import Lista from './Lista.vue'

export default {
    name: 'Registro',
    components:{
        Lista
    },
    computed:{
        ...mapState(['paises', 'ciudades'])
    },
    data() {
        return {
            h: '300px',
            w: '',
            pais: '',
            ciudad: '',
            region: '',
            ciudades_array: [],
            modal_lista: true
        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    methods: {
        salir(){
            this.$emit('cerrar_modal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.salir()
            }
        },
        async guardar(){
            let data = {
                api: 'regiones',
                formulario: {
                    pais: this.pais,
                    ciudad: this.ciudad,
                    region: this.region
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.regiones)

            this.pais = ''
            this.ciudad = ''
            this.region = ''

        },
        getDepartamentosxpais(){
            this.ciudades_array = []

            for (let i = 0; i < this.ciudades.length; i++) {
                const e = this.ciudades[i];
                

                if (this.pais == e.pais) {
                    let data = {
                        ciudad: e.ciudad
                    }

                    this.ciudades_array.push(data)
                }
            }
        },
        ver_lista(){
            this.modal_lista = false
        },
        close_lista(){
            this.modal_lista = true
        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        
    },
}
</script>

<style scoped>
    .style_reg_paises{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: 5px;
    }
</style>