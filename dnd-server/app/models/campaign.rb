class Campaign < ApplicationRecord
	has_and_belongs_to_many :characters
	belongs_to :user, foreign_key: 'user_id'
end
