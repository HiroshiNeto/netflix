module Api::V1
    class ApiController < ActionController::API
  
      include ActionController::HttpAuthentication::Token::ControllerMethods
  
      before_action :require_login
  
      def require_login
        authenticate_token_now! || render_unauthorized("Access denied")
      end
  
  
      def current_account
        @current_account ||= authenticate_token_now!
      end
  
      protected
  
      def render_unauthorized(message)
        render json: { error: message  }, status: :unauthorized
      end
  
      private
  
      def authenticate_token_now!
        authenticate_with_http_token do |token, options|
          Account.find_by(token: token)
        end
      end
  
    end
  end
  