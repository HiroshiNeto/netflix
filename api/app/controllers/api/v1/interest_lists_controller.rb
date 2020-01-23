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
        
        # GET /api/v1/interest_lists/:profile_id
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
            if profile_is_correct? 
                interest_list = InterestList.find(params[:interest_list_id])
                render json: InterestList.destroy(interest_list.id)
            else
                render json: { error: 'Profile not allowed' }, status: 403
            end
        end
      
        private
        def interest_list_params
            params.permit(
              :movie_id,
              :profile_id,
              :viewed,
              :watchlist

            )
        end

        def profile_is_correct? 
            profile = Profile.find(interest_list_params[:profile_id])
            profile.account == current_account
        end
    end
end
  