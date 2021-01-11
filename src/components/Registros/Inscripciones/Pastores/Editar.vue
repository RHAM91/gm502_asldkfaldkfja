<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner">
                
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h2>
                                {{nombre}}
                            </h2>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" id="edit_campo_pastor" size="sm" v-model="nombre"></b-form-input>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Apellidos</label>
                            <b-form-input type="text" size="sm" v-model="apellidos"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Teléfono</label>
                            <b-form-input type="number" size="sm" v-model="telefono"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Correo</label>
                            <b-form-input type="email" size="sm" v-model="correo"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="success">Actualizar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { mapActions } from 'vuex'


export default {
    name: 'Editar',
    props:['id'],
    data() {
        return {
            nombre: '',
            apellidos: '',
            telefono: '',
            correo: ''
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
        async getDatos(){
            let datos = await axios.get(`http://${IP}:${PUERTO}/api/pastores/${this.id}`, this.$store.state.token)
            this.nombre = datos.data.nombre
            this.apellidos = datos.data.apellidos
            this.telefono = datos.data.telefono
            this.correo = datos.data.correo
        },
        async guardar(){
            let data = {
                api: 'pastores',
                id: this.id,
                formulario: {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    telefono: this.telefono,
                    correo: this.correo
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.pastores)

            this.salir()
        },
        ...mapActions(['updateData', 'wse'])
    },
    mounted() {
        this.getDatos()
        document.getElementById('edit_campo_pastor').focus()
    },
}
</script>

<style>

</style>