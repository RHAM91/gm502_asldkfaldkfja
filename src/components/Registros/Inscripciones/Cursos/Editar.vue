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
                                Editar {{nombre}}
                            </h3>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" v-model="nombre" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Duración</label>
                            <b-form-input type="number" v-model="duracion" size="sm" required></b-form-input>
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
        ...mapState(['cursos'])
    },
    data() {
        return {
            nombre: '',
            duracion: 1
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
            let info = {
                api: 'cursos',
                id: this.id,
                formulario: {
                    curso: this.nombre,
                    duracion: this.duracion
                }
            }

            await this.updateData(info)
            await this.wse(this.$store.state.rutas.cursos)

            this.salir()
        },
        getDatos(){
            let a = this.cursos.filter(curso => curso._id == this.id)
            this.nombre = a[0].curso
            this.duracion = a[0].duracion
        },
        ...mapActions(['updateData', 'wse'])
    },
    mounted() {
        this.getDatos()
    },

}
</script>

<style>

</style>