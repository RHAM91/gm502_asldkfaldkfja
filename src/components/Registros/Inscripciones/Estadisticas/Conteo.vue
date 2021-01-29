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
                </b-card-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Estadisticas',
    computed:{
        ...mapState(['alumnos'])
    },
    data() {
        return {
            cantidad_alumnos: 0,
            cantidad_solventes: 0,
            cantidad_insolventes: 0,
            cantidad_inhabilitados: 0,
            cantidad_inicial: 0
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
        }
    },
    mounted() {
        this.conteo()
    }
}
</script>

<style>

</style>