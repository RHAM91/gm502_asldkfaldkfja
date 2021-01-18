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
                                                    <b-form-input type="text" size="sm" v-model="pais"></b-form-input>
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
                                                    <b-form-input type="text" size="sm" v-model="ciudad"></b-form-input>
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
                                                    <b-form-input type="text" size="sm" v-model="region"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 10%;text-align: center;">
                                                    <i class="fas fa-guitar"></i>
                                                </td>
                                                <td v-if="!btn_editar" style="width: 90%;">
                                                    {{instrumento}}
                                                </td>
                                                <td v-else style="width: 90%;">
                                                    <b-form-input type="text" size="sm" v-model="instrumento"></b-form-input>
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
                                        <td style="88%;">
                                            {{pastor}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 12%;">
                                            <b>Iglesia: </b>
                                        </td>
                                        <td style="88%;">
                                            {{iglesia}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 12%;">
                                            <b>Docente: </b>
                                        </td>
                                        <td style="88%;">
                                            {{docente}}
                                        </td>
                                    </tr>
                                </table>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </div>
        </div>

        <Pagos v-if="modal_pagos" :codex="codigo" v-on:cerrar_modal="cerrar_modal_pagos" />

    </div>
</template>

<script>

import {pregunta} from '@/components/functions/alertas'
import { mapActions, mapState } from 'vuex'

import Pagos from './Pagos.vue'

export default {
    name: 'Perfil',
    props:['id'],
    components:{
        Pagos
    },
    computed:{
        ...mapState(['alumnos'])
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
                    curso: this.curso
                }

            }

            await this.updateData(info)
            await this.wse(this.$store.state.rutas.alumnos)

            this.editar()
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
        height: 480px;
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