<template>
  <div class="home content-center mt-6 h-full text-center">
    <div class="text-emerald-600 font-bold">
      <router-link :to="{ name: 'LogIn'}" >Login |</router-link>
    <router-link :to="{ name: 'Register'}" class="pl-1">Register</router-link>
    </div>
    <HelloWorld msg="Welcome to Vue App" class="text-3xl"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
