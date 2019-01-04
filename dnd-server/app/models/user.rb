class User < ApplicationRecord
	has_many :characters
	has_secure_password
	validates :email, presence: true, uniqueness: true
	validates :username, presence: true, uniqueness: true

	def to_token_payload
		{
			sub: id,
			username: username
		}
	end
end
