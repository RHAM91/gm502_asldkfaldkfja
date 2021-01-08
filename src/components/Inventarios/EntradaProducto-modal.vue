<template>
    <div class="contenedor_etrada_producto">
        <div class="formulario_entrada_producto">
            <div class="cabecera_formulario_entrada_producto">

            </div>
            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            {{idp.nombre}}
                        </h2>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <div class="_descripcion" style="text-align: center;">
                            Existencias
                        </div>
                    </b-col>
                    <b-col sm="12" md="6" class="mt-3">
                        <div class="_titulo">
                            Iglesia
                        </div>
                        <div class="existencia_">
                            {{idp.iglesia}}
                        </div>
                    </b-col>
                    <b-col sm="12" md="6" class="mt-3">
                        <div class="_titulo">
                            Oficina
                        </div>
                         <div class="existencia_2">
                            {{idp.oficina}}
                        </div>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <div class="__texto">
                            Última salida: {{u_fecha_out}}
                        </div>
                        <div class="__texto">
                            Última entrada: {{u_fecha_in}}
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'


export default {
    name: 'EntradaProducto',
    props:['idp'],
    data() {
        return {
            cantidad: '',
            producto: '',
            u_fecha_in: '',
            u_fecha_out: ''

        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    methods: {
        cerrar(){
            this.$emit('cerrarModal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        async consultaUltimoMovimiento(){
           let prod = await axios.get(`http://${IP}:${PUERTO}/api/movimientos/${this.idp.id}`, this.$store.state.token)
           this.producto = prod.data
           this.u_fecha_in = prod.data.in
           this.u_fecha_out = prod.data.out

        },
        ...mapActions(['wse', 'updateData'])
    },
    mounted() {
        this.consultaUltimoMovimiento()
    },
}
</script>

<style>
    .contenedor_etrada_producto{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .formulario_entrada_producto{
            width: 600px;
            height: 600px;
            background-color: white;
        }
            .cabecera_formulario_entrada_producto{
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #e5e5e5;
                display: flex;
                align-items: center;
                padding-left: 10px;
                font-weight: bold;
            }

        ._descripcion{
            font-size: 18px;
            color: #101115;
        }

        ._descripcion_s{
            margin-top: 10px;
        }

        ._titulo{
            
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            color: #47a8bd;
            border-bottom: 1px solid #5e5e5e;
        }

        .existencia_{
            width: 100%;
            height: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 70px;
            color: #ffad69;
            
        }

        .existencia_2{
            width: 100%;
            height: 110px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 70px;
            color: #e84855;
            
        }

        .__texto{
            width: 100%;
            font-size: 18px;
            color: #101115;
        }
</style>