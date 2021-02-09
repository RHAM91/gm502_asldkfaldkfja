<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal mod_para_perfil">
            <div class="modal_banner modal_banner_perfil">
                {{codigo}} 
                <b-dropdown v-if="!btn_editar" id="dropdown-right" right text="Right align" size="sm" variant="outline-info" class="m-2"  no-caret>
                    <template #button-content>
                       <i class="fas fa-bars"></i>
                    </template>
                    <b-dropdown-item href="#" @click="editar">Editar</b-dropdown-item>
                    <b-dropdown-item href="#" @click="borrar">Borrar</b-dropdown-item>
                    <b-dropdown-item href="#" @click="abrir_modal_pagos">Pagos</b-dropdown-item>
                    <b-dropdown-item href="#" @click="deshabilitar">Deshabilitar</b-dropdown-item>
                </b-dropdown>
                <div v-else class="botonera">
                    <b-button  type="button" size="sm" variant="success" @click="actualizar" style="margin-right: 5px;"><i class="fas fa-save"></i></b-button>
                    <b-button  type="button" size="sm" variant="danger" @click="editar" style="margin-right: 5px;"><i class="fas fa-ban"></i></b-button>
                </div>
            </div>
            <div class="cuadro_fondo">
                <div class="data_persona">
                    <div class="foto_persona">
                        <div class="img_">

                        </div>
                    </div>
                    <div class="datos">
                        <div class="info_">
                            <b-container fluid>
                                <b-row>
                                    <b-col sm="12" class="mt-3">
                                        <table style="width: 100%;">
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-user"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{nombre}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <b-form-input type="text" size="sm" v-model="nombre"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-phone"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{telefono}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <b-form-input type="number" size="sm" v-model="telefono"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{direccion}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <b-form-input type="text" size="sm" v-model="direccion"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-at"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{correo}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <b-form-input type="email" size="sm" v-model="correo"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="far fa-flag"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{pais}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <!-- <b-form-input type="text" size="sm" v-model="pais"></b-form-input> -->
                                                    <select class="form-control form-control-sm" v-model="pais">
                                                        <option value="">Selecciona</option>
                                                        <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-city"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{ciudad}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <!-- <b-form-input type="text" size="sm" v-model="ciudad"></b-form-input> -->
                                                    <select class="form-control form-control-sm" v-model="ciudad">
                                                        <option value="">Selecciona</option>
                                                        <option v-for="(item, index) in ciudades" :key="index" :value="item.ciudad">{{item.ciudad}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-compass"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{region}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <!-- <b-form-input type="text" size="sm" v-model="region"></b-form-input> -->
                                                    <select class="form-control form-control-sm" v-model="region">
                                                        <option value="">Selecciona</option>
                                                        <option v-for="(item, index) in regiones" :key="index" :value="item.region">{{item.region}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-guitar"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    <b-button type="button" variant="outline-warning" @click="modalInstrumentos" size="sm">lista</b-button>
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <!-- <b-form-input type="text" size="sm" v-model="instrumento"></b-form-input> -->
                                                    <!-- <select class="form-control form-control-sm" v-model="instrumento">
                                                        <option value="">Selecciona</option>
                                                        <option v-for="(item, index) in cursos" :key="index" :value="item.curso">{{item.curso}}</option>
                                                    </select> -->
                                                    <!-- <v-select :options="cursos" label="curso" :reduce="curso => curso.curso" name="states[]" multiple="multiple" v-model="instrumento"></v-select> -->
                                                    <b-button type="button" variant="warning" size="sm">listax</b-button>
                                                </td>
                                            </tr>
                                        </table>
                                    </b-col>
                                    
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                </div>
                <div class="__cuerpo__">
                    <b-container fluid>
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <table style="width: 100%;">
                                    <tr>
                                        <td style="width: 12%;">
                                            <b>Pastor:</b>
                                        </td>
                                        <td v-if="!btn_editar" style="88%;">
                                            {{pastor}}
                                        </td>
                                        <td v-else style="88%;">
                                            <!-- <select class="form-control form-control-sm" v-model="pastor">
                                                <option value="">Selecciona</option>
                                                <option v-for="(item, index) in pastores" :key="index" :value="item.nombre">{{item.nombre}}</option>
                                            </select> -->
                                            <v-select :options="pastores" label="nombre" :reduce="nombre => nombre.nombre" v-model="pastor"></v-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 12%;">
                                            <b>Iglesia: </b>
                                        </td>
                                        <td v-if="!btn_editar" style="88%;">
                                            {{iglesia}}
                                        </td>
                                        <td v-else style="88%;">
                                            <!-- <select class="form-control form-control-sm" v-model="iglesia">
                                                <option value="">Selecciona</option>
                                                <option v-for="(item, index) in iglesias" :key="index" :value="item.iglesia">{{item.iglesia}}</option>
                                            </select> -->
                                            <v-select :options="iglesias" label="iglesia" :reduce="iglesia => iglesia.iglesia" v-model="iglesia"></v-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 12%;">
                                            <b>Docente: </b>
                                        </td>
                                        <td v-if="!btn_editar" style="88%;">
                                            {{docente}}
                                        </td>
                                        <td v-else style="88%;">
                                            <select class="form-control form-control-sm" v-model="docente">
                                                <option value="">Selecciona</option>
                                                <option v-for="(item, index) in docentes" :key="index" :value="item.nombre">{{item.nombre}}</option>
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </div>
        </div>

        <Pagos v-if="modal_pagos" :codex="codigo" :codigo_alumno="codigo" v-on:cerrar_modal="cerrar_modal_pagos" />
        <ModalInstrumentos v-if="modal_instrumentos" :codigo_alumno="codigo" v-on:cerrar_modal="cerrar_modalInstrumentos" />
    </div>
</template>

<script>


import {pregunta} from '@/components/functions/alertas'
import { mapActions, mapState } from 'vuex'

import Pagos from './Pagos.vue'
import ModalInstrumentos from './Modal_Lista_Insrumentos.vue'

export default {
    name: 'Perfil',
    props:['id'],
    components:{
        Pagos,
        ModalInstrumentos
    },
    computed:{
        ...mapState(['alumnos', 'paises', 'ciudades', 'cursos', 'regiones', 'pastores', 'iglesias', 'docentes'])
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    data() {
        return {
            btn_editar: false,
            modal_pagos: false,
            modal_instrumentos: false,
            codigo: '',
            nombre: '',
            telefono: '',
            direccion: '',
            correo: '',
            pais: '',
            ciudad: '',
            region: '',
            instrumento: '',
            pastor: '',
            iglesia: '',
            docente: ''
        }
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
        
            let a = this.alumnos.filter(alumno => alumno._id == this.id)
            this.codigo = a[0].codigo
            this.nombre = a[0].nombre
            this.telefono = a[0].telefono
            this.direccion = a[0].direccion
            this.correo = a[0].correo
            this.pais = a[0].pais
            this.ciudad = a[0].ciudad
            this.region = a[0].region
            this.instrumento = a[0].curso
            this.pastor = a[0].pastor
            this.iglesia = a[0].iglesia
            this.docente = a[0].docente
        },
        async borrar(){
             pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {

                    this.salir()

                    let data = {
                        api: 'alumnos',
                        id: this.id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.alumnos)
                }
            })
        },
        async deshabilitar(){
            pregunta({titulo: 'Seguro que deseas deshabilitar a este alumno?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, deshabilitar!'}, async (i) =>{

                if (i) {

                    this.salir()

                    let data = {
                        api: 'alumnos',
                        id: this.id,
                        formulario:{
                            activo: false
                        }
                    }

                    await this.updateData(data)
                    await this.wse(this.$store.state.rutas.alumnos)
                }
            })
        },
        async editar(){
            this.btn_editar = !this.btn_editar
        },
        abrir_modal_pagos(){
            this.modal_pagos = true
        },
        cerrar_modal_pagos(){
            this.modal_pagos = false
        },
        async actualizar(){
            let info = {
                api: 'alumnos',
                id: this.id,
                formulario: {
                    nombre: this.nombre,
                    telefono: this.telefono,
                    direccion: this.direccion,
                    correo: this.correo,
                    pais: this.pais,
                    ciudad: this.ciudad,
                    region: this.region,
                    curso: this.instrumento,
                    pastor: this.pastor,
                    iglesia: this.iglesia,
                    docente: this.docente
                }

            }

            await this.updateData(info)
            await this.wse(this.$store.state.rutas.alumnos)

            this.editar()
        },
        modalInstrumentos(){
            this.modal_instrumentos = true
        },
        cerrar_modalInstrumentos(){
            this.modal_instrumentos = false
        },
        ...mapActions(['deleteData', 'updateData', 'wse'])
    },
    mounted() {
        this.getDatos()
    },
}
</script>

<style scoped>
    .mod_para_perfil{
        width: 700px;
        height: 490px;
    }

    .modal_banner_perfil{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 10px;
        font-weight: bold;
    }

    .cuadro_fondo{
        width: 100%;
        height: calc(100% - 40px);
        padding: 10px;
    }

    .data_persona{
        width: 100%;
        height: auto;
        /* border: 1px solid black; */
        display: flex;
    }
        .foto_persona{
            width: 250px;
            height: 250px;;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.1);
        }
            .img_{
                width: 100%;
                height: 100%;
                border: 2px solid green;
            }
    .datos{
        width: calc(100% - 250px);
        height: 100%;
        padding-left: 10px;
    }
        .info_{
            border-top: 1px solid #ebebeb;
            border-bottom: 1px solid #ebebeb;
            width: 100%;
            height: 100%;
            padding-bottom: 23px;
        }
        .__cuerpo__{
            width: 100%;
            height: calc(100% - 250px);
           
        }
</style>