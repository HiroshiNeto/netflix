<template>
  <div id="Profile">
    <div class="container">
      <div class="row">
        <div class="col s12 right-align">
           <router-link to="/">
            <button class="btn red darken-2" @click.prevent="logout()" >
              Sair
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="center-align valign-wrapper col s12 margin">
          <form>
            <div class="row" v-if="this.profiles.length < 4">
              <div class="col s4">
                  <label for="new-profile">Adicionar Perfil:</label>
                  <input
                    v-model="profile.name"
                    placeholder="Nome do Perfil"
                  >
              </div>
              <div class="col s3">
                <button class="btn waves-effect waves-light" @click.prevent="submit()">
                  +
                </button>
              </div>
            </div>
          </form>
          <div v-for="(profile, index) in this.profiles" :key="profile.id" class="col s3">
            <div class="card" v-bind:class="{ mainProfile: mainProfile(profile.id, index) }" v-bind:style="{ backgroundColor:getRandomColor()}">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" :src="'http://lorempixel.com.br/180/160/?'+ profile.id">
              </div>
              <div class="card-content">
                <h6 class="card-title activator green-text text-lighten-5">{{ profile.name }}</h6>
                <router-link to="list-movies">
                  <button class="btn grey" @click.prevent="setCurrentProfile(profile)">
                    Entrar
                  </button>
                </router-link>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                <h6 style="margin-top:30px">Deseja deletar ou tonar esse perfil principal?</h6>
                <div class="row" style="margin-top:15px">
                  <button class="btn red darken-4" @click.prevent="removeProfile(profile.id, index)">
                    Remover
                  </button>
                </div>
                <div class="row">
                  <button class="btn blue darken-4" @click.prevent="updateDefaultProfile(profile.id)">
                    Tornar Principal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Profile',
  data: () => ({
    profiles: [],
    profile: {
      name: ''
    },
    current_account: {},
    main_profile: true
  }),
  computed: {
    ...mapGetters(['getProfiles', 'getCurrentUser'])
  },
  async mounted () {
    await this.ActionSearchProfiles()
    await this. ActionCurrentUser()
    this.profiles = this.getProfiles
    this.current_account = this.getCurrentUser
  },
  methods: {
    ...mapActions([
      'ActionSearchProfiles',
      'ActionSaveProfile',
      'ActionRemoveProfile',
      'ActionUpdateDefaultProfile',
      'ActionSetCurrentProfile',
      'ActionSignOut',
      'ActionCurrentUser'
    ]),
    mainProfile (profile_id, index) {
      if (this.getProfiles.length < 1 ) {
        this.ActionUpdateDefaultProfile(profile_id)
        this.current_account.default_profile_id = profile_id
      }
      if (this.current_account.default_profile_id != null)
        return this.current_account.default_profile_id == profile_id

    },
    async logout () {
      await this.ActionSignOut()
      this.$router.push('/')
    },
    async setCurrentProfile (profile) {
      await this.ActionSetCurrentProfile(profile)
      this.$router.push('/list-movies')
    },
    getRandomColor () {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
    async submit () {
      try {
        await this.ActionSaveProfile(this.profile)
        await this.ActionSearchProfiles()
        this.profiles = this.getProfiles
      } catch (err) {
        console.log(err)
      }
    },
    async removeProfile (id, index) {
      try {
        await this.ActionRemoveProfile(id)
        this.profiles.splice(index, 1)
      } catch (err) {
        console.log(err.data)
      }
    },
    async updateDefaultProfile (id) {
      try {
        await this.ActionUpdateDefaultProfile(id)
        this.current_account.default_profile_id = id
      } catch (err) {
        console.log(err.data)
      }
    }
  }
}
</script>

<style >
  .mainProfile {
    box-shadow: rgb(239, 255, 0) 0px 0px 14px 4px !important;
  }
  .margin{
    margin-top: 150px;
  }
  .dimension{
    width: 180px !important;
    height: 160px !important;
    margin-left:10px !important;
    margin-right:10px !important;
  }
  .text-center{
    margin:auto;
    width: 100%;
    text-align: center;
  }
</style>
