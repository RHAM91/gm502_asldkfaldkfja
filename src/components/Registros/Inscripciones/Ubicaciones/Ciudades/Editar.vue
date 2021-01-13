<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner style_reg_ciudades">
                <b-button type="button" size="sm" variant="outline-info" title="Cerrar" @click="cerrar"><i class="fas fa-arrow-left"></i></b-button>
            </div>
            <b-container fluid>
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h2>
                                {{pais}}
                            </h2>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>País</label>
                            <select class="form-control form-control-sm" v-model="pais">
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in paises" :key="index" :value="item.pais">{{item.pais}}</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Ciudad / Departamento</label>
                            <b-form-input type="text" v-model="ciudad" size="sm" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label>Abreviatura</label>
                            <b-form-input type="text" v-model="abreviatura" size="sm" required></b-form-input>
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
        ...mapState(['paises', 'ciudades'])
    },
    data() {
        return {
            pais: '',
            ciudad: '',
            abreviatura: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrarModal', false)
        },
        async getInfo(){
            let a = this.ciudades.filter(ciudad => ciudad._id == this.id)
            this.pais = a[0].pais
            this.ciudad = a[0].ciudad
            this.abreviatura = a[0].abreviatura
        },
        async guardar(){
            let data = {
                api: 'ciudades',
                id: this.id,
                formulario: {
                    pais: this.pais,
                    ciudad: this.ciudad,
                    abreviatura: this.abreviatura
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.ciudades)
        },
        ...mapActions(['updateData', 'wse'])
    },
    mounted() {
        this.getInfo()
    },
}
</script>

<style scoped>
    .style_reg_ciudades{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: 5px;
    }
</style>