<template>
    <div>
        <div v-if="loading_" class="icoLoading">
            <img src="@/assets/pacman.gif" style="width:100%;" alt="">
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Loading_',
    computed:{
        ...mapState(['loading_'])
    },
    watch:{
        loading_: function(val){
            this.$emit('resp', val)
        }
    }
}
</script>

<style scoped>
    .icoLoading{
        width: 48px;
        height: 48px;
        position: fixed;
        top: 0;
        right: 11px;
        z-index: 999;
    }
</style>