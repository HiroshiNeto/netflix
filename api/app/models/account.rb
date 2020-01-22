class Account < ApplicationRecord
    has_secure_token
    has_secure_password

    has_many :profiles, dependent: :destroy
    
    validates_presence_of     :email
    validates_presence_of     :password
    validates_uniqueness_of   :email, case_sensitive: true

end 