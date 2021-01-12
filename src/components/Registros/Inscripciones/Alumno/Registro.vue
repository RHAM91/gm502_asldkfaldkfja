<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal" style="height: 520px;">
            <div class="modal_banner dd">
                <i class="fas fa-plus" style="margin-right: 5px;"></i>Registro alumno
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" id="nombre_registro_alumno" v-model="nombre" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Apellidos</label>
                            <b-form-input type="text" v-model="apellidos" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Teléfono</label>
                            <b-form-input type="number" v-model="telefono" placeholder="+502" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" md="8" class="mt-3">
                            <label>Correo</label>
                            <b-form-input type="email" v-model="correo" placeholder="@" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Pastor</label>
                            <select class="form-control form-control-sm" v-model="pastor" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in pastores" :key="index" :value="`${item.nombre} ${item.apellidos}`">{{item.nombre}} {{item.apellidos}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>País</label>
                            <select class="form-control form-control-sm" @change="getDepartamentosxpais" v-model="pais" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Ciudad</label>
                            <select class="form-control form-control-sm" @change="getRegionxCiudad" v-model="ciudad" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in ciudades_array" :key="index" :value="item.ciudad">{{item.ciudad}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Región</label>
                            <select class="form-control form-control-sm" v-model="region" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in regiones_array" :key="index" :value="item.region">{{item.region}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Docente</label>
                            <select class="form-control form-control-sm" v-model="docente" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in docentes" :key="index" :value="`${item.nombre} ${item.apellidos}`">{{item.nombre}} {{item.apellidos}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Curso</label>
                            <select class="form-control form-control-sm" v-model="curso" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in cursos" :key="index" :value="item.curso">{{item.curso}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Nivel</label>
                            <select class="form-control form-control-sm" v-model="nivel" required>
                                <option value="">Seleccionar</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="success">Guardar</b-button>
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
    name: 'Formulario',
    computed: {
        ...mapState(['pastores', 'paises','ciudades','docentes', 'cursos', 'regiones'])
    },
    data() {
        return {
            nombre: '',
            apellidos: '',
            telefono: '',
            correo: '',
            pastor: '',
            pais: '',
            ciudad: '',
            region: '',
            docente: '',
            curso: '',
            nivel: '',
            ciudades_array:[],
            regiones_array: []

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
                api: 'alumnos',
                formulario: {
                    nombre: this.nombre,
                    apellidos: this.apellidos,
                    telefono: this.telefono,
                    correo: this.correo,
                    pastor: this.pastor,
                    pais: this.pais,
                    ciudad: this.ciudad,
                    region: this.region,
                    docente: this.docente,
                    curso: this.curso,
                    nivel: this.nivel
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.alumnos)

            this.nombre = ''
            this.apellidos = ''
            this.telefono = ''
            this.correo = ''
            this.pastor = ''
            this.pais = ''
            this.ciudad = ''
            this.region = ''
            this.docente = ''
            this.curso = ''
            this.nivel = ''
        },
        getDepartamentosxpais(){
            this.ciudades_array = []

            for (let i = 0; i < this.ciudades.length; i++) {
                const e = this.ciudades[i];
                

                if (this.pais == e.pais) {
                    let data = {
                        ciudad: e.ciudad
                    }

                    this.ciudades_array.push(data)
                }
            }
        },
        getRegionxCiudad(){
            for (let i = 0; i < this.regiones.length; i++) {
                const e = this.regiones[i];
                

                if (this.ciudad == e.ciudad) {
                    let data = {
                        region: e.region
                    }

                    this.regiones_array.push(data)
                }
            }
        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('nombre_registro_alumno').focus()
    },
}
</script>

<style scoped>
    .dd{
        display: flex;
        align-items: center;
        padding-left: 10px;
    }
</style>