import Vue from 'vue'
import Vuex from 'vuex'
import { IP, PUERTO } from '../config/parametros'
import axios from 'axios'
import VuexPersist from 'vuex-persist'
import { minix } from '../components/functions/alertas'
// import socket from '../config/sockets_config'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'kat',
  storage: window.localStorage,
  reducer: state => ({

    token: state.token,
    permisos: state.permisos,
    t2: state.t2
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

    permisos:[],
  


    rutas: {
        inventarios: {api: 'inventario', estado: 'set_inventarios'},
    },


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
              
          }else{
              minix({icon: 'info', mensaje: r.data.message, tiempo: 3000})
              
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
            //dispatch('getDatos', state.rutas.inventarios)

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
    
    },
    getters:{
    
    
    },
    plugins: [vuexPersist.plugin],
    modules: {
    }
})
