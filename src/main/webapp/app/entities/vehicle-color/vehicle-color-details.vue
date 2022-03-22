<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="vehicleColor">
                <h2 class="jh-entity-heading"><span v-text="$t('jhtestApp.vehicleColor.detail.title')">VehicleColor</span> {{vehicleColor.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhtestApp.vehicleColor.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{vehicleColor.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicleColor.hexColor')">Hex Color</span>
                    </dt>
                    <dd>
                        <span>{{vehicleColor.hexColor}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicleColor.enabled')">Enabled</span>
                    </dt>
                    <dd>
                        <span>{{vehicleColor.enabled}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="vehicleColor.id" :to="{name: 'VehicleColorEdit', params: {vehicleColorId: vehicleColor.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./vehicle-color-details.component.ts">
</script>
