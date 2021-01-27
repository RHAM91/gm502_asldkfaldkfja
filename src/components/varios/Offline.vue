<template>
    <div>
        <div v-if="!conexion" class="texto_offline">
            <div class="icoOffline">
                <img src="@/assets/ghost.png" style="width:100%;" alt="">
            </div>
            Buuuu! no hay conexión!
        </div>
        <div v-if="cool" class="texto_offline">
            <div class="icoOffline2">
                <img src="@/assets/unicorn.png" style="width:100%;" alt="">
            </div>
            La gente cool está en línea
        </div>
    </div>
</template>

<script>

export default {
    name: 'Loading_',
    props: ['conexion'],
    data() {
        return {
            cool: false
        }
    },
    methods: {
    
    },
    watch:{
        conexion: function(val){
            if(val){
                this.cool = true
                setTimeout(() => {
                    this.cool = false
                }, 5000);
            }else{
                this.cool = false
            }
        }
    }
}
</script>

<style scoped>

    .texto_offline{
        width: 250px;
        height: 45px;
        
        position: fixed;
        top: 0;
        right: 50%;
        margin-right: -250px;
        z-index: 999;
        display: flex;
        align-items: center;
    }

        .icoOffline{
            width: 38px;
            height: 38px;
            padding: 4px;
            margin-right: 10px;
        }

        .icoOffline2{
            width: 45px;
            height: 45px;
            padding-top: 4px;
            margin-right: 10px;
        }

        
</style>