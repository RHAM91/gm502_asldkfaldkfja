<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-2">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" v-model="search" id="clie" size="sm" placeholder="Buscar" autocomplete="off"></b-form-input>
                </b-input-group>
            </b-col>

            <b-col sm="12" class="mt-3">

                <b-table class="table-bordered table-striped" :items="r_alumnos" :fields="fields" :per-page="perPage" :current-page="currentPage" small style="font-size: 13px;">
					
                    <template v-slot:cell(btn) = 'row'>
                        <div style="display: flex; justify-content:center;align-items:center;height: 40px;">
                            <b-button type="button" size="sm" title="Ficha alumno" variant="warning" @click="abrir_modal_ficha(row.item._id)"><i class="fas fa-info-circle"></i></b-button>
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

        <Registro v-if="modal_registro" v-on:cerrar_modal="cerrar_modal_registro" />
        <Perfil v-if="modal_perfil" :id="id" v-on:cerrar_modal="cerrar_modal_ficha" />

        <div class="btn_flotante_add" @click="abrir_modal_registro">
            <i class="fas fa-plus"></i>
        </div>
    </b-container>
</template>

<script>

import Registro from './Alumno/Registro.vue'
import Perfil from './Alumno/Perfil.vue'

import { mapGetters, mapState } from 'vuex'
export default {
    name: 'ListaAlumnos',
    computed:{
        ...mapState(['alumnos']),
        search:{
            get(){
                return this.$store.state.filtros.filtro_almunos
            },
            set(val){
                this.$store.commit('set_filtro_alumnos', val.toLowerCase())
            }
        },
        rows(){
            return this.r_alumnos.length
        },
        ...mapGetters({
            r_alumnos: 'g_filtro_alumnos'
        })
    },
    components:{
        Registro,
        Perfil
    },
    data() {
        return {
            modal_registro: false,
            modal_perfil: false,
            id: '',
            perPage: 15,
			currentPage: 1,
            fields: [
                {
                    key: 'codigo',
                    thStyle: 'width: 8%;',
                },
                {
                    key: 'nombre',
                    thStyle: 'width: 20%;'
                },
                {
                    key: 'curso',
                    thStyle: 'width: 14%;'
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
        abrir_modal_registro(){
            this.modal_registro = true
        },
        cerrar_modal_registro(){
            this.modal_registro = false
        },
        abrir_modal_ficha(id){
            this.modal_perfil = true
            this.id = id
        },
        cerrar_modal_ficha(){
            this.modal_perfil = false
        }
    },
    mounted() {
        document.getElementById('clie').focus()
    },
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
            width: 120px;
            height: 40px;
            background-color: #88AD28;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }

        .cuadro_estado_insolvente{
            width: 120px;
            height: 40px;
            background-color: red;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }

        .cuadro_estado_inicial{
            width: 120px;
            height: 40px;
            background-color: #7cc6fe;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }
</style>