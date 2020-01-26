<template>
  <div id="Movies">
    <div class="container">
      <div class="row">
         <router-link to="list-movies">
            <button class="btn grey" >
              Voltar
            </button>
          </router-link>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <form>
            <label for="new-profile">Procurar Filme</label>
            <div class="row">
              <input
                v-model="form.term"
                placeholder="Digite um nome de filme ..."
                class="col s10"
                v-on:keyup.enter="submit"
              >
              <i class="material-icons col s2">search</i>
            </div>

        </form>
      </div>
      <div class="row">
        <div v-for="(movie, index) in this.movies.results" :key="movie.id" class="col s3" >
          <div class="card" style="height:600px">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="'http://image.tmdb.org/t/p/w185_and_h278_face/' + movie.poster_path">
            </div>
            <div class="card-content">
              <h6 class="card-title activator gray-text text-darken-5">{{ movie.title }}</h6>
              <router-link to="interest_list">
                <button class="btn grey" @click.prevent="">
                  Ver
                </button>
              </router-link>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
              <div class="row" style="margin-top:65px">
                <button class="btn blue darken-2" @click.prevent="addInterestList(movie.id)">
                  <span >
                    <i class="material-icons ">list</i> Adicionar na Lista de interesse
                  </span>
                </button>
              </div>
              <div class="row">
                <button class="btn blue darken-4" @click.prevent="addWatchList(movie.id)">
                  <span>
                    <i class="material-icons ">visibility</i> Ver Depois
                  </span>
                </button>
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
    movies: [],
    form: {
      term: ''
    },
    watch: {
      profile_id: '',
      movie_id: ''
    },
    interest: {
      movie_id: '',
      profile_id: ''
    },
    currentProfile: {}
  }),
  computed: {
    ...mapGetters([
        'getMovies',
        'getCurrentProfile'
      ])
  },
  async mounted () {
    await this.ActionGetCurrentProfile()
    this.currentProfile = this.getCurrentProfile

  },
  methods: {
    ...mapActions([
      'ActionSearchMovie',
      'ActionAddWatchList',
      'ActionCreateInterestList',
      'ActionGetCurrentProfile'
    ]),
    async addWatchList(movieId){
      try {
        this.watch.profile_id = this.currentProfile.id
        this.watch.movie_id = movieId
        await this.ActionAddWatchList(this.watch)
        this.$router.push('/list-movies#')

      } catch (err) {
        console.log(err)
      }
    },
    async addInterestList(movieId){
      try {
        this.interest.profile_id = this.currentProfile.id
        this.interest.movie_id = movieId
        await this.ActionCreateInterestList(this.interest)
        this.$router.push('/list-movies#interest')
      } catch (err) {
        console.log(err)
      }
    },
    async submit(){
      try {
        await this.ActionSearchMovie(this.form.term)
        this.movies = this.getMovies
      } catch (err) {
        console.log(err)
      }
    },

  }
}
</script>
