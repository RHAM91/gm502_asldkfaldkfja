<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <b-card-group deck>
                    <b-card bg-variant="primary" text-variant="white" header="Inscritos" class="text-center">
                        <b-card-text>
                            <h1>
                                {{cantidad_alumnos}}
                            </h1>
                        </b-card-text>
                    </b-card>

                    <b-card bg-variant="success" text-variant="white" header="Solventes" class="text-center">
                        <b-card-text>
                            <h1>
                                {{cantidad_solventes}}
                            </h1>
                        </b-card-text>
                    </b-card>

                    <b-card bg-variant="danger" text-variant="white" header="Insolventes" class="text-center">
                        <b-card-text>
                            <h1>
                                {{cantidad_insolventes}}
                            </h1>
                        </b-card-text>
                    </b-card>

                    <b-card bg-variant="info" text-variant="white" header="Inicial" class="text-center">
                        <b-card-text>
                            <h1>
                                {{cantidad_inicial}}
                            </h1>
                        </b-card-text>
                    </b-card>
                    <b-card bg-variant="warning" text-variant="black" header="Desactivados" class="text-center">
                        <b-card-text>
                            <h1>
                                {{cantidad_desactivados}}
                            </h1>
                        </b-card-text>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>

        <Pacman />

    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Pacman from '@/components/varios/_Loading.vue'

export default {
    name: 'Estadisticas',
    computed:{
        ...mapState(['alumnos', 'data_res'])
    },
    components:{
        Pacman
    },
    data() {
        return {
            cantidad_alumnos: 0,
            cantidad_solventes: 0,
            cantidad_insolventes: 0,
            cantidad_inhabilitados: 0,
            cantidad_inicial: 0,
            cantidad_desactivados: 0
        }
    },
    methods: {
        conteo(){
            let inscritos = this.alumnos.length
            this.cantidad_alumnos = inscritos

            let solventes = this.alumnos.filter(solvente => solvente.estado == 'Solvente')
            this.cantidad_solventes = solventes.length

            let insolventes = this.alumnos.filter(solvente => solvente.estado == 'Insolvente')
            this.cantidad_insolventes = insolventes.length

            let inicial = this.alumnos.filter(solvente => solvente.estado == 'Inicial')
            this.cantidad_inicial = inicial.length
        },
        async conteo_desactivados(){
            let info = {
                api: 'alumnos/desactivados',
                position: 0,
                formulario: {
                    info: 0 // realmente no estoy viendo nada, porque es una consulta para saber cuandos desactivados hay
                }
            }

            await this.response_data(info)
            this.cantidad_desactivados = this.data_res[0].conteo
        },
        ...mapActions(['response_data'])
    },
    mounted() {
        this.conteo()
        this.conteo_desactivados()
    }
}
</script>

<style>

</style>