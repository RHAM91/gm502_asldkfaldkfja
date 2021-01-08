<template>
    <div class="contenedor_settings_creaproducto">
        <div class="cuadro">
            <div class="panel_settings">
                <div class="btn-setting" @click="seleccionar_modulo('categoria')">
                    Categorias
                </div>
                <div class="btn-setting" @click="seleccionar_modulo('medidas')">
                    Medidas
                </div>
                <div class="btn-setting" @click="seleccionar_modulo('ubicaciones')">
                    Ubicaciones
                </div>
                <div class="btn-setting" @click="seleccionar_modulo('proveedores')">
                    Proveedores
                </div>
                <div class="btn-setting" @click="seleccionar_modulo('editaproducto')">
                    Editar producto
                </div>
                 <div class="btn-setting" @click="seleccionar_modulo('eliminarproducto')">
                    Eliminar producto
                </div>
            </div>
            <div class="formulario_settings">
                <Categorias v-if="modulo == 'categoria'" />


                <Medidas v-if="modulo == 'medidas'" />
                <Ubicaciones v-if="modulo == 'ubicaciones'" />
                <Proveedores v-if="modulo == 'proveedores'"/>
                <EditaProducto v-if="modulo == 'editaproducto'"/>
                <EliminarProducto v-if="modulo == 'eliminarproducto'"/>
            </div>

        
        </div>
    </div>  
</template>

<script>

import Categorias from './CreaProducto.settings.categorias.vue'
import Medidas from './Medidas.settings.vue'
import Ubicaciones from './Ubicaciones.settings'
import Proveedores from './Proveedores.settings'
import EditaProducto from './CreaProducto.settings.editaproducto.vue'
import EliminarProducto from './Eliminar.producto.settings.vue'

export default {
    name: "CraaProducto_settings",
    components:{
        Categorias,
        Medidas,
        Ubicaciones,
        Proveedores,
        EditaProducto,
        EliminarProducto
    },
    data() {
        return {
            modulo: ''
        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    methods: {
        seleccionar_modulo(modulo){
            this.modulo = modulo
        },
        cerrar(){
            this.$emit('cerrarModal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
    },
}
</script>

<style>
    .contenedor_settings_creaproducto{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

        .cuadro{
            width: 700px;
            height: 500px;
            background-color: white;
            display: flex;
        }

            .panel_settings{
                border-right: 1px solid #e7e7e7;
                width: 150px;
                height: 100%;
            }
                .btn-setting{
                    width: 100%;
                    height: 45px;
                    border-bottom: 1px solid #e7e7e7;
                    transition: .4s ease;
                    display: flex;
                    align-items: center;
                    padding-left: 10px;
                    cursor: pointer;
                }

                .btn-setting:hover{
                    background-color: rgba(232, 110, 31, 0.3);
                }

            .formulario_settings{
                width: 550px;
                height: 100%;
            }
</style>