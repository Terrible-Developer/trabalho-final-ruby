class AddFkGenresGames < ActiveRecord::Migration[7.0]
  def change
    add_reference :games, :genres
  end
end
