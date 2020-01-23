module Api::V1
    class InterestListSerializer < ActiveModel::Serializer
      attributes  :id,
                  :movie_id,
                  :profile_id,
                  :viewed,
                  :watchlist
      
    end
end
  