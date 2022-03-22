<template>
  <div class="sidebar">
    <div class="menu-items">
      <b-navbar-nav>
        <b-nav-item class="items" to="/" exact>
          <span>
            <font-awesome-icon icon="home" />
            <span>NOT home</span>
          </span>
        </b-nav-item>
        <b-nav-item class="items" to="/" exact>
          <span>
            <font-awesome-icon icon="home" />
            <span>Home</span>
          </span>
        </b-nav-item>

        <b-nav-item-dropdown 
          left
          href="javascript:void(0);"
          id="account-menu"
          :class="{'router-link-active': subIsActive('/account')}"
          active-class="active"
          class="items">
          <span slot="button-content" class="navbar-dropdown-menu">
            <font-awesome-icon icon="user" />
            <span v-text="$t('global.menu.account.main')"></span>
          </span>

          <b-dropdown-item class="spans" v-if="!authenticated"  v-on:click="openLogin()" id="login" active-class="active">
            <font-awesome-icon icon="sign-in-alt" />
            <span v-text="$t('global.menu.account.login')"></span>
          </b-dropdown-item>
          <b-dropdown-item to="/register" tag="b-dropdown-item" id="register" v-if="!authenticated" active-class="active">
            <font-awesome-icon icon="user-plus" />
            <span v-text="$t('global.menu.account.register')"></span>
          </b-dropdown-item>

        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
  </div>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>

<style scoped>
.sidebar {
  position: relative; 
  background-color: #fafafa;
  height: 100%; 
}
.items {
  background-color: #33445511;
  padding: 2px;
  padding-left: 15px;
  margin-top: 5px;
  color: #333;
}
</style>


