module Api::V1
  class AccountSerializer < ActiveModel::Serializer
    attributes  :id,
                :name,
                :default_profile_id,
                :email,
                :birthday
    def default_profile_id 
      object.profile_id
     end
  end
end
