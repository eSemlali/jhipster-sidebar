<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="vehicleType">
                <h2 class="jh-entity-heading"><span v-text="$t('jhtestApp.vehicleType.detail.title')">VehicleType</span> {{vehicleType.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhtestApp.vehicleType.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{vehicleType.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicleType.enabled')">Enabled</span>
                    </dt>
                    <dd>
                        <span>{{vehicleType.enabled}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="vehicleType.id" :to="{name: 'VehicleTypeEdit', params: {vehicleTypeId: vehicleType.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./vehicle-type-details.component.ts">
</script>
