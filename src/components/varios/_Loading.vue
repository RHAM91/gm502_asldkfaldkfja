<template>
    <div>
        <div v-if="accion" class="icoLoading">
            <img src="@/assets/pacman.gif" style="width:100%;" alt="">
        </div>
    </div>
</template>

<script>

export default {
    name: 'Loading',
    props:['accion'],
}
</script>

<style scoped>
    .icoLoading{
        width: 48px;
        height: 48px;
        position: fixed;
        top: 0;
        right: 11px;
    }
</style>