<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner">
                
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h3>
                                Registro de Iglesia
                            </h3>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" id="campo_nombre_iglesia" size="sm" v-model="nombre" required></b-form-input>
                        </b-col>
                        <!-- <b-col sm="12" md="6" class="mt-3">
                            <label>Apellidos</label>
                            <b-form-input type="text"  size="sm" v-model="apellidos" required></b-form-input>
                        </b-col> -->
                        <!-- <b-col sm="12" class="mt-3">
                            <label>Iglesia</label>
                            <b-form-input type="text"  size="sm" v-model="iglesia" required></b-form-input>
                        </b-col> -->
                        <b-col sm="12" class="mt-3">
                            <label>Pastor</label>
                            <!-- <select class="form-control form-control-sm" v-model="pastor" required>
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in pastores" :key="index" :value="item.nombre">{{item.nombre}}</option>
                            </select> -->
                            <v-select :options="pastores" label="nombre" :reduce="nombre => nombre.nombre" v-model="pastor"></v-select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Dirección</label>
                            <b-form-input type="text" size="sm" v-model="direccion"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" variant="success" size="sm">Guardar</b-button>
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
    name: 'RegistroIglesia',
    props:['externo'],
    computed:{
        ...mapState(['pastores'])
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
        async guardar(){
            let data = {
                api: 'iglesias',
                formulario: {
                    iglesia: this.nombre,
                    pastor: this.pastor,
                    direccion: this.direccion
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.iglesias)

            this.nombre = ''
            this.pastor = ''
            this.direccion = ''

            document.getElementById('campo_nombre_iglesia').focus()
            if (this.externo) {
                this.salir()
            }
        },
        
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('campo_nombre_iglesia').focus()
    },
}
</script>

<style>
    .contenedor_modal{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .cuerpo_modal{
            width: 700px;
            height: 500px;
            background-color: white;
        }
            .modal_banner{
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #ebebeb;
            }
</style>