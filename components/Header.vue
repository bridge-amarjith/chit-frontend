<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/dashboard">Smart Chit</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="$auth.loggedIn">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ $auth.user.data.email }}</em>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item
            ><nuxt-link to="/register">Register</nuxt-link></b-nav-item
          >
          <b-nav-item> <nuxt-link to="login">Login</nuxt-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "HeaderPage",
  methods: {
    async logout() {
      console.log("hitt");
      await this.$auth.logout();
    },
  },
};
</script>
