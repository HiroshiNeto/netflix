module Api::V1
    class ProfilesController < ApiController
        
        # POST /api/v1/profiles/create
        def create
            account = current_account
            name = profile_params[:name]
            if account.profiles.length < 4
                profile = Profile.create!(name: name, account_id: account.id)
                render json: profile, serializer: ProfileSerializer
            else
                render json: { error: 'reached the profile limit' }, status: 400
            end
        end
        
        # GET /api/v1/profiles
        def index
            profiles = Profile.where(account_id: current_account.id )
            render json: profiles, each_serializer: ProfileSerializer
        end
      
        # PUT /api/v1/profiles/:profile_id
        def update
            profile = Profile.find_by(params[:profile_id])
      
            profile = profile.update!(profile_params)
            render json: profile
        end
      
        # DELETE /api/v1/profiles/:profile_id
        def delete
            profile = Profile.find(params[:profile_id])
            render json: Profile.destroy(profile.id)
        end
      
        private
        def profile_params
            params.permit(
              :name
            )
        end
    end
end
  