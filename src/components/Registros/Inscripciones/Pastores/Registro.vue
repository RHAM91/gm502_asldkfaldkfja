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
                                Registro del Pastor
                            </h3>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" id="campo_nombre_pastor" size="sm" v-model="nombre" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Apellidos</label>
                            <b-form-input type="text"  size="sm" v-model="apellidos" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Iglesia</label>
                            <b-form-input type="text"  size="sm" v-model="iglesia" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Teléfono</label>
                            <b-form-input type="number" size="sm" v-model="telefono" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Correo</label>
                            <b-form-input type="email" size="sm" v-model="correo" required></b-form-input>
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
import { mapActions } from 'vuex'
export default {
    name: 'RegistroPastor',
    data() {
        return {
            nombre: '',
            apellidos: '',
            iglesia: '',
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
        async guardar(){
            let data = {
                api: 'pastores',
                formulario: {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    iglesia: this.iglesia,
                    telefono: this.telefono,
                    correo: this.correo
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.pastores)

            this.nombre = ''
            this.apellidos = ''
            this.iglesia = ''
            this.telefono = ''
            this.correo = ''

            document.getElementById('campo_nombre_pastor').focus()
        },
        
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('campo_nombre_pastor').focus()
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