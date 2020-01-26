class CreateInterestList < ActiveRecord::Migration[6.0]
  def change
    create_table :interest_lists do |t|
      t.string :movie_id, null: false
      t.references :profile, null: false
      t.boolean :viewed, default: false
      t.boolean :watchlist, default: false
      t.timestamps
    end
  end
end
