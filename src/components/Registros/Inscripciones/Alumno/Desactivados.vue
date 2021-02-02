<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" md="10" class="mt-2">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" v-model="campobusqueda" id="clie" size="sm" placeholder="Buscar" @keydown.enter="getDatosxNombre" autocomplete="off"></b-form-input>
                </b-input-group>
            </b-col>
            
            <b-col sm="12" md="2" class="mt-2">
                <b-button type="button" size="sm" block variant="success" @click="getDatosxNombre">Consultar</b-button>
            </b-col>

            <b-col sm="12" class="mt-3">

                <b-table class="table-bordered table-striped" :items="datos_alumno" :fields="fields" :per-page="perPage" :current-page="currentPage" small style="font-size: 13px;">
                    <template v-slot:cell(no) = 'conta'>
                        <div>
                            {{conta.index + 1}}
                        </div>
					</template>
                    <template v-slot:cell(btn) = 'row'>
                        <div style="display: flex; justify-content:center;align-items:center;height: 40px;">
                            <b-button type="button" size="sm" title="Reactivar" variant="info" @click="reactivar(row.item._id)"><i class="fas fa-sync"></i></b-button>
                        </div>
					</template>
                    <template v-slot:cell(estado) = 'esta'>
                        <div :class="esta.item.estado == 'Inicial' ? 'cuadro_estado_inicial': esta.item.estado == 'Solvente' ? 'cuadro_estado_solvente': 'cuadro_estado_insolvente'">
                            {{esta.item.estado}}
                        </div>
					</template>
				</b-table>


					<b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
					></b-pagination>

                
            </b-col>
        </b-row>

        <Pacman />

        <!-- <div class="btn_flotante_add" @click="abrir_modal_registro">
            <i class="fas fa-plus"></i>
        </div> -->
    </b-container>
</template>

<script>

import Pacman from '@/components/varios/_Loading.vue'

import { mapActions, mapState } from 'vuex'
import {pregunta} from '@/components/functions/alertas'


export default {
    name: 'ListaDesactivados',
    computed:{
        ...mapState(['alumnos', 'data_res']),
        rows(){
            return this.datos_alumno.length
        }
    },
    components:{
        Pacman
    },
    data() {
        return {
            datos_alumno:[],
            id: '',
            perPage: 15,
            currentPage: 1,
            campobusqueda: '',
            fields: [
                {
                    key: 'no',
                    thStyle: 'width: 3%;',
                },
                {
                    key: 'codigo',
                    thStyle: 'width: 8%;',
                },
                {
                    key: 'nombre',
                    thStyle: 'width: 21%;'
                },
                {
                    key: 'curso',
                    thStyle: 'width: 10%;'
                },
                {
                    key: 'nivel',
                    thStyle: 'width: 5%;'
                },
                {
                    key: 'telefono',
                    thStyle: 'width: 10%;'
                },
                {
                    key: 'iglesia',
                    thStyle: 'width: 15%;text-align:center;'
                },
                {
                    key: 'pastor',
                    thStyle: 'width: 10%;text-align:center;'
                },
                {
                    key: 'estado',
                    thStyle: 'width: 10%;text-align:center;'
                },
                {
                    key: 'btn',
                    thStyle: 'width: 8%;text-align:center;'
                }
            ]
        }
    },
    methods: {
        async getDatos(){
            let info = {
                api: 'alumnos/estado',
                position: 0,
                formulario: {
                    activo: false
                }
            }

            await this.response_data(info)
            this.datos_alumno = this.data_res[0]

        },
        async getDatosxNombre(){
            let info = {
                api: 'alumnos/filtro',
                position: 1,
                formulario:{
                    nombre: this.campobusqueda
                }
            }

            await this.response_data(info)
            this.datos_alumno = this.data_res[1]
        },
        async reactivar(id){

            pregunta({titulo: 'Seguro que deseas reactivarl@?', texto: 'A partir de este momento, se reanudan las cuotas para este alumno', afirmacion: 'Si, activarlo!'}, async (i) =>{

                if (i) {

                    let data = {
                        api: 'alumnos',
                        id,
                        formulario:{
                            activo: true
                        }
                    }

                    await this.updateData(data)
                    await this.wse(this.$store.state.rutas.alumnos)
                    await this.getDatos()
                }
            })
        },
        ...mapActions(['response_data', 'updateData', 'wse'])
    },
    mounted() {
        this.getDatos()
    },
    watch:{
        campobusqueda: function(val){
            if (val.length == 0) {
                this.getDatos()
            }
        }
    }
}
</script>

<style>
    .btn_flotante_add{
        position: fixed;
        bottom: 15px;
        right: 15px;
        color: white;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #392f5a;
        transition: .4s ease-in-out;
        cursor: pointer;
    }

        .btn_flotante_add:hover{
            background-color: #ff8811;
        }

        .cuadro_estado_solvente{
            width: 100%;
            height: 40px;
            background-color: #88AD28;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }

        .cuadro_estado_insolvente{
            width: 100%;
            height: 40px;
            background-color: red;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }

        .cuadro_estado_inicial{
            width: 100%;
            height: 40px;
            background-color: #7cc6fe;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }
</style>