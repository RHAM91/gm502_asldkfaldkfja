<template>
    <div class="contenedor_modal_pagos">
        <b-container fluid>
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h2>
                        Pagos
                    </h2>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <Pagosx />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import Pagosx from '../../Pagos/Pagos.vue'


export default {
    name: 'Pagos',
    components:{
        Pagosx
    },
    data() {
        return {
            
        }
    },
}
</script>

<style>
    .contenedor_modal_pagos{
        width: 100%;
        height: 100vh;
        background-color: white;
        position: fixed;
        top: 0;
        left: 0;
    }
</style>