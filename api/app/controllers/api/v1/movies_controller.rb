module Api::V1
    class MoviesController < ApiController
        attr_accessor :term
        
        # GET /api/v1/movies/:term
        def get_by_term
            term = movie_list_params[:term]
            tmdb_api_key = ENV['TMDB_API_KEY']
            tmdb_api_url = ENV['TMDB_API_URL']
            begin
                url = "#{tmdb_api_url}/search/movie?api_key=#{tmdb_api_key}&query=#{term}"
                result = JSON.parse(Net::HTTP.get(URI.parse(url)))
            rescue => exception
                result = exception
            end
            render json: result
        end

        # GET /api/v1/movies
        def get_top_movies
            tmdb_api_key = ENV['TMDB_API_KEY']
            tmdb_api_url = ENV['TMDB_API_URL']
            begin
                url = "#{tmdb_api_url}/movie/popular?api_key=#{tmdb_api_key}"
                result = JSON.parse(Net::HTTP.get(URI.parse(url)))
            rescue => exception
                result = exception
            end
            render json: result
        end
      
        private
        def movie_list_params
            params.permit(
              :term
            )
        end
    end
end
  