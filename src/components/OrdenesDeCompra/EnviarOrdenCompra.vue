<template>
    <div class="contenedor_orden_compra">
        <div class="cuadro_orden_compra">
            <div class="cuadro_orden_banner">

            </div>
            <b-container fluid>
                <form @submit.prevent="guardarOrden">
                    <b-row>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Correo de origen</label>
                            <select class="form-control form-control-sm" v-model="origen">
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in inventario_correos" :key="index" :value="item._id">{{item.nombre}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" md="6" class="mt-3">
                            <label>Correo destino</label>
                            <select class="form-control form-control-sm" v-model="destino">
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in inventario_correos_destino" :key="index" :value="item._id">{{item.nombre}}</option>
                            </select>
                        </b-col>
                        
                        <b-col sm="12" class="mt-3">
                            <label>Generar PDF?</label>
                            <select class="form-control form-control-sm" v-model="pdf">
                                <option value="no">No</option>
                                <option value="si">Si</option>
                            </select>
                        </b-col>

                        <b-col sm="12" class="mt-3">
                            <label>Justificación</label>
                            <b-form-textarea
                                v-model="comentarios"
                                placeholder="Escribe algo..."
                                rows="3"
                                max-rows="6"
                                required
                            ></b-form-textarea>
                        </b-col>

                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="success">Enviar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import moment from 'moment'
export default {
    name: 'OrdenCompra',
    computed:{
        ...mapState(['inventario_correos', 'inventario_correos_destino', 'carrito'])
    },
    data() {
        return {
            origen: '',
            destino: '',
            pdf: 'no',
            comentarios: ''
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
            this.$emit('ocmodal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.salir()
            }
        },
        async guardarOrden(){

            let data = {
                api: 'ordenes',
                formulario: {
                    fecha: moment(Date.now()).format('YYYY-MM-DD'),
                    detalle: JSON.stringify(this.carrito),
                    comentarios: this.comentarios,
                    pdf: this.pdf,
                    corigen: this.origen,
                    cdestino: this.destino
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.inventario_ordenes)

            let cart = []

            this.set_carrito(cart)
            this.salir()

        },
        ...mapMutations(['set_carrito']),
        ...mapActions(['insert_data', 'wse'])
    },
}
</script>

<style>
    .contenedor_orden_compra{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
        .cuadro_orden_compra{
            width: 700px;
            height: 390px;
            background-color: white;
        }
            .cuadro_orden_banner{
                width: 100%;
                height: 35px;
                border-bottom: 1px solid #ebebeb;
            }
</style>