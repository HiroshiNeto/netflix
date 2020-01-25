<template>
  <div id="Movies">
    <div class="container">
      <h4 class="gray--text text-lighten-5" >Filmes Populares</h4>
      <div class="row">
        <div v-for="(moviePopular, index) in this.moviesPopular.results" :key="moviePopular.id" class="col s3" >
          <div class="card" style="height:600px">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="'http://image.tmdb.org/t/p/w185_and_h278_face/' + moviePopular.poster_path">
            </div>
            <div class="card-content">
              <h6 class="card-title activator gray-text text-darken-5">{{ moviePopular.title }}</h6>
              <router-link to="interest_list">
                <button class="btn grey" @click.prevent="setCurrentProfile(profile)">
                  Ver
                </button>
              </router-link>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
              <div class="row" style="margin-top:65px">
                <button class="btn blue darken-2" @click.prevent="addInterestList(moviePopular.id)">
                <div class="tooltip"><span><i class="material-icons ">list</i></span>
                  <span class="tooltiptext">Adicionar na lista</span>
                </div>
                </button>
              </div>
              <div class="row">
                <button class="btn blue darken-4" @click.prevent="addWatchList(moviePopular.id)">
                 <div class="tooltip"><span><i class="material-icons ">visibility</i></span>
                  <span class="tooltiptext">Ver depois</span>
                </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 class="gray--text text-lighten-5" >Filmes que você Separou</h4>
      <div class="row">
        <div v-for="(movieInterest, index) in this.interestLists" :key="movieInterest.id" class="col s3">
          <div class="card" style="height:600px">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" :src="'http://image.tmdb.org/t/p/w185_and_h278_face/' + movieInterest.movie.poster_path">
            </div>
            <div class="card-content">
              <h6 class="card-title activator gray-text text-darken-5">{{ movieInterest.movie.title }}</h6>
              <router-link to="interest_list">
                <button class="btn grey" @click.prevent="setCurrentProfile(profile)">
                  Ver
                </button>
              </router-link>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
              <div class="row" style="margin-top:65px">
                <button class="btn blue darken-2" @click.prevent="addInterestList(movieInterest.id)">
                <div class="tooltip"><span><i class="material-icons ">list</i></span>
                  <span class="tooltiptext">Adicionar na lista</span>
                </div>
                </button>
              </div>
              <div class="row">
                <button class="btn blue darken-4" @click.prevent="addWatchList(moviePopular.id)">
                 <div class="tooltip"><span><i class="material-icons ">visibility</i></span>
                  <span class="tooltiptext">Ver depois</span>
                </div>
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
    moviesPopular: [],
    interestLists: [],
    interest: {
      movie_id: '',
      profile_id: ''
    },
    watchList: [],
    currentProfile: {}
  }),
  computed: {
    ...mapGetters([
        'getMovies',
        'getCurrentProfile',
        'getInterestList',
        'getCurrentProfile',
        'getWatchList'
      ])
  },
  async mounted () {
    await this.ActionListMovies()
    await this.ActionGetCurrentProfile()
    this.currentProfile = this.getCurrentProfile
    await this.ActionListInterestList(this.currentProfile)
    this.moviesPopular = this.getMovies
    this.interestLists = this.getInterestList
  },
  methods: {
    ...mapActions([
      'ActionListMovies',
      'ActionListInterestList',
      'ActionGetCurrentProfile',
      'ActionAddWatchList',
      'ActionCreateInterestList'
    ]),
    async addWatchList(movieId){
      try{
        this.interest.profile_id = this.currentProfile.id
        this.interest.movie_id = movieId
        await this.ActionAddWatchList(this.interest)
        this.watchList = this.$store.state.interestList
      } catch (err) {
        console.log(err.data)
      }
    },
    async addInterestList(movieId){
      try{
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
<style lang="">
  /* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>

