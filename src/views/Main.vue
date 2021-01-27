<template>
    <div class="contenedor-principal">

            <aside class="aside" id="aside">
                <!-- Estoy ejecutando directamente la funcion ToggleMenu para cerrar el menu -->
                <Menu 
                    v-on:establecermodulo="setmodulo"
                />
            </aside>


        <div class="lienzo" id="lienzo">
            <div class="cuerpo" id="cuerpo">
                <!-- AQUI VAN LOS COMPONENTES -->
               

                <div v-if="modulo == 'registros'">
                    <RegistrosTabs v-on:OpenMenu="ToggleMenu" />
                </div>

                <div v-if="modulo == 'pagos'">
                    <PagosTabs v-on:OpenMenu="ToggleMenu" />
                </div>

                <div v-if="modulo == 'estadisticas'">
                    <EstadisticasTabs v-on:OpenMenu="ToggleMenu" />
                </div>

            </div> 

        </div>

        <Loading />
        <Ghost :conexion="online" />

    </div>
</template>

<script>

// COMPONENTES


// MODULOS
import RegistrosTabs from '@/components/Registros/Tabs.vue'
import PagosTabs from '@/components/Registros/Pagos/Tabs.vue'
import EstadisticasTabs from '@/components/Registros/Estadisticas/Tabs.vue'

//--> GIF ANIMADO PARA LAS DESCARGAS

import Loading from '@/components/varios/Loading.vue'
import Ghost from '@/components/varios/Offline.vue'

// MODULO PRINCIPAL

import Menu from '@/components/menu/Menu.vista.vue'

import axios from 'axios'
import { IP, PUERTO } from '../config/parametros'
import { mapActions } from 'vuex'
import { VueOnline } from 'vue-online-2'

export default {
    name: 'Main',
    components:{
        Menu,
        Loading,
        RegistrosTabs,
        PagosTabs,
        EstadisticasTabs,
        Ghost
    },
    computed:{
        online(){
            return VueOnline.isOnline
        }
    },
    data(){
        return{
            conexion: null,
            mostrarMenu: true,
            modulo: '',
        }
    },
    methods: {
        consulta: async function(){

            let info = await axios.get(`http://${IP}:${PUERTO}/api/auth/login`, this.$store.state.token)
            this.conexion = info.data.alive

            if (this.conexion == false) {
                this.$cron.stop('consulta')
                localStorage.removeItem('kat')
                this.$router.replace('login')
            }

        },
        setmodulo(modulo){

            this.modulo = modulo
        },
        ToggleMenu(valor){ // el parametro "valor" no tiene ninguna funcion de momento
            
            this.mostrarMenu = !this.mostrarMenu

             if (this.mostrarMenu) {
                document.getElementById('aside').classList.remove('newSize')
                document.getElementById('lienzo').classList.remove('lienzo-100')
            }else{
                document.getElementById('aside').classList.add('newSize')
                document.getElementById('lienzo').classList.add('lienzo-100')
            }
            
        },
        menu_fijo: function(){

            document.getElementById('cuerpo').onscroll = function (){

                var scroll = document.getElementById('cuerpo').scrollTop || document.getElementById('cuerpo').scrollTop;
                
                if(scroll >= 15){                    
                    document.getElementById('navb').classList.add('fijar')
                }else{
                    document.getElementById('navb').classList.remove('fijar')
                }
            }
        },
        inciando_conexion(){
            const { socket } = require('../config/sockets_config')
            this.ws(socket)

            // socket.on('reconnect', ()=>{
            //     console.log('De nuevo en linea')
            // })

            // socket.on('disconnect', (reason) =>{
            //     console.log(`Puerto desconectado razòn: ${reason}`)
            // })
        },
        ...mapActions(['ws'])
         
    },
    mounted() {
        // CONEXION CON EL SERVIDOR PUSH PARA ESCUCHAR ACTUALIZACIONES

        this.inciando_conexion()

        // TERMINA FUNCION -->


        this.menu_fijo()
        
        this.$store.dispatch('getPermisos', {
            token: this.$store.state.token,
            rutas:[
                
            ]
        })
        
    },
    cron:{
        time: 120000,
        method: 'consulta'
    },
    watch:{
        online(estado){
            if (estado) {
                // console.log('online')
                this.inciando_conexion()
            }else{
                // console.log('offline')
            }
        }
    }
}

</script>

<style>


    .contenedor-principal{
        width: 100%;
        height: 100vh;
        display: flex;
        
    }

        .aside{
            width: 250px;
            height: 100%;
            background-color: rgb(6, 30, 51);
            transition: .4s;
            
        }

        .newSize{
            transform: translateX(-250px);
            width: 0px;
            transition: .5s ;
            
        }

        .lienzo{
            width: calc(100% - 250px);
            height: 100%;
            position: relative;
            transition: .4s ;
        }

        .lienzo-100{
            width: 100%;
            transition: .4s ;
        }


/* ESTILOS PARA MODIFICACION */

.fijar{
    z-index: 999;
    box-shadow: 0px 1px 2px 0px rgba(60,64,67,.3), 0px 1px 3px 1px rgba(60,64,67,.15);
}


    /* ESTILOS DEL COMPONENTE DE TEMPLATE.VISTA.VUE */

            

            .cuerpo{
                width: 100%;
                height: 100%;
                overflow: auto;
                position: relative;
            }

            

/* ESTILOS PARA LA BARRA DE SCROLL */

::-webkit-scrollbar{
    width: 8px;
    background-color: #F5F5F5;
}
::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb{
    /* background-color: #F90; // naranja  */ 
    background-color: #29B6F6;
    background-image: -webkit-linear-gradient(90deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
}

    
</style>