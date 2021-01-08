<template>
    <div class="contenedor_detalle">
        <div class="cuerpo_detalle">
            <div class="barra_top">

            </div>
            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            Pedido #{{noPedido}}
                        </h2>
                        <p>
                            Descripción
                        </p>
                        <p>
                            {{descripcion}}
                        </p>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-hover table-bordered" style="font-size: 12px;">
                            <thead>
                                <tr>
                                    <th style="width: 50%;">
                                        Articulo
                                    </th>
                                    <th  style="width: 20%;text-align: center;">
                                        Estado
                                    </th>
                                    <th  style="width: 20%">
                                        fecha
                                    </th>
                                    <th  style="width: 10%;text-align: center;">
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in pedidos" :key="index">
                                    <td>
                                        {{item.articulo}}
                                    </td>
                                    <td :class="[item.completo == true ? 'verde': 'rojo']">
                                        {{item.completo | conversion}}
                                    </td>
                                    <td>
                                        {{item.fecha}}
                                    </td>
                                    <td style="text-align: center;">
                                        <b-button type="button" variant="success" size="sm" @click="modificar(index)"><i class="far fa-thumbs-up"></i></b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
export default {
    name: 'Detalle',
    props:['idpedido'],
    computed:{
        ...mapState(['inventario_pedidos'])
    },
    filters:{
        conversion: function(value){
            if (value) {
                return "Completo"
            }else{
                return "Incompleto"
            }
        }
    },
    data() {
        return {
            noPedido: '',
            descripcion: '',
            pedidos: [],
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
        buscarPedido(){
            this.inventario_pedidos.forEach(e => {
                if (e._id == this.idpedido) {
                    this.noPedido = e.nopedido
                    this.descripcion = e.descripcion
                    this.pedidos = JSON.parse(e.articulo)
                }
            });
        },
        async modificar(id){
            let data = {
                articulo: this.pedidos[id].articulo,
                completo: true,
                fecha: moment(Date.now()).format('YYYY-MM-DD')
            }

            this.pedidos.splice(id, 1, data)

            let newinfo = {
                api: 'pedidos',
                id: this.idpedido,
                formulario: {
                    articulo: JSON.stringify(this.pedidos)
                }
            }

            await this.updateData(newinfo)
            await this.wse(this.$store.state.rutas.inventario_pedidos)

        },
        ...mapActions(['updateData','wse'])
    },
    mounted() {
       
        this.buscarPedido()
    },
}
</script>

<style>
    .contenedor_detalle{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .cuerpo_detalle{
            width: 700px;
            height: 90%;
            background-color:white;
        }
            .barra_top{
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #eeeeee;
            }

        .rojo{
            background-color: #F70F0F;
            color: white;
            font-weight: bold;
            text-align: center;
        }
         .verde{
            background-color:#3498DB;
            color: white;
            font-weight: bold;
            text-align: center;
        }
</style>