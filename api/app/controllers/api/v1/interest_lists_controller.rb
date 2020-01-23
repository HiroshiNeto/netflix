module Api::V1
    class InterestListsController < ApiController
        
            
        # POST /api/v1/interest_lists/create
        def create
            if profile_is_correct?
                interest_list = InterestList.create!(interest_list_params)
                render json: interest_list, serializer: InterestListSerializer
            else
                render json: { error: 'Profile not allowed' }, status: 403
            end
        end
        
        # GET /api/v1/profiles/:profile_id/interest_lists
        def index
            if profile_is_correct? 
                interest_list = InterestList.where(profile_id: interest_list_params[:profile_id] )
                render json: interest_list, each_serializer: InterestListSerializer
            else
                render json: { error: 'Profile not allowed' }, status: 403
            end
        end
      
        # DELETE /api/v1/interest_lists/:interest_list_id
        def delete
            interest_list_id = interest_list_params[:interest_list_id]
            if interest_list_is_correct? interest_list_id
                interest_list = InterestList.find(interest_list_params[:interest_list_id])
                render json: InterestList.destroy(interest_list.id)
            else
                render json: { error: 'Profile not allowed' }, status: 403
            end
        end
        
        # PUT /api/v1/interest_lists/:interest_list_id/watchlist
        def update_watchlist
            interest_list_id = interest_list_params[:interest_list_id]
            if interest_list_is_correct? interest_list_id
                interest_list = InterestList.find(interest_list_id)
                interest_list.update(watchlist: !interest_list.watchlist )
                render json: interest_list
            else
                render json: {error: 'Interest List not allowed'}, status: 403
            end
        end
        # PUT /api/v1/interest_lists/:interest_list_id/viewed
        def update_viewed
            interest_list_id = interest_list_params[:interest_list_id]
            if interest_list_is_correct? interest_list_id
                interest_list = InterestList.find(interest_list_id)
                interest_list.update(viewed: !interest_list.viewed )
                render json: interest_list
            else
                render json: {error: 'Interest List not allowed'}, status: 403
            end
        end

        private
        def interest_list_params
            params.permit(
              :movie_id,
              :profile_id,
              :viewed,
              :watchlist,
              :interest_list_id
            )
        end

        def profile_is_correct? 
            profile = Profile.find(interest_list_params[:profile_id])
            profile.account == current_account
        end

        def interest_list_is_correct? interest_list_id
            return false if interest_list_id.nil?
            interest_list = InterestList.find(interest_list_id)
            current_account.profiles.include?(interest_list.profile)
        end
    end
end
  