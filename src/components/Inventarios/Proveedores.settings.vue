<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <h1>
                    Proveedores
                </h1>
            </b-col>
            <b-col sm="10" class="mt-2">
                <b-form-input type="text" id="campoProveedores" v-model="proveedor" size="sm"></b-form-input>
            </b-col>
            <b-col sm="2" class="mt-2">
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
                        <tr v-for="(item, index) in inventario_proveedores" :key="index">
                            <td>
                                {{item.proveedor}}
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

import { mapState, mapActions } from 'vuex'
import { minix, pregunta, texto } from '@/components/functions/alertas'


export default {
    name: "Proveedores",
    computed: {
        ...mapState(['inventario_proveedores'])
    },
    data() {
        return {
            proveedor:''
        }   
    },
    methods: {
        async guardarDatos(){
            let data = {
                api: 'proveedores',
                formulario: {
                    proveedor: this.proveedor
                }
            }


            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.inventario_proveedores)


            this.proveedor = ''
        },
        async borrar(id){

            pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'proveedores',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.inventario_proveedores)
                }
            })

        },

        editar(id){
            texto(id, async (e)=>{

                let data = {
                    api: 'proveedores',
                    id,
                    formulario: {
                        proveedor: e
                    }
                }

                await this.updateData(data)
                await this.wse(this.$store.state.rutas.inventario_proveedores)
            })

        },
        ...mapActions(['insert_data', 'wse', 'deleteData', 'updateData'])
    },
    mounted() {
        document.getElementById('campoProveedores').focus()
    },
}
</script>

<style>

</style>