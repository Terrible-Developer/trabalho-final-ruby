class AddReleasedDateColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :releaseDate, :string
  end
end
