<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-4">
                <b-form-file
                    v-model="file1"
                    :state="Boolean(file1)"
                    placeholder="Elige un archivo o arrastralo aquí "
                    drop-placeholder="Drop file here..."
                ></b-form-file>
                <div class="mt-3">Archivo seleccionado: {{ file1 ? file1.name : '' }}</div>
                
            </b-col>
            <b-col sm="12" class="mt-2">
                <b-button type="button" size="sm" @click="subirArchivos()" variant="success">Importar CSV</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "CargaDatos",
    data() {
        return {
            file1: null
        }
    },
    methods: {
        async subirArchivos(){
            let data = {
                api: 'archivos',
                evento: this.file1,
                campos:[ // siempre meter todo esto en un array para que funcione el envio de datos adicionales al servidor
                    {
                        campo: 'uid',
                        payload: 'hola mundo'
                    }
                ]
            }

            await this.sfile(data)
        },
        ...mapActions(['sfile'])
    },
}
</script>

<style>

</style>