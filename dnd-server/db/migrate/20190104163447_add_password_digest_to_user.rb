class AddPasswordDigestToUser < ActiveRecord::Migration[5.2]
  def change
		change_table :users do |t|
			t.string :password_digest
		end
		def self.up
			remove_column :users, :password
		end
  end
end
