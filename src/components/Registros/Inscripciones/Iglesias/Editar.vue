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
                            <label>Iglesia</label>
                            <b-form-input type="text" id="edit_campo_pastor" size="sm" v-model="nombre"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Pastor</label>
                            <select class="form-control form-control-sm" v-model="pastor">
                                <option value="">Seleccina</option>
                                <option v-for="(item, index) in pastores" :key="index" :value="item.nombre">{{item.nombre}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Dirección</label>
                            <b-form-input type="text" size="sm" v-model="direccion"></b-form-input>
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
        ...mapState(['pastores', 'iglesias'])
    },
    data() {
        return {
            nombre: '',
            pastor: '',
            direccion: ''
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

            let a = this.iglesias.filter(iglesia=> iglesia._id == this.id)
            this.nombre = a[0].iglesia
            this.pastor = a[0].pastor
            this.direccion = a[0].direccion
        },
        async guardar(){
            let data = {
                api: 'iglesias',
                id: this.id,
                formulario: {
                    iglesia: this.nombre,
                    pastor: this.pastor,
                    direccion: this.direccion,
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.iglesias)

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