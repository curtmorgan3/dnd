class AddColumnsToCharacter < ActiveRecord::Migration[5.2]
  def change
		add_column :characters, :class, :string
		add_column :characters, :level, :integer
		add_column :characters, :data, :string
  end
end
