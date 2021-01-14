<template>
    <b-form fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" v-model="buscar" id="clie" size="sm" placeholder="Buscar" autocomplete="off"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>
export default {
    name: 'Pagos',
    
}
</script>

<style>

</style>