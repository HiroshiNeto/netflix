module Api::V1
    class InterestListSerializer < ActiveModel::Serializer
      attributes  :id,
                  :movie,
                  :profile_id,
                  :viewed,
                  :watchlist,
                  :created_at,
                  :updated_at
      
      def movie 
        movie_id = object.movie_id
        tmdb_api_key = ENV['TMDB_API_KEY']
        tmdb_api_url = ENV['TMDB_API_URL']
        begin
          url = "#{tmdb_api_url}/movie/#{movie_id}?api_key=#{tmdb_api_key}"
          result = JSON.parse( Net::HTTP.get(URI.parse(url)))
        rescue => exception
          return exception
        end
        return result
      end 
    end
end
  