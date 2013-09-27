class Photo < ActiveRecord::Base
  attr_accessible :owner_id, :url, :title

  validates :owner_id, :url, :title, presence: true

  belongs_to :owner,
    class_name: "User",
    foreign_key: :owner_id

  has_many :photo_taggings,
    class_name: "PhotoTagging",
    foreign_key: :photo_id

  has_many :tagged_users,
    through: :photo_taggings,
    source: :user

end
