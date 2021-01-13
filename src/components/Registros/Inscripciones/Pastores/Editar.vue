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
                        <b-col sm="12" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" id="edit_campo_pastor" size="sm" v-model="nombre"></b-form-input>
                        </b-col>
                        <b-col sm="12"  class="mt-3">
                            <label>Iglesia</label>
                            <b-form-input type="text" size="sm" v-model="iglesia"></b-form-input>
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

import { mapActions, mapState } from 'vuex'


export default {
    name: 'Editar',
    props:['id'],
    computed:{
        ...mapState(['pastores'])
    },
    data() {
        return {
            nombre: '',
            telefono: '',
            iglesia: '',
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

            let a = this.pastores.filter(pastor => pastor._id == this.id)
            this.nombre = a[0].nombre
            this.telefono = a[0].telefono
            this.iglesia = a[0].iglesia
            this.correo = a[0].correo
        },
        async guardar(){
            let data = {
                api: 'pastores',
                id: this.id,
                formulario: {
                    nombre: this.nombre,
                    telefono: this.telefono,
                    iglesia: this.iglesia,
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