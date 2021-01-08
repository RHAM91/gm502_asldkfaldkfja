<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <h1>
                    Ubiaciones
                </h1>
            </b-col>
            <b-col sm="10" class="mt-3">
                <b-form-input type="text" id="campoUbicaciones" v-model="ubicacion" size="sm"></b-form-input>
            </b-col>
            <b-col sm="2" class="mt-3">
                <b-button type="button" size="sm" variant="success" @click="guardarDatos()">Guardar</b-button>
            </b-col>
            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-bordered table-striped modi">
                    <thead>
                        <tr>
                            <th style="width: 70%;">
                                Categoría
                            </th>

                            <th style="width: 30%;">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in inventario_ubicaciones" :key="index">
                            <td>
                                {{item.ubicacion}}
                            </td>
                            <td>
                                <b-button type="button" size="sm" variant="primary" title="Editar" @click="editar(item._id)" style="margin-right: 5px;">
                                    <i class="fas fa-pen"></i>
                                </b-button>

                                <b-button type="button" size="sm" variant="danger" @click="borrar(item._id)" title="Borrar" >
                                    <i class="fas fa-trash"></i>
                                </b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import { minix, pregunta, texto } from '@/components/functions/alertas'

export default {
    name: 'Ubicaciones',
    computed: {
        ...mapState(['inventario_ubicaciones'])
    },
    data() {
        return {
            ubicacion: ""
        }
    },
    methods: {
        async guardarDatos(){
            let data = {
                api: 'ubicaciones',
                formulario: {
                    ubicacion: this.ubicacion
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.inventario_ubicaciones)


            this.ubicacion = ''

        },
        editar(id){
            texto(id, async (e)=>{

                let data = {
                    api: 'ubicaciones',
                    id,
                    formulario: {
                        ubicacion: e
                    }
                }

                await this.updateData(data)
                await this.wse(this.$store.state.rutas.inventario_ubicaciones)
            })
        },
        async borrar(id){
            pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'ubicaciones',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.inventario_ubicaciones)
                }
            })
        },
        ...mapActions(['insert_data', 'wse', 'updateData', 'deleteData'])
    },
    mounted() {
        document.getElementById('campoUbicaciones').focus()
    },
}
</script>

<style>

</style>