<template>
    <div class="contenedor_less">
        <div class="cuadro_less">
            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            Consulta de productos con poco stock 
                        </h2>
                        <!-- <b-button type="button" size="sm" variant="danger" @click="remarcar">ok</b-button> -->
                    </b-col>
                    <b-col sm="12" md="5" class="mt-3">
                        <label>Menor a</label>
                        <b-form-input type="number" v-model="cantidad" size="sm" @keydown.enter="getDatos"></b-form-input>
                    </b-col>
                    <b-col sm="12" md="7" class="mt-3">
                        <label>Bodega</label>
                        <select class="form-control form-control-sm" @change="getDatos" v-model="bodega">
                            <option value="">Selecciona</option>
                            <option value="iglesia">Iglesia</option>
                            <option value="oficina">Oficina</option>
                        </select>
                    </b-col>
                    <!-- <b-col sm="12" md="2" class="mt-5">
                        <b-button type="button" size="sm" block variant="success" @click="getDatos">Consultar</b-button>
                    </b-col> -->
                    <b-col v-if="bodega == 'iglesia'" sm="12" class="mt-3">
                        <div class="datos_resultado">
                            <table class="table table-bordered table-hover table-sm" style="font-size: 12px;">
                                <thead>
                                    <tr>
                                        <th style="width: 25%;">
                                            Código
                                        </th>
                                        <th style="width: 55%;">
                                            Nombre
                                        </th>
                                        <th style="width: 10%;text-align: center;">
                                            Iglesia
                                        </th>
                                        <th style="width: 10%;text-align: center;">
                                            Carrito
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in dataIglesia" :key="index">
                                        <td>
                                            {{item.codigo}}
                                        </td>
                                        <td>
                                            {{item.nombre}}
                                        </td>
                                        
                                        <td :class="[item.existencia_iglesia == 0 ? '_rojo': item.existencia_iglesia == 1 ? '_anaranjado': item.existencia_iglesia == 2 ? '_amarillo': '']" style="text-align: center;">
                                            {{item.existencia_iglesia}}
                                        </td>

                                        <td style="text-align: center;">
                                            <b-button v-if="item.marca == false" type="button" size="sm" variant="primary" @click="marca({codigo: item.codigo, nombre: item.nombre, cantidad: item.existencia_iglesia, pos: index, marca: true}, 'iglesia')"><i class="fas fa-cart-plus"></i></b-button>

                                            <b-button v-else type="button" size="sm" variant="danger" @click="desmarcar({codigo: item.codigo, nombre: item.nombre, cantidad: item.existencia_iglesia, pos: index, marca: false}, 'iglesia')"><i class="fas fa-minus-circle"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-col>
                    <b-col v-if="bodega =='oficina'" sm="12" class="mt-3">
                        <div class="datos_resultado">
                            <table class="table table-bordered table-hover table-sm" style="font-size: 12px;">
                                <thead>
                                    <tr>
                                        <th style="width: 25%;">
                                            Código
                                        </th>
                                        <th style="width: 55%;">
                                            Nombre
                                        </th>
                                        <th style="width: 10%;text-align: center;">
                                            Oficina
                                        </th>
                                        <th style="width: 10%;text-align: center;">
                                            Carrito
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in dataOficina" :key="index">
                                        <td>
                                            {{item.codigo}}
                                        </td>
                                        <td>
                                            {{item.nombre}}
                                        </td>
                                        <td :class="[item.existencia_oficina == 0 ? '_rojo': item.existencia_oficina == 1 ? '_anaranjado': item.existencia_oficina == 2 ? '_amarillo': '']" style="text-align: center;">
                                            {{item.existencia_oficina}}
                                        </td>

                                        <td style="text-align: center;">
                                            <b-button v-if="item.marca == false" type="button" size="sm" variant="primary" @click="marca({codigo: item.codigo, nombre: item.nombre, cantidad: item.existencia_oficina, pos: index, marca: true},'oficina')"><i class="fas fa-cart-plus"></i></b-button>

                                            <b-button v-else type="button" size="sm" variant="danger" @click="desmarcar({codigo: item.codigo, nombre: item.nombre, cantidad: item.existencia_oficina, pos: index, marca: false}, 'oficina')"><i class="fas fa-minus-circle"></i></b-button>
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

import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import { mapMutations, mapState } from 'vuex'

