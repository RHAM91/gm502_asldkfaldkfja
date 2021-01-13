<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner style_reg_paises">
                <b-button type="button" size="sm" variant="outline-info" title="Cerrar" @click="cerrar"><i class="fas fa-arrow-left"></i></b-button>
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h2>
                                {{nombre}}
                            </h2>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre</label>
                            <b-form-input type="text" id="e_nombre_pais" v-model="nombre" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Abreviatura</label>
                            <b-form-input type="text" v-model="abreviatura" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Código</label>
                            <b-form-input type="number" v-model="codigo" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="success">Actualizar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'Editar',
    props:['id'],
    computed: {
        ...mapState(['paises'])
    },
    data() {
        return {
            nombre: '',
            codigo: '',
            abreviatura: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrarModal', false)
        },
        async getInfo(){

            let a = this.paises.filter(pais => pais._id == this.id)
            this.nombre = a[0].pais
            this.codigo = a[0].codigo
            this.abreviatura = a[0].abreviatura
        },
        async guardar(){
            let data = {
                api: 'paises',
                id: this.id,
                formulario: {
                    pais: this.nombre,
                    codigo: this.codigo,
                    abreviatura: this.abreviatura
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.paises)
        },
        ...mapActions(['updateData', 'wse'])
    },
    mounted() {
        document.getElementById('e_nombre_pais').focus()
        this.getInfo()
    },
}
</script>

<style scoped>
    .style_reg_paises{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: 5px;
    }
</style>