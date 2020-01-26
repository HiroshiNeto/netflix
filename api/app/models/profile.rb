class Profile < ApplicationRecord
    belongs_to :account
    has_many :interest_list
end 