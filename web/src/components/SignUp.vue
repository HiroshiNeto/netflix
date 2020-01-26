<template>
  <form>
    <div class="container text-center margin-login">
      <div class="row" >
        <div class="input-field col s6 ">
          <input v-model="form.email" id="email" type="email" class="validate" required>
          <label class="active white-text text-ligthten-2" for="Email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 ">
          <input id="password" v-model="form.password" type="password" class="validate" required>
          <label class="active white-text text-ligthten-2" for="Password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 ">
          <input id="name" v-model="form.name" type="text" class="validate" required>
          <label class="active white-text text-ligthten-2" for="Nome">Nome</label>
        </div>
      </div>
       <div class="row">
        <div class="input-field col s6 ">
          <input id="birthday" v-model="form.birthday" type="text" class="validate" required>
          <label class="active white-text text-ligthten-2" for="Data de nascimento">Data de nascimento</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 ">
         <button class="btn waves-effect waves-light" @click.prevent="submit()">
            Entrar
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
      password: null,
      name: null,
      birthday: null
    }
  }),
  methods: {
    ...mapActions(['ActionAuthLogin', 'ActionCreateAccount']),
    async submit () {
      try {
        await this.ActionCreateAccount(this.form)
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
