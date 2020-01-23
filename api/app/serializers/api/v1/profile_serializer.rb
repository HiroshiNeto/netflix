module Api::V1
    class ProfileSerializer < ActiveModel::Serializer
      attributes  :id,
                  :name,
                  :account_id
    end
  end
  