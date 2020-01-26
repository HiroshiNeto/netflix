module Api::V1
    class SessionsController < ApiController
      skip_before_action :require_login, only: [:auth], raise: false

      def auth
        email = params[:email]
        password = params[:password]
  
        account = Account.valid_login?(email)
  
        unless account
          return render_unauthorized("User not found")
        end
  
        unless account.authenticate(password)
          return render_unauthorized("Incorrect password")
        end
  
        return send_auth_token_for_valid_login_of(account)
  
      end
  
      private
  
      def send_auth_token_for_valid_login_of(account)
        render json: { token: account.token }
      end
  
    end
  end
  