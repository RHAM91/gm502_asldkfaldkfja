<template>
    <div id="padre">
        <div class="modal_banner style_reg_paises">
            <b-button type="button" size="sm" variant="outline-info" title="Cerrar" @click="cerrar_lista"><i class="fas fa-arrow-left"></i></b-button>
        </div>
        <b-container fluid>
            <b-row>
                <b-col sm="12" class="mt-3">
                    <table class="table table-sm table-bordered table-striped" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 65%;">
                                    Nombre
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    Código
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    Abreviatura
                                </th>
                                <th style="width: 15%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in paises" :key="index">
                                <td>
                                    {{item.pais}}
                                </td>
                                <td style="text-align: center;">
                                    {{item.codigo}}
                                </td>
                                <td style="text-align: center;">
                                    {{item.abreviatura}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" @click="editar(item._id)"><i class="fas fa-pen-square"></i></b-button>
                                    <b-button type="button" size="sm" variant="danger" @click="borrar(item._id)"><i class="fas fa-trash-alt"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </b-container>

        <Editar v-if="modal_editar" :id="id" v-on:cerrarModal="cerrar_edicion"/>
    </div>
    
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { pregunta } from '@/components/functions/alertas'
import Editar from './Editar.vue'
export default {
    name: 'Lista',
    components:{
        Editar
    },
    computed:{
        ...mapState(['paises'])
    },
    data() {
        return {
            modal_editar: false,
            id: ''
        }
    },
    methods: {
        cerrar_lista(){
            this.$emit('cerrar_lista', false)
        },
        borrar(id){
            
            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'paises',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.paises)
                }
            })
        },
        editar(id){
            this.modal_editar = true
            this.id = id
        },
        cerrar_edicion(){
            this.modal_editar = false
        },
        ...mapActions(['deleteData', 'wse'])
    },

}
</script>

<style scoped>
    .style_reg_paises{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: 5px;
    }
</style>