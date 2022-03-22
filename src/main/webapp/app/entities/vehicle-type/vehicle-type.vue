<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhtestApp.vehicleType.home.title')" id="vehicle-type-heading">Vehicle Types</span>
            <router-link :to="{name: 'VehicleTypeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-vehicle-type">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhtestApp.vehicleType.home.createLabel')">
                    Create a new Vehicle Type
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && vehicleTypes && vehicleTypes.length === 0">
            <span v-text="$t('jhtestApp.vehicleType.home.notFound')">No vehicleTypes found</span>
        </div>
        <div class="table-responsive" v-if="vehicleTypes && vehicleTypes.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhtestApp.vehicleType.name')">Name</span></th>
                    <th><span v-text="$t('jhtestApp.vehicleType.enabled')">Enabled</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="vehicleType in vehicleTypes"
                    :key="vehicleType.id">
                    <td>
                        <router-link :to="{name: 'VehicleTypeView', params: {vehicleTypeId: vehicleType.id}}">{{vehicleType.id}}</router-link>
                    </td>
                    <td>{{vehicleType.name}}</td>
                    <td>{{vehicleType.enabled}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'VehicleTypeView', params: {vehicleTypeId: vehicleType.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'VehicleTypeEdit', params: {vehicleTypeId: vehicleType.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(vehicleType)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhtestApp.vehicleType.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-vehicleType-heading" v-text="$t('jhtestApp.vehicleType.delete.question', {'id': removeId})">Are you sure you want to delete this Vehicle Type?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-vehicleType" v-text="$t('entity.action.delete')" v-on:click="removeVehicleType()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./vehicle-type.component.ts">
</script>
