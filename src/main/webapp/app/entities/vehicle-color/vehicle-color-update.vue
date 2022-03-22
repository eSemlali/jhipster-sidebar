<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhtestApp.vehicleColor.home.createOrEditLabel" v-text="$t('jhtestApp.vehicleColor.home.createOrEditLabel')">Create or edit a VehicleColor</h2>
                <div>
                    <div class="form-group" v-if="vehicleColor.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="vehicleColor.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicleColor.name')" for="vehicle-color-name">Name</label>
                        <input type="text" class="form-control" name="name" id="vehicle-color-name"
                            :class="{'valid': !$v.vehicleColor.name.$invalid, 'invalid': $v.vehicleColor.name.$invalid }" v-model="$v.vehicleColor.name.$model"  required/>
                        <div v-if="$v.vehicleColor.name.$anyDirty && $v.vehicleColor.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicleColor.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleColor.name.minLength" v-text="$t('entity.validation.minlength', {min: 1})">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleColor.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 500})">
                                This field cannot be longer than 500 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicleColor.hexColor')" for="vehicle-color-hexColor">Hex Color</label>
                        <input type="text" class="form-control" name="hexColor" id="vehicle-color-hexColor"
                            :class="{'valid': !$v.vehicleColor.hexColor.$invalid, 'invalid': $v.vehicleColor.hexColor.$invalid }" v-model="$v.vehicleColor.hexColor.$model"  required/>
                        <div v-if="$v.vehicleColor.hexColor.$anyDirty && $v.vehicleColor.hexColor.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicleColor.hexColor.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleColor.hexColor.minLength" v-text="$t('entity.validation.minlength', {min: 6})">
                                This field is required to be at least 6 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleColor.hexColor.maxLength" v-text="$t('entity.validation.maxlength', {max: 6})">
                                This field cannot be longer than 6 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicleColor.enabled')" for="vehicle-color-enabled">Enabled</label>
                        <input type="checkbox" class="form-check" name="enabled" id="vehicle-color-enabled"
                            :class="{'valid': !$v.vehicleColor.enabled.$invalid, 'invalid': $v.vehicleColor.enabled.$invalid }" v-model="$v.vehicleColor.enabled.$model"  required/>
                        <div v-if="$v.vehicleColor.enabled.$anyDirty && $v.vehicleColor.enabled.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicleColor.enabled.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.vehicleColor.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./vehicle-color-update.component.ts">
</script>
