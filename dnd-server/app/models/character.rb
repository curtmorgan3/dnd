class Character < ApplicationRecord
	belongs_to :user, foreign_key: 'user_id'
	has_and_belongs_to_many :campaigns
end
