Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do 
      post  'auth'              =>  'sessions#auth'
      post  'accounts/create'   =>  'accounts#create'
      post  'profiles/create'   =>  'profiles#create'
      post  'interest_lists/create'   =>  'interest_lists#create'
      post  'interest_lists/add_watch_list'  =>  'interest_lists#add_watchlist'


      get   'profiles/:profile_id/interest_lists'    =>  'interest_lists#index'
      get   'profiles/:profile_id/watch_lists'    =>  'interest_lists#get_watch_lists'
      get   'profiles'          =>  'profiles#index'
      get   'me'                =>  'accounts#me'
      get   'movies/:term'  =>  'movies#get_by_term'
      get   'movies'            => 'movies#get_top_movies'

      put   'profiles/:profile_id'   =>  'profiles#update'
      put   'update_me'         =>  'accounts#update_me'
      patch 'interest_lists/:interest_list_id/update_viewed'  =>  'interest_lists#update_viewed'
      patch 'accounts/update_profile_default/:default_profile' =>  'accounts#update_profile_default'
      
      delete 'interest_lists/:interest_list_id' => 'interest_lists#delete'
      delete 'profiles/:profile_id' => 'profiles#delete'
    end

  end
end
