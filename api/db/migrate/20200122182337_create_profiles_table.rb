class CreateProfilesTable < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.text :name, null: false
      t.references :account, null: false
      t.timestamps
    end
  end
end
