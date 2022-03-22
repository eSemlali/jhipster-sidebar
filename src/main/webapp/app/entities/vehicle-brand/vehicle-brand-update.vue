<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhtestApp.vehicleBrand.home.createOrEditLabel" v-text="$t('jhtestApp.vehicleBrand.home.createOrEditLabel')">Create or edit a VehicleBrand</h2>
                <div>
                    <div class="form-group" v-if="vehicleBrand.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="vehicleBrand.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicleBrand.name')" for="vehicle-brand-name">Name</label>
                        <input type="text" class="form-control" name="name" id="vehicle-brand-name"
                            :class="{'valid': !$v.vehicleBrand.name.$invalid, 'invalid': $v.vehicleBrand.name.$invalid }" v-model="$v.vehicleBrand.name.$model"  required/>
                        <div v-if="$v.vehicleBrand.name.$anyDirty && $v.vehicleBrand.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicleBrand.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleBrand.name.minLength" v-text="$t('entity.validation.minlength', {min: 1})">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.vehicleBrand.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 500})">
                                This field cannot be longer than 500 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.vehicleBrand.enabled')" for="vehicle-brand-enabled">Enabled</label>
                        <input type="checkbox" class="form-check" name="enabled" id="vehicle-brand-enabled"
                            :class="{'valid': !$v.vehicleBrand.enabled.$invalid, 'invalid': $v.vehicleBrand.enabled.$invalid }" v-model="$v.vehicleBrand.enabled.$model"  required/>
                        <div v-if="$v.vehicleBrand.enabled.$anyDirty && $v.vehicleBrand.enabled.$invalid">
                            <small class="form-text text-danger" v-if="!$v.vehicleBrand.enabled.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.vehicleBrand.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./vehicle-brand-update.component.ts">
</script>
