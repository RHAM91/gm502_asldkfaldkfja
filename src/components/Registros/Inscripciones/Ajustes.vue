<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                
                <div class="seccion_ajustes">
                    <div class="seccion_ajustes_titulo">
                        <h4>
                            Docentes
                        </h4>
                        <b-button v-b-toggle.collapse-1 variant="outline-info" size="sm" style="height: 34px;margin-top: 5px;" @click="btn_docentes = !btn_docentes">{{btn_docentes ? 'Expandir': 'Contraer'}}</b-button>
                    </div>
                    <p>
                        Registro de docentes
                    </p>
                    <b-collapse id="collapse-1" class="mt-2">
                        <b-card style="background-color: #fafafa;">
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
                                            Romario Torres
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

            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "Ajustes",
    data() {
        return {
            btn_docentes: true
        }
    },
    methods: {
        
    },
}
</script>

<style>
    .seccion_ajustes{
        width: 100%;
        height: auto;
        border-top: 1px solid rgba(0,0,0,.125);
        padding-top: 10px;
        padding-bottom: 10px;
        color: #303030;
    }
        .seccion_ajustes_titulo{
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;
        }
</style>