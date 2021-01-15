<template>
    <div class="contenedor_pagos">
        <div class="banner_pagos">
            <b-button type="button" variant="outline-info" @click="cerrar" size="sm">Cerrar</b-button>
        </div>
        <b-container fluid>
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Pagos
                    </h3>
                </b-col>
                <b-col sm="12" class="mt-3">
                    <div class="meses">
                        <div class="mes">
                            Ene
                        </div>
                        <div class="mes">
                            Feb
                        </div>
                        <div class="mes">
                            Mar
                        </div>
                        <div class="mes">
                            Abr
                        </div>
                        <div class="mes">
                            May
                        </div>  
                        <div class="mes">
                            Jun
                        </div>
                        <div class="mes">
                            Jul
                        </div>
                        <div class="mes">
                            Ago
                        </div>
                        <div class="mes">
                            Sep
                        </div>
                        <div class="mes">
                            Oct
                        </div>
                        <div class="mes">
                            Nov
                        </div>
                        <div class="mes">
                            Dic
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
export default {
    name: 'Pagos',
    props:['idx'],
    data() {
        return {

        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrar_modal', false)
        }
    },
}
</script>

<style>
    .contenedor_pagos{
        width: 100%;
        height: 100vh;
        background-color: white;
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
    }
        .banner_pagos{
            width: 100%;
            height: 45px;
            border-bottom: 1px solid #ebebeb;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            padding-right: 10px;
        }

        .meses{
            width: 100%;
            height: 100px;
            border: 1px solid black;
            display: flex;
        }
            .mes{
                width: 8.33%;
                height: 100%;
                border-right: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                font-weight: bold;
            }

            .pendiente{
                color: #ebebeb;
            }

            .pagado{
                color: green;
            }

            .nopagado{
                color: purple;
            }
</style>