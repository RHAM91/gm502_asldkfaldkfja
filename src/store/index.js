import Vue from 'vue'
import Vuex from 'vuex'
import { IP, PUERTO } from '../config/parametros'
import axios from 'axios'
import VuexPersist from 'vuex-persist'
import { minix } from '../components/functions/alertas'
import { stat } from 'fs'
// import socket from '../config/sockets_config'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'kat',
  storage: window.localStorage,
  reducer: state => ({

    token: state.token,
    permisos: state.permisos,
    t2: state.t2,
    carrito: state.carrito
    //instituciones: state.instituciones
  }) 
})

// FUNCIONES AUXILIARES

// -> Función para eliminar acentos y poder hacer la búsqueda correctamente

function filtrar_acentos(input){
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < acentos.length; i++) {
        input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
}

export default new Vuex.Store({
  state: {
    token: '',
    t2:'',
    loading: false,
    no_formulario: 0, // esta variable sirve para validar si el producto ya existe no borrar los datos del formulario

    permisos:[],
    carrito: [],
    cantidad_carrito: 0,
    inventarios:[],
    inventario_categorias: [],
    inventario_productos: [],
    inventario_medidas:[],
    inventario_ubicaciones:[],
    inventario_proveedores:[],
    inventario_pedidos: [],
    inventario_correos: [],
    inventario_correos_destino: [],
    inventario_ordenes: [],


    rutas: {
        inventarios: {api: 'inventario', estado: 'set_inventarios'},
        inventario_categorias: {api: 'categorias', estado: 'set_inventario_categorias'},
        inventario_productos: {api: 'productos', estado: 'set_inventario_productos'},
        inventario_medidas: {api: 'medidas', estado: 'set_inventario_medidas'},
        inventario_ubicaciones: {api: 'ubicaciones', estado: 'set_inventario_ubicaciones'},
        inventario_proveedores: {api: 'proveedores', estado: 'set_inventario_proveedores'},
        inventario_pedidos: {api: 'pedidos', estado: 'set_inventario_pedidos'},
        inventario_correos: {api: 'correos/tipo/origen', estado: 'set_inventario_correos'},
        inventario_correos_destino: {api: 'correos/tipo/destino', estado: 'set_inventario_correos_destino'},
        inventario_ordenes: {api: 'ordenes', estado: 'set_inventario_ordenes'}
    },

    filterPacientes: {
        query: '',
        nocliente: '',
        filter_revision: '',
        filter_produccion: '',
        filter_odts: ''
    }

  },
  mutations: {
    set_token(state, token){
        let token_formateado = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        state.token = token_formateado
    },
    set_loading(state, data){
        state.loading = data
    },
    set_t2(state, token){
        state.t2 = token
    },
    set_permisos(state, data){
        state.permisos = data
    },




    set_inventarios(state, data){
        state.inventarios = data
    },
    set_inventario_categorias(state, data){
        state.inventario_categorias = data
    },
    set_inventario_productos(state, data){
        state.inventario_productos = data
    },
    set_inventario_medidas(state, data){
        state.inventario_medidas = data
    },
    set_inventario_ubicaciones(state, data){
        state.inventario_ubicaciones = data
    },
    set_inventario_proveedores(state, data){
        state.inventario_proveedores = data
    },
    set_inventario_pedidos(state, data){
        state.inventario_pedidos = data
    },
    set_inventario_correos(state, data){
        state.inventario_correos = data
    },
    set_inventario_correos_destino(state, data){
        state.inventario_correos_destino = data
    },
    set_inventario_ordenes(state, data){
        state.inventario_ordenes = data
    },




    set_querypaciente(state, query){
        state.filterPacientes.query = query
    },
    set_querypacientenocli(state, query){
        state.filterPacientes.nocliente = query
    },
    set_queryodts(state, query){
        state.filterPacientes.filter_odts = query
    },
    set_no_formulario(state, query){
        state.no_formulario = query
    },
    set_carrito(state, query){
        state.carrito = query
    },
    set_cantidad_carrito(state, query){
        state.cantidad_carrito = query
    },
    set_proveedor_lista(state, query){
        state.carrito[query.index].proveedor = query.proveedor
    },
    set_precio_lista(state, query){
        state.carrito[query.index].precio = query.precio
    },
    set_subtotal_lista(state, query){
        state.carrito[query.index].subtotal = query.subtotal
    }
  },
  actions: {
    get_token({commit}, data){
        commit('set_token', data)
    },
    async insert_data({commit, state}, data){
      try {
          const r = await axios.post(`http://${IP}:${PUERTO}/api/${data.api}`, data.formulario, state.token)

          if (r.status == 200) {
              minix({icon: 'success', mensaje: r.data.message, tiempo: 3000})
              commit('set_no_formulario', 0)
          }else{
              minix({icon: 'info', mensaje: r.data.message, tiempo: 3000})
              commit('set_no_formulario', 1)
          }

          //document.getElementById(`formulario_${data.limpiar}`).reset()

      } catch (e) {
        
          minix({icon: 'error', mensaje: `Al parecer algo salió mal :/ (${e.response.data.e.code})`, tiempo: 3000})
          console.table(e.response.data.e)

      }

    },
    async updateData({state}, data){
        try {
            const resp = await axios.put(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, data.formulario, state.token)

            if (resp.status == 200) {
                minix({icon: 'success', mensaje: resp.data.message, tiempo: 3000})
            }else{
                minix({icon: 'info', mensaje: resp.status, tiempo: 3000})
            }

        } catch (e) {
            minix({icon: 'error', mensaje: `Al parecer algo salió mal :/ (${e.response.data.e.code})`, tiempo: 3000})
            console.table(e.response.data.e)
        }
    },
    async deleteData({state}, data){
        try {
            const resp = await axios.delete(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, state.token)

            if (resp.status == 200) {

                minix({icon: 'success', mensaje: resp.data.message, tiempo: 3000})
            }else{

                minix({icon: 'info', mensaje: resp.status, tiempo: 3000})
            }

        } catch (e) {
            minix({icon: 'error', mensaje: `Al parecer algo salió mal :/ (${e.response.data.e.code})`, tiempo: 3000})
            console.table(e.response.data.e)
        }
    },
      async getPermisos({commit, state}, data){
          try {
  
              let vistas = {}
  
              for (let i = 0; i < data.rutas.length; i++) {
      
                  let permisoVista = await axios.get(`http://${IP}:${PUERTO}/api/permisos/vistas/${data.rutas[i]}`, state.token)
                  Object.assign(vistas, permisoVista.data)
              }
  
              commit('set_permisos', vistas)
  
          } catch (e) {
  
              console.log(e.response)
              minix({icon: 'error', mensaje: 'Error al obtener los permisos', tiempo: 3000})
          }
      },
      async getDatos({commit, state}, data){
    
          try {
              
              const productos = await axios.get(`http://${IP}:${PUERTO}/api/${data.api}`, state.token)
              commit(data.estado, productos.data)


          } catch (e) {
              console.log(e)            
          }
      },
      async sfile({state}, data){
           
        try {

            const formData = new FormData()
            formData.append('image', data.evento)


            for (let i = 0; i < data.campos.length; i++) {
                const e = data.campos[i];
                formData.append(e.campo, e.payload)
            }

            const archivo = await axios.post(`http://${IP}:${PUERTO}/api/${data.api}`, formData, state.token)
            minix({icon: 'success', mensaje: archivo.data.message, tiempo: 3000})

        } catch (e) {
            minix({icon: 'info', mensaje: archivo.status, tiempo: 3000})
        }


      },
      ws({commit, state, dispatch}, socket){ //inicia los canales de escucha
        
        socket.emit('todo', '...')

        socket.on('actualizar', (orden)=>{
            //console.log('Esta es la orden', orden)
            dispatch('getDatos', state.rutas.inventarios)
            dispatch('getDatos', state.rutas.inventario_categorias)
            dispatch('getDatos', state.rutas.inventario_productos)
            dispatch('getDatos', state.rutas.inventario_medidas)
            dispatch('getDatos', state.rutas.inventario_ubicaciones)
            dispatch('getDatos', state.rutas.inventario_proveedores)
            dispatch('getDatos', state.rutas.inventario_pedidos)
            dispatch('getDatos', state.rutas.inventario_correos)
            dispatch('getDatos', state.rutas.inventario_correos_destino)
            dispatch('getDatos', state.rutas.inventario_ordenes)

            commit('set_loading', true)
        })

        socket.on('modulo', (data) =>{ // PASO 5: este recibe la instruccion de que modulo debe actualizar segun la necesidad
            dispatch('getDatos', data)
            commit('set_loading', true)
        })


          // FUNCION PARA AGREGAR EL LOADING CUAND DE DESCARGAN LOS DATOS EN LOCAL

    },
    wse({}, modulo){ // PASO 1: recibe el wse del modulo por ejemplo medicos al guardar, recibe los datos de ruta (ver en estate)

        const { enviar } = require('@/config/sockets_config')
        enviar(modulo) // PASO 2: se pasan los datos de la ruta a la funcion enviar para que lo emita al servidor
    },
    sumarCompra({commit, state}, data){

        let numero = state.carrito[data].cantx
        let precio = state.carrito[data].precio

        numero += 1

        let newnumero = state.carrito[data].cantx = numero

        commit('set_cantidad_carrito', newnumero)

        let subtotal = {
            index: data,
            subtotal: newnumero * precio
        }
        commit('set_subtotal_lista', subtotal)

    },
    restarCompra({commit, state}, data){

        if(state.carrito[data].cantx <= 1){
            
        }else{

            let numero = state.carrito[data].cantx
            let precio = state.carrito[data].precio
    
            numero -= 1
    
            let newnumero = state.carrito[data].cantx = numero
            commit('set_cantidad_carrito', newnumero)

            let subtotal = {
                index: data,
                subtotal: newnumero * precio
            }

            commit('set_subtotal_lista', subtotal)

        }
    },
    setProveedorLista({commit, state}, datos){

        //state.carrito[datos.index].proveedor = datos.proveedor
        commit('set_proveedor_lista', datos)
    },
    setPrecioLista({commit, state}, datos){

        let cantidad = state.carrito[datos.index].cantx

        commit('set_precio_lista', datos)

        let subtotal = parseFloat(datos.precio) * parseFloat(cantidad)
        let ninfo = {
            index: datos.index,
            subtotal
        }

        commit('set_subtotal_lista', ninfo)
    }
    
    },
    getters:{
    
    filteredPaciente (state){
        if(state.filterPacientes.query.length > 2){
            
            return state.pacientes.filter(paciente => filtrar_acentos(paciente.nombre.toLowerCase()).includes(state.filterPacientes.query) && paciente.cliente == true)
        }else{

            return state.pacientes.filter(paciente =>  paciente.cliente == true)
        }
    },
    filteredPacienteNoCli (state){
        if(state.filterPacientes.nocliente.length > 2){
            
            return state.pacientes.filter(paciente => filtrar_acentos(paciente.nombre.toLowerCase()).includes(state.filterPacientes.nocliente) && paciente.cliente == false)
        }else{

            return state.pacientes.filter(paciente =>  paciente.cliente == false)
        }
    },
    filteredPacientew (state){

        if(state.filterPacientes.query.length > 2){
            return state.pacientes.filter(paciente => filtrar_acentos(paciente.nombre.toLowerCase()).includes(state.filterPacientes.query))
        }
    },
    filterODTs (state){

        if(state.filterPacientes.filter_odts.length > 2){
            return state.odts.filter(odt => filtrar_acentos(odt.nombre.toLowerCase()).includes(state.filterPacientes.filter_odts) || filtrar_acentos(odt.descripcion.toLowerCase()).includes(state.filterPacientes.filter_odts) || filtrar_acentos(odt.departamento.toLowerCase()).includes(state.filterPacientes.filter_odts) || filtrar_acentos(odt.etapa.toLowerCase()).includes(state.filterPacientes.filter_odts))
        }

        return state.odts
    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
