<template>
    <div class="seccion_ajustes">
        <div class="seccion_ajustes_titulo">
            <h4>
                Ubicaciones
            </h4>
            <b-button v-b-toggle.collapse-3 variant="outline-info" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_seccion = !btn_seccion">{{btn_seccion ? 'Expandir': 'Contraer'}}</b-button>
        </div>
        <p>
            Registro de país, iglesia y región
        </p>
        <b-collapse id="collapse-3" class="mt-2">
            <b-card style="background-color: #fafafa;">
                <div class="btn_agregar">
                    <b-button type="button" variant="success" size="sm">Nuevo registro</b-button>
                </div>
                <table class="table table-bordered table-striped table-sm" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 80%;">
                                Nombre
                            </th>
                            <th style="width: 20%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Registro 1
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" variant="info" style="margin-right: 5px;" title="Editar"><i class="fas fa-edit"></i></b-button>
                                <b-button type="button" size="sm" variant="danger" style="margin-right: 5px;" title="Borrar"><i class="far fa-trash-alt"></i></b-button>
                                <b-button type="button" size="sm" variant="warning"  title="Información"><i class="fas fa-info-circle"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
export default {
    name: 'SeccionUbicacion',
    data() {
        return {
            btn_seccion: true
        }
    },
}
</script>

<style>

</style>