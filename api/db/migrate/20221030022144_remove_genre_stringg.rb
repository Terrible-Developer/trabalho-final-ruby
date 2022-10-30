class RemoveGenreStringg < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :genre
  end
end
