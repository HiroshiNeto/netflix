class CreateAccountsTable < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.text :name
      t.text :email, unique: true, null:false
      t.text :password_digest, null:true
      t.datetime :birthday, null: true
      t.text :token
      t.text :provider, null: true 
      t.text :uid, null: true
      t.text :facebook_id, null: true
      t.timestamps
    end
  end
end
