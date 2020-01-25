<template>
  <form>
    <div class="container text-center margin-login">
      <div class="row" >
        <div class="input-field col s6 ">
          <input v-model="form.email" id="email" type="text" class="validate">
          <label class="active" for="Email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 ">
          <input id="password" v-model="form.password" type="password" class="validate">
          <label class="active" for="Password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 ">
         <button class="btn waves-effect waves-light" @click.prevent="submit()">
            Submit
          </button>
        </div>
      </div>
    </div>

  </form>

</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    form: {
      email: null,
      password: null
    }
  }),
  methods: {
    ...mapActions(['ActionAuthLogin', 'ActionCurrentUser']),
    async submit () {
      try {
        await this.ActionAuthLogin(this.form)
        await this.ActionCurrentUser()
        this.$router.push('/profiles')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style >
  .margin-login{
    margin-top:80px !important;
    margin-left: 30% !important;
    margin-right: 30% !important;
  }
</style>
