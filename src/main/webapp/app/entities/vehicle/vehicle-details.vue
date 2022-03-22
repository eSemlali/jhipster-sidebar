<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="vehicle">
                <h2 class="jh-entity-heading"><span v-text="$t('jhtestApp.vehicle.detail.title')">Vehicle</span> {{vehicle.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhtestApp.vehicle.plate')">Plate</span>
                    </dt>
                    <dd>
                        <span>{{vehicle.plate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicle.created')">Created</span>
                    </dt>
                    <dd>
                        <span v-if="vehicle.created">{{$d(Date.parse(vehicle.created), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicle.lastUpdate')">Last Update</span>
                    </dt>
                    <dd>
                        <span v-if="vehicle.lastUpdate">{{$d(Date.parse(vehicle.lastUpdate), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicle.vehicleType')">Vehicle Type</span>
                    </dt>
                    <dd>
                        <div v-if="vehicle.vehicleType">
                            <router-link :to="{name: 'VehicleTypeView', params: {vehicleTypeId: vehicle.vehicleType.id}}">{{vehicle.vehicleType.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicle.vehicleColor')">Vehicle Color</span>
                    </dt>
                    <dd>
                        <div v-if="vehicle.vehicleColor">
                            <router-link :to="{name: 'VehicleColorView', params: {vehicleColorId: vehicle.vehicleColor.id}}">{{vehicle.vehicleColor.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicle.vehicleBrand')">Vehicle Brand</span>
                    </dt>
                    <dd>
                        <div v-if="vehicle.vehicleBrand">
                            <router-link :to="{name: 'VehicleBrandView', params: {vehicleBrandId: vehicle.vehicleBrand.id}}">{{vehicle.vehicleBrand.name}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicle.client')">Client</span>
                    </dt>
                    <dd>
                        <div v-if="vehicle.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: vehicle.client.id}}">{{vehicle.client.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="vehicle.id" :to="{name: 'VehicleEdit', params: {vehicleId: vehicle.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./vehicle-details.component.ts">
</script>
