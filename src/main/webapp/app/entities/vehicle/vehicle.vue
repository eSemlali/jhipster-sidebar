<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhtestApp.vehicle.home.title')" id="vehicle-heading">Vehicles</span>
            <router-link :to="{name: 'VehicleCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-vehicle">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhtestApp.vehicle.home.createLabel')">
                    Create a new Vehicle
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
        <div class="alert alert-warning" v-if="!isFetching && vehicles && vehicles.length === 0">
            <span v-text="$t('jhtestApp.vehicle.home.notFound')">No vehicles found</span>
        </div>
        <div class="table-responsive" v-if="vehicles && vehicles.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhtestApp.vehicle.plate')">Plate</span></th>
                    <th><span v-text="$t('jhtestApp.vehicle.created')">Created</span></th>
                    <th><span v-text="$t('jhtestApp.vehicle.lastUpdate')">Last Update</span></th>
                    <th><span v-text="$t('jhtestApp.vehicle.vehicleType')">Vehicle Type</span></th>
                    <th><span v-text="$t('jhtestApp.vehicle.vehicleColor')">Vehicle Color</span></th>
                    <th><span v-text="$t('jhtestApp.vehicle.vehicleBrand')">Vehicle Brand</span></th>
                    <th><span v-text="$t('jhtestApp.vehicle.client')">Client</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="vehicle in vehicles"
                    :key="vehicle.id">
                    <td>
                        <router-link :to="{name: 'VehicleView', params: {vehicleId: vehicle.id}}">{{vehicle.id}}</router-link>
                    </td>
                    <td>{{vehicle.plate}}</td>
                    <td>{{vehicle.created ? $d(Date.parse(vehicle.created), 'short') : ''}}</td>
                    <td>{{vehicle.lastUpdate ? $d(Date.parse(vehicle.lastUpdate), 'short') : ''}}</td>
                    <td>
                        <div v-if="vehicle.vehicleType">
                            <router-link :to="{name: 'VehicleTypeView', params: {vehicleTypeId: vehicle.vehicleType.id}}">{{vehicle.vehicleType.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="vehicle.vehicleColor">
                            <router-link :to="{name: 'VehicleColorView', params: {vehicleColorId: vehicle.vehicleColor.id}}">{{vehicle.vehicleColor.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="vehicle.vehicleBrand">
                            <router-link :to="{name: 'VehicleBrandView', params: {vehicleBrandId: vehicle.vehicleBrand.id}}">{{vehicle.vehicleBrand.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="vehicle.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: vehicle.client.id}}">{{vehicle.client.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'VehicleView', params: {vehicleId: vehicle.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'VehicleEdit', params: {vehicleId: vehicle.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(vehicle)"
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
            <span slot="modal-title"><span id="jhtestApp.vehicle.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-vehicle-heading" v-text="$t('jhtestApp.vehicle.delete.question', {'id': removeId})">Are you sure you want to delete this Vehicle?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-vehicle" v-text="$t('entity.action.delete')" v-on:click="removeVehicle()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./vehicle.component.ts">
</script>
