class Genre < ApplicationRecord

  has_m̀any :articles

  validates :title, presence: true

end
