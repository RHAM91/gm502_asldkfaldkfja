<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal" style="height: 750px;width: 850px">
            <div class="modal_banner dd">
                <i class="fas fa-plus" style="margin-right: 5px;"></i>Registro alumno
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre completo</label>
                            <b-form-input type="text" id="nombre_registro_alumno" v-model="nombre" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Teléfono</label>
                            <b-form-input type="number" v-model="telefono" placeholder="+502" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Correo</label>
                            <b-form-input type="email" v-model="correo" placeholder="@" size="sm" ></b-form-input>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <label>Dirección</label>
                            <b-form-input type="text" v-model="direccion" size="sm" ></b-form-input>
                        </b-col>
                        <b-col sm="12" md="5" class="mt-3">
                            <label>Pastor</label>
                            <!-- <select class="form-control form-control-sm" v-model="pastor" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in pastores" :key="index" :value="item.nombre">{{item.nombre}}</option>
                            </select> -->
                            <v-select :options="pastores" label="nombre" :reduce="nombre => nombre.nombre" v-model="pastor"></v-select>
                        </b-col>
                        <b-col sm="12" md="1" class="mt-5">
                            <b-button type="button" size="sm" variant="outline-warning" @click="abrir_modal_pastores"><i class="fas fa-plus"></i></b-button>
                        </b-col>
                         <b-col sm="12" md="5" class="mt-3">
                            <label>Iglesia</label>
                            <!-- <select class="form-control form-control-sm" v-model="iglesia" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in iglesias" :key="index" :value="item.iglesia">{{item.iglesia}}</option>
                            </select> -->
                            <v-select :options="iglesias_array" label="iglesia" :reduce="iglesia => iglesia.iglesia" v-model="iglesia"></v-select>
                        </b-col>
                        <b-col sm="12" md="1" class="mt-5">
                            <b-button type="button" size="sm" variant="outline-warning" @click="abrir_modal_iglesias"><i class="fas fa-plus"></i></b-button>
                        </b-col>
                        <b-col sm="12" md="3" class="mt-3">
                            <label>País</label>
                            <select class="form-control form-control-sm" @change="getDepartamentosxpais" v-model="pais" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="1" class="mt-5">
                            <b-button type="button" size="sm" variant="outline-warning" @click="abrir_modal_paises"><i class="fas fa-plus"></i></b-button>
                        </b-col>
                        <b-col sm="12" md="3" class="mt-3">
                            <label>Ciudad</label>
                            <select class="form-control form-control-sm" @change="getRegionxCiudad" v-model="ciudad" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in ciudades_array" :key="index" :value="item.ciudad">{{item.ciudad}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="1" class="mt-5">
                            <b-button type="button" size="sm" variant="outline-warning" @click="abrir_modal_ciudades"><i class="fas fa-plus"></i></b-button>
                        </b-col>
                        <b-col sm="12" md="3" class="mt-3">
                            <label>Región</label>
                            <select class="form-control form-control-sm" v-model="region">
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in regiones_array" :key="index" :value="item.region">{{item.region}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="1" class="mt-5">
                            <b-button type="button" size="sm" variant="outline-warning" @click="abrir_modal_regiones"><i class="fas fa-plus"></i></b-button>
                        </b-col>
                        <b-col sm="12" md="11" class="mt-3">
                            <label>Curso</label>
                            <!-- <select class="form-control form-control-sm" v-model="curso" required>
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in cursos" :key="index" :value="item.curso">{{item.curso}}</option>
                            </select> -->

                            <v-select :options="cursos" label="curso" :reduce="curso => curso.curso" name="states[]" multiple="multiple" v-model="curso"></v-select>
                        </b-col>
                        <b-col sm="12" md="1" class="mt-5">
                            <b-button type="button" size="sm" variant="outline-warning" @click="abrir_modal_cursos"><i class="fas fa-plus"></i></b-button>
                        </b-col>
                        <b-col sm="12" md="7" class="mt-3">
                            <label>Docente</label>
                            <select class="form-control form-control-sm" v-model="docente" >
                                <option value="">Seleccionar</option>
                                <option v-for="(item, index) in docentes" :key="index" :value="`${item.nombre} ${item.apellidos}`">{{item.nombre}} {{item.apellidos}}</option>
                            </select>
                            <!-- <v-select :options="docentes" label="nombre" :reduce="nombre => nombre.nombre" v-model="docente"></v-select> -->
                        </b-col>
                        <b-col sm="12" md="1" class="mt-5">
                            <b-button type="button" size="sm" variant="outline-warning" @click="abrir_modal_docentes"><i class="fas fa-plus"></i></b-button>
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
                        <b-col sm="12" class="mt-3">
                            <label>Tiene inscripción?</label>
                            <select class="form-control form-control-sm" v-model="inscripcion">
                                <option value="">Selecciona</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </b-col>
                        <b-col v-if="inscripcion == 'si'" sm="12" md="6" class="mt-3">
                            <label>Monto de inscripción</label>
                            <b-form-input type="number" v-model="monto" placeholder="Q" step="0.01" size="sm"></b-form-input>
                        </b-col>
                        <b-col v-if="inscripcion == 'si'" sm="12" md="6" class="mt-3">
                            <label>No. documento</label>
                            <b-form-input type="text" v-model="nodocins" size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex justify-content-between">
                            <b-button type="button" size="sm" @click="modal_pagos" variant="outline-danger">Realizar pagos</b-button>
                            <b-button type="submit" size="sm" variant="success">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>

        <Pagos v-if="mod_pagos" />
        <Pastores v-if="reg_pastores" v-on:cerrar_modal="cerrar_modal_pastores" :externo="true" />
        <Iglesias v-if="reg_iglesias" v-on:cerrar_modal="cerrar_modal_iglesias" :externo="true" />
        <Paises v-if="reg_paises" v-on:cerrar_modal="cerrar_modal_paises" :externo="true"/>
        <Ciudades v-if="reg_ciudades" v-on:cerrar_modal="cerrar_modal_ciudades" :externo="true"/>
        <Regiones v-if="reg_regiones" v-on:cerrar_modal="cerrar_modal_regiones" :externo="true"/>
        <Docentes v-if="reg_docentes" v-on:cerrar_modal="cerrar_modal_docentes" :externo="true"/>
        <Cursos v-if="reg_cursos" v-on:cerrar_modal_cursos="cerrar_modal_cursos" :externo="true"/>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Pagos from './Modal_Pagos.vue'
