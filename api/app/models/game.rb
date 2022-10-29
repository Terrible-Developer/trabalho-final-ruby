class Game < ApplicationRecord

  belongs_to :genre

  validates :title, presence: true
  validates :releaseDate, presence: true

end
