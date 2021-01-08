<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <h1>
                    Categorias
                </h1>
            </b-col>
            <b-col sm="10" class="mt-3">
                <b-form-input type="text" id="input_categoria" v-model="categoria" size="sm"></b-form-input>
            </b-col>
            <b-col sm="2" class="mt-3">
                <b-button type="button" size="sm" variant="success" @click="guardarDatos">Guardar</b-button>
            </b-col>
            <b-col sm="12" class="mt-4">
                <div class="contenedor_tabla">
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
                            <tr v-for="(item, index) in inventario_categorias" :key="index">
                                <td>
                                    {{item.categoria}}
                                </td>
                                <td>
                                    <b-button type="button" size="sm" style="margin-right: 5px;" variant="primary" @click="editar(item._id)"><i class="fas fa-pen"></i></b-button>

                                    <b-button type="button" size="sm" variant="danger" @click="borrar(item._id)"><i class="fas fa-trash"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { minix, pregunta, texto } from '@/components/functions/alertas'

export default {
    name: "Categorias",
    computed: {
        ...mapState(['inventario_categorias'])
    },
    data() {
        return {
            categoria: '',
            tipo_inventario: 'Sistemas'
        }
    },
    methods: {
        async guardarDatos(){
            let data = {
                api: "categorias",
                formulario: {
                    categoria: this.categoria,
                    tipo_inventario: this.tipo_inventario
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.inventario_categorias)

            this.categoria = ''
        },
        editar(id){
            texto(id, async (e)=>{

                let data = {
                    api: 'categorias',
                    id,
                    formulario: {
                        categoria: e
                    }
                }

                await this.updateData(data)
                await this.wse(this.$store.state.rutas.inventario_categorias)
            })
        },
        async borrar(id){
             pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'categorias',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.inventario_categorias)
                }
            })
        },
        ...mapActions(['insert_data', 'deleteData', 'updateData', 'wse'])
    },
    mounted() {
        document.getElementById('input_categoria').focus()
    },
    
}
</script>

<style>
    .modi{
        font-size: 13px;
    }

    .contenedor_tabla{
        width: 100%;
        height: 350px;
        overflow: auto;
    }
</style>