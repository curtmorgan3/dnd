class AssociateUserToCampaign < ActiveRecord::Migration[5.2]
  def change
		change_table :campaigns do |t|
			t.belongs_to :user
		end
  end
end
