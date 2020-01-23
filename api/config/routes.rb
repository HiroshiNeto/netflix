Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do 
      post  'auth'              =>  'sessions#auth'
      post  'accounts/create'   =>  'accounts#create'
      post  'profiles/create'   =>  'profiles#create'
      post  'interest_lists/create'   =>  'interest_lists#create'

      get   'profiles/:profile_id/interest_lists'    =>  'interest_lists#index'
      get   'profiles'          =>  'profiles#index'
      get   'me'                =>  'accounts#me'
      get   'movies/:term'  =>  'movies#get_by_term'

      put   'profiles/:profile_id'   =>  'profiles#update'
      put   'update_me'         =>  'accounts#update_me'
      patch 'interest_lists/:interest_list_id/update_watchlist'  =>  'interest_lists#update_watchlist'
      patch 'interest_lists/:interest_list_id/update_viewed'  =>  'interest_lists#update_viewed'
      
      delete 'interest_lists/:interest_list_id' => 'interest_lists#delete'
      delete 'profiles/:profile_id' => 'profiles#delete'
    end

  end
end
