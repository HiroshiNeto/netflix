class AddReferenceProfileInAccount < ActiveRecord::Migration[6.0]
  def change
    add_reference :accounts, :profile
  end
end
