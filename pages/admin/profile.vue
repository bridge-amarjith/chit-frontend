<template>
  <div class="container mx-auto my-5 p-5">
    <div class="md:flex no-wrap md:-mx-2 ">
      <!-- Left Side -->
      <div class="w-full md:w-3/12 md:mx-2">
        <!-- Profile Card -->
        <div class="bg-white p-3 border-t-4 border-gray-400">
          <div class="image overflow-hidden">
            <img class="h-auto w-full mx-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwxtZJ9znjOxYBXNBhcptbY421PRD7yQ-VHUqxNoVjzrh1KlrZK2nwFttjrwwx1QAeCCY&usqp=CAU"
              alt="">
          </div>
          <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ $auth.user.data.name }}</h1>
          <!-- <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
          <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
            Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p> -->
          <ul
            class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li class="flex items-center py-3">
              <span>Status</span>
              <span class="ml-auto"><span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
            </li>
            <li class="flex items-center py-3">
              <span>Member since</span>
              <span class="ml-auto">{{ $auth.user.data.createdAt }}</span>
            </li>
          </ul>
        </div>
        <!-- End of profile card -->
        <div class="my-4"></div>
      </div>
      <!-- Right Side -->
      <div class="w-full md:w-9/12 mx-2 h-64">
        <!-- Profile tab -->
        <!-- About Section -->
        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span class="tracking-wide">About</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">First Name</div>
                <div class="px-4 py-2">{{ $auth.user.data.name }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Contact No.</div>
                <div class="px-4 py-2">{{ $auth.user.data.phoneNo }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Email.</div>
                <div class="px-4 py-2">
                  <a class="text-blue-800">{{ $auth.user.data.email }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of about section -->

        <div class="my-4"></div>

        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span class="tracking-wide">Change Password</span>
          </div>
          <Changepassword :changePass="changePass" />
        </div>
        <!-- End of profile tab -->
      </div>
    </div>
  </div>
</template>

<script>
import Changepassword from '../../components/Changepassword.vue';
import Changepassword1 from '../../components/Changepassword.vue';
export default {
  middleware: ["auth"],
  components: { Changepassword, Changepassword1 },
  data() {
    return {
      changePass: {
        oldpassword: "",
        newpassword: "",
        confirmnewpassword: ""
      },
      updateForm: {
        email: "",
        name: "test",
        password: "",
        phoneNo: "",
      },
      submitted: false,
    }
  }
}
</script>
