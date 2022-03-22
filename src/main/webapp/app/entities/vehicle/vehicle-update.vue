<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhtestApp.vehicle.home.createOrEditLabel" v-text="$t('jhtestApp.vehicle.home.createOrEditLabel')">Create or edit a Vehicle</h2>
                <div>
                    <div class="form-group" v-if="vehicle.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="vehicle.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicle.plate')" for="vehicle-plate">Plate</label>
                        <input type="text" class="form-control" name="plate" id="vehicle-plate"
                            :class="{'valid': !$v.vehicle.plate.$invalid, 'invalid': $v.vehicle.plate.$invalid }" v-model="$v.vehicle.plate.$model"  required/>
                        <div v-if="$v.vehicle.plate.$anyDirty && $v.vehicle.plate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicle.plate.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicle.plate.minLength" v-text="$t('entity.validation.minlength', {min: 1})">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicle.plate.maxLength" v-text="$t('entity.validation.maxlength', {max: 500})">
                                This field cannot be longer than 500 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicle.created')" for="vehicle-created">Created</label>
                        <div class="d-flex">
                            <input id="vehicle-created" type="datetime-local" class="form-control" name="created" :class="{'valid': !$v.vehicle.created.$invalid, 'invalid': $v.vehicle.created.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.vehicle.created.$model)"
                            @change="updateInstantField('created', $event)"/>
                        </div>
                        <div v-if="$v.vehicle.created.$anyDirty && $v.vehicle.created.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicle.created.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicle.created.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicle.lastUpdate')" for="vehicle-lastUpdate">Last Update</label>
                        <div class="d-flex">
                            <input id="vehicle-lastUpdate" type="datetime-local" class="form-control" name="lastUpdate" :class="{'valid': !$v.vehicle.lastUpdate.$invalid, 'invalid': $v.vehicle.lastUpdate.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.vehicle.lastUpdate.$model)"
                            @change="updateInstantField('lastUpdate', $event)"/>
                        </div>
                        <div v-if="$v.vehicle.lastUpdate.$anyDirty && $v.vehicle.lastUpdate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicle.lastUpdate.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicle.lastUpdate.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicle.vehicleType')" for="vehicle-vehicleType">Vehicle Type</label>
                        <select class="form-control" id="vehicle-vehicleType" name="vehicleType" v-model="vehicle.vehicleType">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="vehicle.vehicleType && vehicleTypeOption.id === vehicle.vehicleType.id ? vehicle.vehicleType : vehicleTypeOption" v-for="vehicleTypeOption in vehicleTypes" :key="vehicleTypeOption.id">{{vehicleTypeOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicle.vehicleColor')" for="vehicle-vehicleColor">Vehicle Color</label>
                        <select class="form-control" id="vehicle-vehicleColor" name="vehicleColor" v-model="vehicle.vehicleColor">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="vehicle.vehicleColor && vehicleColorOption.id === vehicle.vehicleColor.id ? vehicle.vehicleColor : vehicleColorOption" v-for="vehicleColorOption in vehicleColors" :key="vehicleColorOption.id">{{vehicleColorOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicle.vehicleBrand')" for="vehicle-vehicleBrand">Vehicle Brand</label>
                        <select class="form-control" id="vehicle-vehicleBrand" name="vehicleBrand" v-model="vehicle.vehicleBrand">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="vehicle.vehicleBrand && vehicleBrandOption.id === vehicle.vehicleBrand.id ? vehicle.vehicleBrand : vehicleBrandOption" v-for="vehicleBrandOption in vehicleBrands" :key="vehicleBrandOption.id">{{vehicleBrandOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicle.client')" for="vehicle-client">Client</label>
                        <select class="form-control" id="vehicle-client" name="client" v-model="vehicle.client">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="vehicle.client && clientOption.id === vehicle.client.id ? vehicle.client : clientOption" v-for="clientOption in clients" :key="clientOption.id">{{clientOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.vehicle.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./vehicle-update.component.ts">
</script>