export default {
    name: 'Less',
    computed:{
        ...mapState(['carrito'])
    },
    data() {
        return {
            cantidad: 3,
            bodega: '',
            dataOficina: [],
            dataIglesia: [],
            carrito2: []
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
            this.$emit('clsModal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.salir()
            }
        },
        async getDatos(){

            if (this.cantidad == '' || this.cantidad <= 0 || this.cantidad == '0') {
                minix({icon: 'error', mensaje: 'La cantidad a consultar debe ser mayor que cero', tiempo: 3000})
            }else{

                if (this.bodega == 'iglesia') {
                    
                    let data = {
                        bodega: this.bodega,
                        cantidad: this.cantidad
                    }
        
                    let datosIglesia = await axios.post(`http://${IP}:${PUERTO}/api/productos/less`, data, this.$store.state.token)
                    this.dataIglesia = datosIglesia.data

                    let dig = datosIglesia.data

                    dig.forEach(e => { // inserta la marca dentro del objeto JSON que trae la consulta post al API
                        e.marca = false
                    });

                    await this.remarcar('iglesia')
                }else{
    
                    let data = {
                        bodega: this.bodega,
                        cantidad: this.cantidad
                    }
        
                    let datosOficina = await axios.post(`http://${IP}:${PUERTO}/api/productos/less`, data, this.$store.state.token)
                    this.dataOficina = datosOficina.data
                    
                    let dof = datosOficina.data

                    dof.forEach(e => { // inserta la marca dentro del objeto JSON que trae la consulta post al API
                        e.marca = false
                    });

                    await this.remarcar('oficina')

                }
            }
        },
        marca(producto, bodega){

            if (bodega == 'iglesia') { // si al hacer click en el carrito, osea al hacer marca, este reemplaza la linea segun su posición y la reemplza con el objeto "data"
                let data = {
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    existencia_iglesia: producto.cantidad,
                    marca: producto.marca,
                    bodega,
                    cantx: 1,
                    proveedor: '',
                    precio: 0,
                    subtotal: 0
                }

                this.dataIglesia.splice(producto.pos, 1, data)

                this.carrito2.push(data)
                
                this.set_carrito(this.carrito2)

            }else if (bodega == 'oficina'){

                let data = {
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    existencia_oficina: producto.cantidad,
                    marca: producto.marca,
                    bodega,
                    cantx: 1,
                    proveedor: '',
                    precio: 0,
                    subtotal: 0
                }
    
                this.dataOficina.splice(producto.pos, 1, data)
    
                this.carrito2.push(data)
                
                this.set_carrito(this.carrito2)
            }

        },
        desmarcar(producto, bodega){

            if (bodega == 'iglesia') {

                let data = {
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    existencia_iglesia: producto.cantidad,
                    marca: producto.marca,
                    bodega,
                    cantx: 1,
                    proveedor: '',
                    precio: 0,
                    subtotal: 0
                }

                this.dataIglesia.splice(producto.pos, 1, data)

                for (let i = 0; i < this.carrito2.length; i++) {
                    const e = this.carrito2[i];

                    if (e.codigo == producto.codigo && e.bodega == bodega) {
                        this.carrito2.splice(i,1)
                    }
                }

                this.set_carrito(this.carrito2)

            }else if (bodega == 'oficina'){

                let data = {
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    existencia_oficina: producto.cantidad,
                    marca: producto.marca,
                    bodega,
                    cantx: 1,
                    proveedor: '',
                    precio: 0,
                    subtotal: 0
                }
    
                this.dataOficina.splice(producto.pos, 1, data)
    
                for (let i = 0; i < this.carrito2.length; i++) { // este for es para que busque la posición del elemento deseado dentro del array y tambien valida si es de la misma bodega
                    const e = this.carrito2[i];
    
                    if (e.codigo == producto.codigo && e.bodega == bodega) {
                        this.carrito2.splice(i,1)
                    }
                }
    
                this.set_carrito(this.carrito2)
            }


        },
        remarcar(bodega){

            if (bodega == 'oficina') {
                
                this.carrito2 = this.carrito
    
                for (let i = 0; i < this.carrito.length; i++) {
                    const e = this.carrito[i];
    
                    for (let x = 0; x < this.dataOficina.length; x++) {
                        const m = this.dataOficina[x];
                        
                        if (e.codigo == m.codigo && e.bodega == bodega) {
                            let data = {
                                codigo: e.codigo,
                                nombre: e.nombre,
                                existencia_oficina: e.existencia_oficina,
                                marca: e.marca,
                                cantx: e.cantx,
                                proveedor: e.proveedor,
                                precio: e.precio,
                                subtotal: e.subtotal
                            }
    
                            this.dataOficina.splice(x, 1, data)
                        }
                    }
                }
            }else if (bodega == 'iglesia'){

                this.carrito2 = this.carrito
    
                for (let i = 0; i < this.carrito.length; i++) {
                    const e = this.carrito[i];
    
                    for (let x = 0; x < this.dataIglesia.length; x++) {
                        const m = this.dataIglesia[x];
                        
                        if (e.codigo == m.codigo && e.bodega == bodega) {
                            let data = {
                                codigo: e.codigo,
                                nombre: e.nombre,
                                existencia_iglesia: e.existencia_iglesia,
                                marca: e.marca,
                                cantx: e.cantx,
                                proveedor: e.proveedor,
                                precio: e.precio,
                                subtotal: e.subtotal
                            }
    
                            this.dataIglesia.splice(x, 1, data)
                        }
                    }
                }
            }


        },
        ...mapMutations(['set_carrito'])
    },
    mounted() {
    },
}
</script>

<style>
    .contenedor_less{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
        .cuadro_less{
            width: 800px;
            height: 600px;
            background-color: white;
            border-radius: 4px;
        }

        .datos_resultado{
            width: 100%;
            height: 425px;
            overflow: auto;
        }

        ._rojo{
            background-color: #ef3054;
            color: white;
        }
        
        ._amarillo{
            background-color: #ffe347;
            color: black;
        }
        ._anaranjado{
            background-color: #ffb400;
            color: white;
        }
</style>