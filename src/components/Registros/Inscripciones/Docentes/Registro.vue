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
                                Registro del docente
                            </h3>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre completo</label>
                            <b-form-input type="text" id="campo_nombre_docente" size="sm" v-model="nombre" required></b-form-input>
                        </b-col>
                        <!-- <b-col sm="12" md="6" class="mt-3">
                            <label>Apellidos</label>
                            <b-form-input type="text" step="01"  size="sm" v-model="apellidos" required></b-form-input>
                        </b-col> -->
                        <b-col sm="12" md="8" class="mt-3">
                            <label>País</label>
                            <select class="form-control form-control-sm" v-model="pais" required>
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Teléfono</label>
                            <b-form-input type="number"  size="sm" v-model="telefono" ></b-form-input>
                        </b-col>

                        <b-col sm="12" class="mt-3">
                            <label>Correo</label>
                            <b-form-input type="email"  size="sm" v-model="correo" placeholder="@" ></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Fecha nacimiento</label>
                            <b-form-input type="date"  size="sm" v-model="fecha_nacimiento" ></b-form-input>
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
import moment from 'moment'

export default {
    name: 'RegistroDocente',
    computed:{
        ...mapState(['paises'])
    },
    data() {
        return {
            nombre: '',
            pais: '',
            telefono: '',
            correo: '',
            fecha_nacimiento: ''
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
                api: 'docentes',
                formulario: {
                    nombre: this.nombre,
                    pais: this.pais,
                    telefono: this.telefono,
                    correo: this.correo,
                    fecha_nacimiento: this.fecha_nacimiento
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.docentes)

            this.nombre = ''
            this.pais = ''
            this.telefono = ''
            this.correo = ''
            this.fecha_nacimiento = ''

            document.getElementById('campo_nombre_docente').focus()
        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('campo_nombre_docente').focus()
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