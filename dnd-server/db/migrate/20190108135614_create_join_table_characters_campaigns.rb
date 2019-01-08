class CreateJoinTableCharactersCampaigns < ActiveRecord::Migration[5.2]
  def change
		create_join_table :characters, :campaigns do |t|
			t.index :character_id
			t.index :campaign_id
		end
  end
end
