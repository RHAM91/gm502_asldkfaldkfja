<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner">
                
            </div>
            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <b-form-input type="text" v-model="buscar_alumno" size="sm" id="campo_busqueda_alumno" placeholder="Escribe un nombre y presiona enter"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <div class="contenedor_tabla">
                            <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                                <thead>
                                    <tr>
                                        <th style="width: 10%;">
                                            Código
                                        </th>
                                        <th style="width: 60%;">
                                            Nombre
                                        </th>
                                        <th style="width: 20%;text-align: center;">
                                            Iglesia
                                        </th>
                                        <th style="text-align: center;width: 10%;">
                                            ...
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in r_alumnos" :key="index">
                                        <td>
                                            {{item.codigo}}
                                        </td>
                                        <td>
                                            {{item.nombre}}
                                        </td>
                                        <td style="text-align: center;">
                                            {{item.iglesia}}
                                        </td>
                                        <td style="text-align: center;">
                                            <b-button type="button" variant="warning" size="sm" @click="seleccionar_alumno(item.codigo)"><i class="fas fa-check-circle"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'BuscarAlumno',
    computed:{
        ...mapState(['alumnos']),
        buscar_alumno:{
            get(){
                return this.$store.state.filtros.filtro_almunos
            },
            set(val){
                this.$store.commit('set_filtro_alumnos', val.toLowerCase())
            }
        },
        ...mapGetters({
            r_alumnos: 'g_filtro_busqueda_codigo_alumno'
        })
    },
    data() {
        return {
            
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
            this.$emit('cerrar_modal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.salir()
            }
        },
        seleccionar_alumno(codigo){
            this.$emit('codigo_alumno', codigo)
            this.salir()
        }
    },
    mounted() {
        document.getElementById('campo_busqueda_alumno').focus()
    },
}
</script>

<style scoped>
    .contenedor_tabla{
        width: 100%;
        height: 380px;
        overflow: auto;
    }
</style>