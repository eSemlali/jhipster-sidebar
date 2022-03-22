<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhtestApp.vehicleType.home.createOrEditLabel" v-text="$t('jhtestApp.vehicleType.home.createOrEditLabel')">Create or edit a VehicleType</h2>
                <div>
                    <div class="form-group" v-if="vehicleType.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="vehicleType.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicleType.name')" for="vehicle-type-name">Name</label>
                        <input type="text" class="form-control" name="name" id="vehicle-type-name"
                            :class="{'valid': !$v.vehicleType.name.$invalid, 'invalid': $v.vehicleType.name.$invalid }" v-model="$v.vehicleType.name.$model"  required/>
                        <div v-if="$v.vehicleType.name.$anyDirty && $v.vehicleType.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicleType.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleType.name.minLength" v-text="$t('entity.validation.minlength', {min: 1})">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleType.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 500})">
                                This field cannot be longer than 500 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicleType.enabled')" for="vehicle-type-enabled">Enabled</label>
                        <input type="checkbox" class="form-check" name="enabled" id="vehicle-type-enabled"
                            :class="{'valid': !$v.vehicleType.enabled.$invalid, 'invalid': $v.vehicleType.enabled.$invalid }" v-model="$v.vehicleType.enabled.$model"  required/>
                        <div v-if="$v.vehicleType.enabled.$anyDirty && $v.vehicleType.enabled.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicleType.enabled.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.vehicleType.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./vehicle-type-update.component.ts">
</script>
