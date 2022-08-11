<template>
  <form 
    @submit.prevent="login"
    class="main lg:max-h-screen lg:pt-32 xl:pt-24"
  >
    <div class="contain flex flex-col lg:flex-row lg:mx-32 lg:space-x-10 lg:rounded-xl lg:px-11 xl:mx-64 xl:py-8">
      <div class="img text-center w-full lg:flex-1">
        <img
          class="mx-auto mt-6 w-48 sm:w-64 lg:w-72"
          src="../assets/image/logo.png"
          alt=""
        />
        <p class="font-bold text-orange-500 text-2xl py-3 md:py-5">
          The Best Banking Account Management
        </p>
      </div>
      <div class="lg:flex-1 lg:my-auto">
        <div class="user flex flex-col">
          <label class="mt-2" for="email">Email :</label>
          <input
            class="border rounded-md p-2 mt-1"
            id="email"

            type="text"
            placeholder="Email"
            v-model="login_form.email"
          />
          
        </div>
        <div class="pass flex flex-col">
          <label class="mt-2" for="password">Password :</label>
          <input
            class="border rounded-md p-2 mt-1"
            id="password"

            type="password"
            placeholder="Password"
            v-model="login_form.password"
          />
          
        </div>
        <div class="mt-6">
          <button
            class="text-center w-full py-2 bg-orange-400 rounded-md text-white font-bold"
            type="submit"
            
          >
            Log In
          </button>
        </div>
        <div class="flex flex-row mt-3">
          <p>I don't have account.</p>
          <p>
            <router-link :to="{ name: 'Register' }" class="pl-2 text-orange-500 font-bold" >Register</router-link>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const login_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch('login', login_form.value);
    }

    return {
      login_form,
      store,
      login
    }
  }
}
</script>

<style scoped>
input.error {
  border-color: red;
}
@media only screen and (max-width:400px) {
  .main {
    padding: 1em;
  }
}
@media only screen and (max-width:1023px) and (min-width: 401px) {
  .main {
    padding: 2em;
  }
}
@media only screen and (min-width:1024px) {
  .main {
    height: 100vh;
    background-image: url(../assets/image/bg-login.png);
  }
  .contain {
    background-color: white;
  }
}
</style>