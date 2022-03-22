<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="vehicleBrand">
                <h2 class="jh-entity-heading"><span v-text="$t('jhtestApp.vehicleBrand.detail.title')">VehicleBrand</span> {{vehicleBrand.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhtestApp.vehicleBrand.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{vehicleBrand.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.vehicleBrand.enabled')">Enabled</span>
                    </dt>
                    <dd>
                        <span>{{vehicleBrand.enabled}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="vehicleBrand.id" :to="{name: 'VehicleBrandEdit', params: {vehicleBrandId: vehicleBrand.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./vehicle-brand-details.component.ts">
</script>
