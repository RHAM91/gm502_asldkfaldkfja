<template>
    <b-container fluid>
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="5" class="mt-3">
                    <label>Nombre</label>
                    <b-form-input type="text" v-model="nombre" size="sm" placeholder="Ej. Romario Torres"></b-form-input>
                </b-col>
                <b-col sm="6" class="mt-3">
                    <label>Correo</label>
                    <b-form-input type="email" v-model="correo" size="sm" placeholder="@"></b-form-input>
                </b-col>
                <b-col sm="1" class="mt-5">
                    <b-button type="submit" size="sm" variant="success"><i class="fas fa-save"></i></b-button>
                </b-col>

                <b-col sm="12" class="mt-4">
                    <table class="table table-sm table-bordered table-hover"  style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 40%;">
                                    Nombre
                                </th>
                                <th style="width: 40%;">
                                    Correo
                                </th>
                                <th style="width: 20%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in inventario_correos_destino" :key="index">
                                <td>
                                    {{item.nombre}}
                                </td>
                                <td>
                                    {{item.correo}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" size="sm" variant="primary" style="margin-right: 5px;"><i class="fas fa-edit"></i></b-button>
                                    <b-button type="button" size="sm" variant="danger" @click="borrar(item._id)"><i class="fas fa-trash-alt"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </form>
    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Destino',
    computed:{
        ...mapState(['inventario_correos_destino'])
    },
    data() {
        return {
            nombre: '',
            correo: ''
        }
    },
    methods: {
        async guardar(){
            let data = {
                api: 'correos',
                formulario: {
                    nombre: this.nombre,
                    correo: this.correo,
                    funcion: 'destino'
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.inventario_correos_destino)
        },
        async borrar(id){
            let data = {
                api: 'correos',
                id
            }

            await this.deleteData(data)
            await this.wse(this.$store.state.rutas.inventario_correos_destino)
        },
        ...mapActions(['insert_data', 'deleteData', 'wse'])
    },
}
</script>

<style>

</style>