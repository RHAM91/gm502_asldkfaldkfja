<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal mod_para_perfil">
            <div class="modal_banner modal_banner_perfil">
                {{codigo}}
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
                                        <table>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="fas fa-user"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{nombre}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="fas fa-phone"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{telefono}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{direccion}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="fas fa-at"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{correo}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="far fa-flag"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{pais}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="fas fa-city"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{ciudad}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="fas fa-compass"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{region}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 28%;text-align: center;">
                                                    <i class="fas fa-guitar"></i>
                                                </td>
                                                <td style="width: 70%;">
                                                    {{instrumento}}
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
    </div>
</template>

<script>

import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'


export default {
    name: 'Perfil',
    props:['id'],
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    data() {
        return {
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
            let info = await axios.get(`http://${IP}:${PUERTO}/api/alumnos/${this.id}`, this.$store.state.token)
            this.codigo = info.data.codigo
            this.nombre = info.data.nombre + " " + info.data.apellidos
            this.telefono = info.data.telefono
            this.direccion = info.data.direccion
            this.correo = info.data.correo
            this.pais = info.data.pais
            this.ciudad = info.data.ciudad
            this.region = info.data.region
            this.instrumento = info.data.curso
            this.pastor = info.data.pastor
            this.iglesia = '--- pendiente ---'
            this.docente = info.data.docente
        }
    },
    mounted() {
        this.getDatos()
    },
}
</script>

<style scoped>
    .mod_para_perfil{
        width: 700px;
        height: 600px;
    }

    .modal_banner_perfil{
        display: flex;
        align-items: center;
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
        height: 250px;
        /* border: 1px solid black; */
        display: flex;
    }
        .foto_persona{
            width: 250px;
            height: 100%;;
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
        }
        .__cuerpo__{
            width: 100%;
            height: calc(100% - 250px);
           
        }
</style>