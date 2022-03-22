<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhtestApp.client.home.createOrEditLabel" v-text="$t('jhtestApp.client.home.createOrEditLabel')">Create or edit a Client</h2>
                <div>
                    <div class="form-group" v-if="client.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="client.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.client.name')" for="client-name">Name</label>
                        <input type="text" class="form-control" name="name" id="client-name"
                            :class="{'valid': !$v.client.name.$invalid, 'invalid': $v.client.name.$invalid }" v-model="$v.client.name.$model"  required/>
                        <div v-if="$v.client.name.$anyDirty && $v.client.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.name.minLength" v-text="$t('entity.validation.minlength', {min: 1})">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.name.maxLength" v-text="$t('entity.validation.maxlength', {max: 500})">
                                This field cannot be longer than 500 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.client.email')" for="client-email">Email</label>
                        <input type="text" class="form-control" name="email" id="client-email"
                            :class="{'valid': !$v.client.email.$invalid, 'invalid': $v.client.email.$invalid }" v-model="$v.client.email.$model" />
                        <div v-if="$v.client.email.$anyDirty && $v.client.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.email.minLength" v-text="$t('entity.validation.minlength', {min: 1})">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.email.maxLength" v-text="$t('entity.validation.maxlength', {max: 500})">
                                This field cannot be longer than 500 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.client.mobile')" for="client-mobile">Mobile</label>
                        <input type="text" class="form-control" name="mobile" id="client-mobile"
                            :class="{'valid': !$v.client.mobile.$invalid, 'invalid': $v.client.mobile.$invalid }" v-model="$v.client.mobile.$model" />
                        <div v-if="$v.client.mobile.$anyDirty && $v.client.mobile.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.mobile.minLength" v-text="$t('entity.validation.minlength', {min: 1})">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.mobile.maxLength" v-text="$t('entity.validation.maxlength', {max: 500})">
                                This field cannot be longer than 500 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.client.enabled')" for="client-enabled">Enabled</label>
                        <input type="checkbox" class="form-check" name="enabled" id="client-enabled"
                            :class="{'valid': !$v.client.enabled.$invalid, 'invalid': $v.client.enabled.$invalid }" v-model="$v.client.enabled.$model"  required/>
                        <div v-if="$v.client.enabled.$anyDirty && $v.client.enabled.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.enabled.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.client.created')" for="client-created">Created</label>
                        <div class="d-flex">
                            <input id="client-created" type="datetime-local" class="form-control" name="created" :class="{'valid': !$v.client.created.$invalid, 'invalid': $v.client.created.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.client.created.$model)"
                            @change="updateInstantField('created', $event)"/>
                        </div>
                        <div v-if="$v.client.created.$anyDirty && $v.client.created.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.created.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.created.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhtestApp.client.lastUpdate')" for="client-lastUpdate">Last Update</label>
                        <div class="d-flex">
                            <input id="client-lastUpdate" type="datetime-local" class="form-control" name="lastUpdate" :class="{'valid': !$v.client.lastUpdate.$invalid, 'invalid': $v.client.lastUpdate.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.client.lastUpdate.$model)"
                            @change="updateInstantField('lastUpdate', $event)"/>
                        </div>
                        <div v-if="$v.client.lastUpdate.$anyDirty && $v.client.lastUpdate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.lastUpdate.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.lastUpdate.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.client.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./client-update.component.ts">
</script>
