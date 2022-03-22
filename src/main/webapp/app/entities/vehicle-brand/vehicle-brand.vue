<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhtestApp.vehicleBrand.home.title')" id="vehicle-brand-heading">Vehicle Brands</span>
            <router-link :to="{name: 'VehicleBrandCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-vehicle-brand">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhtestApp.vehicleBrand.home.createLabel')">
                    Create a new Vehicle Brand
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
        <div class="alert alert-warning" v-if="!isFetching && vehicleBrands && vehicleBrands.length === 0">
            <span v-text="$t('jhtestApp.vehicleBrand.home.notFound')">No vehicleBrands found</span>
        </div>
        <div class="table-responsive" v-if="vehicleBrands && vehicleBrands.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhtestApp.vehicleBrand.name')">Name</span></th>
                    <th><span v-text="$t('jhtestApp.vehicleBrand.enabled')">Enabled</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="vehicleBrand in vehicleBrands"
                    :key="vehicleBrand.id">
                    <td>
                        <router-link :to="{name: 'VehicleBrandView', params: {vehicleBrandId: vehicleBrand.id}}">{{vehicleBrand.id}}</router-link>
                    </td>
                    <td>{{vehicleBrand.name}}</td>
                    <td>{{vehicleBrand.enabled}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'VehicleBrandView', params: {vehicleBrandId: vehicleBrand.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'VehicleBrandEdit', params: {vehicleBrandId: vehicleBrand.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(vehicleBrand)"
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
            <span slot="modal-title"><span id="jhtestApp.vehicleBrand.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-vehicleBrand-heading" v-text="$t('jhtestApp.vehicleBrand.delete.question', {'id': removeId})">Are you sure you want to delete this Vehicle Brand?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-vehicleBrand" v-text="$t('entity.action.delete')" v-on:click="removeVehicleBrand()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./vehicle-brand.component.ts">
</script>
