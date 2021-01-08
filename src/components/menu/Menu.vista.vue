<template>
    <div class="sidebar">
        <header>
            <div class="icono">
                <img src="@/assets/cloud.png" style="width: 100%;" alt="">
            </div>
            Data Center
        </header>
       
        <ul id="accordion" class="accordion">
            <li>
                <div class="link"><i class="fas fa-boxes"></i>Inventarios <i class="fa fa-chevron-down"></i></div>
                <ul class="submenu">
                    <li><a href="#" @click="setmodulo('inventario-sistemas')">Registros</a></li>
                    <!-- <li><a href="#">Macbook Air</a></li> -->
                </ul>
            </li>
            <!-- <li>
                <div class="link"><i class="fas fa-file-alt"></i>Orden de trabajo <i class="fa fa-chevron-down"></i></div>
                <ul class="submenu">
                    <li><a href="#" @click="setmodulo('odt')">ODT</a></li>
                    <li><a href="#" @click="setmodulo('configodt')">Configuración</a></li>
                </ul>
            </li> -->
            <li>
                <div class="link" @click="salir"><i class="fas fa-sign-out-alt"></i>Salir</div>
            </li>
        </ul>
        <div v-if="update == false" class="version" id="version" @click="show = !show">
            <i class="fas fa-code-branch"></i>
        </div>
        <div v-else class="btn_update" @click="pushversion">
            Actualizar
        </div>
        <b-popover :show.sync="show" target="version" title="Versión">
            <strong>{{version}}</strong>
        </b-popover>
    </div>
</template>

<script>

import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { mapState } from 'vuex'
import { pregunta } from '../functions/alertas'

import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer

const $ = require('jquery')
window.$ = $

export default {
    name: "Menu",
    data() {
        return {
            version: '',
            show: false,
            update: false // debe estar en false
        }
    },
    computed: {
        ...mapState(['permisos'])
    },
    methods: {
        setmodulo(modulo){
            this.$emit('establecermodulo', modulo)
        },
        salir(){

            pregunta({titulo: 'Seguro que deseas salir?', texto: 'Está a punto de salir del sistema', afirmacion: 'Si, salir!'}, async (i) =>{

                if (i) {
                    localStorage.removeItem('kat')
                    this.$router.replace('Login')
                }
            })
        },
        getversion(){
            ipcRenderer.send('app_version');

            ipcRenderer.on('app_version', (event, arg) => {
                ipcRenderer.removeAllListeners('app_version');
                this.version = arg.version
            });

            // Evento para mostrar el boton de actualizacion en el sistema

            ipcRenderer.on('actualizacion', (event, message)=>{
                this.update = message
            })
        },
        pushversion(){ // funcion para para enviar la orden de cerrar y aplicar actualizacion al proceso principal
            ipcRenderer.send('ok_update')
        }
    },
    mounted() {


        $(function() {
            var Accordion = function(el, multiple) {
                this.el = el || {};
                this.multiple = multiple || false;

                var links = this.el.find('.link');

                links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
            }

            Accordion.prototype.dropdown = function(e) {
                var $el = e.data.el;
                window.$this = $(this),
                window.$next = window.$this.next();

                window.$next.slideToggle();
                window.$this.parent().toggleClass('open');

                if (!e.data.multiple) {
                    $el.find('.submenu').not(window.$next).slideUp().parent().removeClass('open');
                };
            }

            var accordion = new Accordion($('#accordion'), false);
        });

        this.getversion()
    },
}






</script>

<style scoped>
    *{
        list-style: none !important;
        text-decoration: none !important;
    }

    /* a{
        text-decoration: none !important;
    } */

    .icono{
        width: 30px;
        height: 30px;
        margin-right: 15px;
        margin-left: 30px;
        line-height: 40px;
    }

    .sidebar header{
        padding-left: 15px;
        font-size: 20px;
        font-weight: 700;
        color: white;
        display: flex;
        line-height: 48px;
        user-select: none;
        border-bottom: 1px solid rgba(255, 255, 255, .1);
    }


    /* Estilos para menu acordeon */

    ul{
        list-style-type: none;
        padding: 0;
    }

    a{
        color: #b63b4d;
        text-decoration: none !important;
    }

    .accordion{
        width: 100%;
        max-width: 250px;
        margin: 0px auto 20px;
        background: rgb(6, 30, 51);
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 0px;
        
    }

    .accordion .link {
        cursor: pointer;
        display: block;
        padding: 15px 15px 15px 42px;
        color: white;
        font-size: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, .1);
        position: relative;
        -webkit-transition: all 0.4s ease;
        -o-transition: all 0.4s ease;
        transition: all 0.4s ease
    }
    
    .accordion li:last-child .link {
        border-bottom: 0
    }
    
    .accordion li i {
        position: absolute;
        top: 18px;
        left: 12px;
        font-size: 15px;
        /* color: #595959; */
        color: #fff;
        -webkit-transition: all 0.4s ease;
        -o-transition: all 0.4s ease;
        transition: all 0.4s ease
    }

    .accordion li i.fa-chevron-down {
        right: 12px;
        left: auto;
        font-size: 16px
    }

    .accordion li.open .link {
        color: #29B6F6
    }

    .accordion li.open i {
        color: #29B6F6
    }

    .accordion li.open i.fa-chevron-down {
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg)
    }

    .submenu {
        display: none;
        background: #2c3e50;
        font-size: 14px
    }

    .submenu li {
        border-bottom: 1px solid #4b4a5e
    }

    .submenu a {
        display: block;
        text-decoration: none;
        color: #d9d9d9;
        padding: 12px;
        padding-left: 42px;
        -webkit-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        transition: all 0.25s ease
    }

    .submenu a:hover {
        background: #b63b4d;
        color: #FFF
    }

    .version{
        border-radius: 50%;
        width: 35px;
        height: 35px;
        position: absolute;
        bottom: 5px;
        left: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .4s ease;
        cursor: pointer;
    }
        .version:hover{
            background-color: white;
            color: black;
        }

        .version:active{
            background-color: orange;
        }

    .btn_update{
        width: 250px;
        height: 40px;
        background-color: #0081af; 
        position: absolute;
        bottom: 0;
        left: 0;
        color: white;
        font-weight: bold;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: .4s;
    }
        .btn_update:hover{
            background-color: orangered;
            font-size: 20px;
        }
</style>