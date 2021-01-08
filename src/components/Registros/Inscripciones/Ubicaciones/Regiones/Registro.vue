<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner">
                
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">hola regiones</b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
    name: 'Registro',
    data() {
        return {
            
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
                    apellidos: this.apellidos,
                    pais: this.pais,
                    telefono: this.telefono,
                    correo: this.correo,
                    fecha_nacimiento: this.fecha_nacimiento
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.docentes)

        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        
    },
}
</script>

<style>
    
</style>