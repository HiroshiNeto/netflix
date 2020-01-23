Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do 
      post  'auth'              =>  'sessions#auth'
      post  'accounts/create'   =>  'accounts#create'
      post  'profiles/create'   =>  'profiles#create'

      get   'profiles'          =>  'profiles#index'
      get   'me'                =>  'accounts#me'
      put   'profiles/:profile_id'   =>  'profiles#update'
      put   'update_me'         =>  'accounts#update_me'
      
      delete 'profiles/:profile_id' => 'profiles#delete'
    end

  end
end
