<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner">
                
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" v-model="nombre" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Teléfono</label>
                            <b-form-input type="number" v-model="telefono" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>pais</label>
                            <select class="form-control form-control-sm" v-model="pais" required>
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Correo</label>
                            <b-form-input type="email" v-model="correo" placeholder="@" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Fecha de nacimiento</label>
                            <b-form-input type="date" v-model="fecha_nacimiento" size="sm" required></b-form-input>
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
        ...mapState(['paises', 'docentes'])
    },
    data() {
        return {
            nombre: '',
            telefono: '',
            pais: '',
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
        getData(){
            let a = this.docentes.filter(docente => docente._id == this.id)
            this.nombre = a[0].nombre
            this.telefono = a[0].telefono
            this.pais = a[0].pais
            this.correo = a[0].correo
            this.fecha_nacimiento = a[0].fecha_nacimiento
        },
        async guardar(){
            let info = {
                api: 'docentes',
                id: this.id,
                formulario: {
                    nombre: this.nombre,
                    telefono: this.telefono,
                    pais: this.pais,
                    correo: this.correo,
                    fecha_nacimiento: this.fecha_nacimiento
                }
            }

            await this.updateData(info)
            await this.wse(this.$store.state.rutas.docentes)

            this.salir()
        },
        ...mapActions(['updateData', 'wse'])
    },
    mounted() {
        this.getData()
    },
}
</script>

<style>

</style>