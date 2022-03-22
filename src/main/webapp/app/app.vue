<template>
  <div id="app">
    <ribbon></ribbon>
    <div id="app-header">
      <jhi-sidebar></jhi-sidebar>
    </div>
    <div id="app-main">
      <div id="app-side">
        <jhi-navbar></jhi-navbar>
      </div>
      <div class="container-fluid">
        <div class="card jh-card">
          <router-view></router-view>
        </div>
        <b-modal id="login-page" hide-footer lazy>
          <span slot="modal-title" id="login-title" v-text="$t('login.title')"></span>
          <login-form></login-form>
        </b-modal>
      </div>
    </div>
    <div id="app-footer">
      <jhi-footer></jhi-footer>
    </div>
  </div>
</template>

<script lang="ts" src="./app.component.ts">
</script>

<style scoped>
  #app-main {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0 !important;
    min-height: calc(100vh - 120px);
  }
</style>