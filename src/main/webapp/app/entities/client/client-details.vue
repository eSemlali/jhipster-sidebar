<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="client">
                <h2 class="jh-entity-heading"><span v-text="$t('jhtestApp.client.detail.title')">Client</span> {{client.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhtestApp.client.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{client.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.client.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{client.email}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.client.mobile')">Mobile</span>
                    </dt>
                    <dd>
                        <span>{{client.mobile}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.client.enabled')">Enabled</span>
                    </dt>
                    <dd>
                        <span>{{client.enabled}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.client.created')">Created</span>
                    </dt>
                    <dd>
                        <span v-if="client.created">{{$d(Date.parse(client.created), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhtestApp.client.lastUpdate')">Last Update</span>
                    </dt>
                    <dd>
                        <span v-if="client.lastUpdate">{{$d(Date.parse(client.lastUpdate), 'long') }}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="client.id" :to="{name: 'ClientEdit', params: {clientId: client.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./client-details.component.ts">
</script>
