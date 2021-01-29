<template>
    <div>
        <div v-if="loading" class="icoLoading">
            <img src="@/assets/pacman.gif" style="width:100%;" alt="">
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Loading',
    computed: {
        ...mapState(['loading'])
    },
    methods: {
        ...mapMutations(['set_loading'])
    },
    watch: {
        loading: function(value){
            if(value){
                setTimeout(() => {
                    this.set_loading(false)
                }, 3000);
            }
        }
    },
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