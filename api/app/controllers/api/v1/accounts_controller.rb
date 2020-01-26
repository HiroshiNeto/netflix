module Api::V1
    class AccountsController < ApiController
        skip_before_action :require_login, only: [:create], raise: false

        # POST /api/v1/accounts/create
        def create
            if Account.find_by(email: account_params[:email])
                render json: { error: 'Email already exists'}, status: 400
            else
                account = Account.create!(account_params)
                  
                render json: { token: account.token }
            end
        end
  
        # GET /api/v1/me
        def me
            account = current_account
            render json: account, each_serializer: AccountSerializer
        end
        
        # PATCH /api/v1/accounts/update_profile_default/:default_profile
        def update_profile_default
            account = current_account.update_columns(profile_id: account_params[:default_profile])
            render json: account
        end

        # PUT /api/v1/update_me
        def update_me
            account = current_account.update_columns(
                            name: account_params[:name], 
                            birthday: account_params[:birthday],
                            )
            render json: account
        end
      
        private
        def account_params
            params.permit(
              :name,
              :default_profile,
              :email,
              :password,
              :birthday
            )
        end
    end
end
  