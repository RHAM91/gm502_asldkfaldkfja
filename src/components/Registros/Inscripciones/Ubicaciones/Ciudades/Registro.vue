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
                                Cuidad / Departamento
                            </h3>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>País</label>
                            <select class="form-control form-control-sm" v-model="pais" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Nombre de cuidad ó departamento</label>
                            <b-form-input type="text" v-model="nombre" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="2" class="mt-3">
                            <label>Abreviatura</label>
                            <b-form-input type="text"  v-model="abreviatura_pais" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
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
    props:['externo'],
    components:{
        Lista
    },
    computed:{
        ...mapState(['paises'])
    },
    data() {
        return {
            h: '250px',
            w: '',
            pais: '',
            nombre: '',
            abreviatura_pais: '',
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
                api: 'ciudades',
                formulario: {
                    pais: this.pais,
                    ciudad: this.nombre,
                    abreviatura: this.abreviatura_pais.toUpperCase()
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.ciudades)

            this.nombre = ''
            this.abreviatura_pais = ''
            this.codigo = ''

            if (this.externo) {
                this.salir()
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