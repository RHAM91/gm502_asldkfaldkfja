<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="modal_banner">
                {{id}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Perfil',
    props:['id'],
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    data() {
        return {
            
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar_modal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.salir()
            }
        },
    },
}
</script>

<style>

</style>