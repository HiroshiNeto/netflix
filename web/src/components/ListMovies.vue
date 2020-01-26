<template>
  <div id="Movies">
    <div class="container">
      <div class="row">
        <div class="col s6">
          <router-link to="profiles">
            <button class="btn grey" >
              Voltar para os Perfis
            </button>
          </router-link>
        </div>
        <div class="col s6 right-align">
           <router-link to="movies">
            <button class="btn green lighten-2" >
              Procurar Filme
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <h4 class="gray--text text-lighten-5">Filmes Populares</h4>
      <div class="row">
        <div v-for="(moviePopular, index) in this.moviesPopular.results" :key="moviePopular.id" class="col s3" >
          <div class="card" style="height:600px">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="'http://image.tmdb.org/t/p/w185_and_h278_face/' + moviePopular.poster_path">
            </div>
            <div class="card-content">
              <h6 class="card-title activator gray-text text-darken-5">{{ moviePopular.title }}</h6>
              <router-link to="interest_list">
                <button class="btn grey" @click.prevent="">
                  Ver
                </button>
              </router-link>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
              <div class="row" style="margin-top:65px">
                <button class="btn blue darken-2" @click.prevent="addInterestList(moviePopular.id)">
                  <span >
                    <i class="material-icons ">list</i> Adicionar na Lista de interesse
                  </span>
                </button>
              </div>
              <div class="row">
                <button class="btn blue darken-4" @click.prevent="addWatchList(moviePopular.id)">
                  <span>
                    <i class="material-icons ">visibility</i> Ver Depois
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="gray--text text-lighten-5" id="interest" v-if="this.interestLists.length > 0" >Filmes que você Separou</h4>
      <div class="row">
        <div v-for="(movieInterest, index) in this.interestLists" :key="movieInterest.id" class="col s3">
          <div class="card" style="height:600px">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="'http://image.tmdb.org/t/p/w185_and_h278_face/' + movieInterest.movie.poster_path">
            </div>
            <div class="card-content">
              <h6 class="card-title activator gray-text text-darken-5">{{ movieInterest.movie.title }}</h6>
              <router-link to="interest_list">
                <button class="btn grey" @click.prevent="">
                  Ver
                </button>
              </router-link>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
              <div class="row">
                <button class="btn blue darken-4" @click.prevent="addWatchList(movieInterest.movie.id)">
                <span>
                  <i class="material-icons ">visibility</i>  Ver depois</span>
                </button>
              </div>
              <div class="row">
                <button class="btn red darken-4" @click.prevent="deleteInterestList(movieInterest.id, index)">
                  <span>
                    <i class="material-icons ">remove_circle_outline</i>  Retirar da lista
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       <h4 class="gray--text text-lighten-5" v-if="this.watchList.length > 0" >Filmes marcados para ver depois</h4>
      <div class="row">
        <div v-for="(watch, index) in this.watchList" :key="watch.id" class="col s3">
          <div class="card" style="height:600px">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="'http://image.tmdb.org/t/p/w185_and_h278_face/' + watch.movie.poster_path">
            </div>
            <div class="card-content">
              <h6 class="card-title activator gray-text text-darken-5">{{ watch.movie.title }}</h6>
              <router-link to="interest_list">
                <button class="btn grey" @click.prevent="">
                  Ver
                </button>
              </router-link>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
              <div class="row" style="margin-top:65px">
                <button class="btn light-green darken-4" @click.prevent="updateViewed(watch.id, index)">
                  <span>
                    <i class="material-icons ">check</i>  Visualizado
                  </span>
                </button>
              </div>
              <div class="row">
                <button class="btn blue darken-4" @click.prevent="addWatchList(watch.movie.id)">
                <span>
                  <i class="material-icons ">visibility</i>  Ver depois</span>
                </button>
              </div>
              <div class="row">
                <button class="btn red darken-4" @click.prevent="deleteInterestList(watch.id, index)">
                  <span>
                    <i class="material-icons ">remove_circle_outline</i>  Retirar da lista
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="gray--text text-lighten-5" v-if="this.moviesViewed.length > 0" >Filmes Visualizados</h4>
      <div class="row">
        <div v-for="(movieViewed, index) in this.moviesViewed" :key="movieViewed.id" class="col s3">
          <div class="card" style="height:600px">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="'http://image.tmdb.org/t/p/w185_and_h278_face/' + movieViewed.movie.poster_path">
            </div>
            <div class="card-content">
              <h6 class="card-title activator gray-text text-darken-5">{{ movieViewed.movie.title }}</h6>
              <router-link to="interest_list">
                <button class="btn grey" @click.prevent="">
                  Ver
                </button>
              </router-link>
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
    moviesPopular: [],
    interestLists: [],
    interest: {
      movie_id: '',
      profile_id: ''
    },
    watchList: [],
    watch: {
      movie_id: '',
      profile_id: ''
    },
    currentProfile: {},
    moviesViewed: []
  }),
  computed: {
    ...mapGetters([
        'getMovies',
        'getCurrentProfile',
        'getInterestList',
        'getCurrentProfile',
        'getWatchList',
        'getMoviesViewed'
      ])
  },
  async mounted () {
    await this.ActionListMovies()
    await this.ActionGetCurrentProfile()

    this.currentProfile = this.getCurrentProfile

    await this.ActionListInterestList(this.currentProfile)
    await this.ActionListWatchList(this.currentProfile)
    await this.ActionListMoviesViewed(this.currentProfile)

    this.watchList = this.getWatchList
    this.moviesPopular = this.getMovies
    this.interestLists = this.getInterestList
    this.moviesViewed = this.getMoviesViewed
  },
  methods: {
    ...mapActions([
      'ActionListMovies',
      'ActionListInterestList',
      'ActionGetCurrentProfile',
      'ActionAddWatchList',
      'ActionCreateInterestList',
      'ActionDeleteInterestList',
      'ActionUpdateViewed',
      'ActionListMoviesViewed',
      'ActionListWatchList',
      'ActionDeleteWatchList'

    ]),
    async addWatchList(movieId){
      try {
        this.watch.profile_id = this.currentProfile.id
        this.watch.movie_id = movieId
        await this.ActionAddWatchList(this.watch)
        this.watchList = this.$store.state.watchList
      } catch (err) {
        console.log(err.data)
      }
    },
    async updateViewed(listId, index) {
      try {
        var interest_list_id = listId
        await this.ActionUpdateViewed(interest_list_id)
        this.$router.go(0)
       } catch  (err) {
        console.log(err)
      }
    },
    async deleteInterestList(listId, index) {
      try {
        var interest_list_id = listId
        await this.ActionDeleteInterestList(interest_list_id)
        this.interestLists.splice(index, 1)
      } catch  (err) {
        console.log(err)
      }
    },
    async deleteWatchList(listId, index) {
      try {
        var interest_list_id = listId
        await this.ActionDeleteInterestList(interest_list_id)
        this.watchList.splice(index, 1)
      } catch  (err) {
        console.log(err)
      }
    },
    async addInterestList(movieId){
      try {
        this.interest.profile_id = this.currentProfile.id
        this.interest.movie_id = movieId
        await this.ActionCreateInterestList(this.interest)
        this.interestLists = this.$store.state.interestList
      } catch (err) {
        console.log(err.data)
      }
    }
  }
}
</script>
