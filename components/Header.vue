<template>
  <nav class="bg-gray-900 px-2 sm:px-4 text-white py-2.5 fixed w-full z-20 top-0 left-0">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <span class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
        <span class="self-center text-xl font-semibold whitespace-nowrap">SmartChit</span>
      </span>
      <div class="flex" v-if="$auth.loggedIn">
        <button class="mt-2 pr-1" @click="isOpen = true">
          {{ $auth.user.data.email }}
        </button>
        <div class="relative">
          <button
            class="rounded-full overflow-hidden border-2 border-teal-500 w-10 h-10 flex justify-center items-center | hover:border-white focus:outline-none focus:border-white"
            @click="isOpen = true">
            <img src="https://i.pravatar.cc/150?u=1" alt="">
          </button>

          <div v-if="isOpen" class="fixed inset-0 w-full h-screen z-20 bg-black opacity-25" @click="isOpen = false">
          </div>
          <div class="absolute z-30 right-0 mt-2 focus:outline-none" :class="{ 'hidden': !isOpen }">
            <div class="bg-white shadow-lg py-2 w-48 divide-y divide-gray-200">
              <span @click="isOpen = false">
                <NuxtLink class="hover:no-underline block text-gray-700 font-semibold px-4 py-2 hover:bg-gray-200 hover:text-gray-700"
                  :to="'/' + $auth.user.data.role.toLowerCase() + '/dashboard'">
                  dashboard</NuxtLink>
              </span>
              <span @click="isOpen = false">
                <NuxtLink class="hover:no-underline block text-gray-700 font-semibold px-4 py-2  hover:bg-gray-200 hover:text-gray-700"
                  :to="'/' + $auth.user.data.role.toLowerCase() + '/profile'">
                  profile</NuxtLink>
              </span>
              <div>
                <span @click="logout()">
                <NuxtLink class="hover:no-underline block text-gray-700 font-semibold px-4 py-2 hover:bg-gray-200 hover:text-gray-700"
                  to="/login">
                  logout</NuxtLink>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex md:order-2" v-else>
        <NuxtLink to="/register"><button type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
          </button></NuxtLink>
        <button data-collapse-toggle="navbar-sticky" type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "HeaderPage",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async logout() {
      this.isOpen = false
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
  mounted() {
    this.isOpen = false
  },

};
</script>
