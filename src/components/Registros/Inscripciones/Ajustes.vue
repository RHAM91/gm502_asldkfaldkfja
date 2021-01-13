<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">

                <SeccionCursos />

                <SeccionDocumentes/>
                
                <SeccionUbicaciones />

                <SeccionPastores />

                <SeccionIglesias />

            </b-col>
        </b-row>

        

    </b-container>
</template>

<script>


import SeccionCursos from './Cursos/Seccion.vue'
import SeccionDocumentes from './Docentes/Seccion.vue'
import SeccionUbicaciones from './Ubicaciones/Seccion.vue'
import SeccionPastores from './Pastores/Seccion.vue'
import SeccionIglesias from './Iglesias/Seccion.vue'

export default {
    name: "Ajustes",
    components: {
        SeccionCursos,
        SeccionDocumentes,
        SeccionUbicaciones,
        SeccionPastores,
        SeccionIglesias
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style>
    .seccion_ajustes{
        width: 100%;
        height: auto;
        border-top: 1px solid rgba(0,0,0,.125);
        padding-top: 10px;
        padding-bottom: 10px;
        color: #303030;
    }
        .seccion_ajustes_titulo{
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
        }

            .btn_agregar{
                width: 100%;
                margin-bottom: 10px;
            }
</style>