import Pastores from '../Pastores/Registro.vue'
import Iglesias from '../Iglesias/Registro.vue'
import Paises from '../Ubicaciones/Paises/Registro.vue'
import Ciudades from '../Ubicaciones/Ciudades/Registro.vue'
import Regiones from '../Ubicaciones/Regiones/Registro.vue'
import Docentes from '../Docentes/Registro.vue'
import Cursos from '../Cursos/Registro.vue'


export default {
    name: 'Formulario',
    components:{
        Pagos,
        Pastores,
        Iglesias,
        Paises,
        Ciudades,
        Regiones,
        Docentes,
        Cursos
    },
    computed: {
        ...mapState(['pastores', 'paises','ciudades','docentes', 'cursos', 'regiones', 'iglesias'])
    },
    data() {
        return {
            inscripcion: 'no',
            nombre: '',
            telefono: '',
            correo: '',
            direccion: '',
            pastor: '',
            iglesia: '',
            pais: '',
            ciudad: '',
            region: '',
            docente: '',
            curso: '',
            nivel: '',
            monto: '',
            nodocins:'',
            iglesias_array: [],
            ciudades_array:[],
            regiones_array: [],
            mod_pagos: false,
            reg_pastores: false,
            reg_iglesias: false,
            reg_paises: false,
            reg_ciudades: false,
            reg_regiones: false,
            reg_docentes: false,
            reg_cursos: false

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
                    nombre: this.nombre.trim(),
                    apellidos: this.apellidos,
                    telefono: this.telefono,
                    correo: this.correo,
                    direccion: this.direccion,
                    pastor: this.pastor,
                    iglesia: this.iglesia,
                    pais: this.pais,
                    ciudad: this.ciudad,
                    region: this.region,
                    docente: this.docente,
                    curso: this.curso,
                    nivel: parseInt(this.nivel),
                    monto: this.monto,
                    deposito: this.nodocins
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.alumnos)

            this.nombre = ''
            this.apellidos = ''
            this.telefono = ''
            this.correo = ''
            this.direccion = ''
            this.pastor = ''
            this.iglesia = ''
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
        getIglesiasxPastor(){
            let filtro = this.iglesias.filter(iglesia => iglesia.pastor == this.pastor)
            this.iglesias_array = filtro
        },
        modal_pagos(){
            this.mod_pagos = true
        },
        abrir_modal_pastores(){
            this.reg_pastores = true
        },
        cerrar_modal_pastores(){
            this.reg_pastores = false
        },
        abrir_modal_iglesias(){
            this.reg_iglesias = true
        },
        cerrar_modal_iglesias(){
            this.reg_iglesias = false
        },
        abrir_modal_paises(){
            this.reg_paises = true
        },
        cerrar_modal_paises(){
            this.reg_paises = false
        },
        abrir_modal_ciudades(){
            this.reg_ciudades = true
        },
        cerrar_modal_ciudades(){
            this.reg_ciudades = false
        },
        abrir_modal_regiones(){
            this.reg_regiones = true
        },
        cerrar_modal_regiones(){
            this.reg_regiones = false
        },
        abrir_modal_docentes(){
            this.reg_docentes = true
        },
        cerrar_modal_docentes(){
            this.reg_docentes = false
        },
        abrir_modal_cursos(){
            this.reg_cursos = true
        },
        cerrar_modal_cursos(){
            this.reg_cursos = false
        },
        ...mapActions(['insert_data', 'wse'])
    },
    watch:{
        pastor: function(val){
            if (val != '') {
                this.getIglesiasxPastor()
            }
        }
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