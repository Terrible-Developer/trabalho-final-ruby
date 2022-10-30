class FixGenresName < ActiveRecord::Migration[7.0]
  def change
    rename_column :games, :genres_id, :genre_id
  end
end
