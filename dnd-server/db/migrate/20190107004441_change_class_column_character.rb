class ChangeClassColumnCharacter < ActiveRecord::Migration[5.2]
  def change
		remove_column :characters, :class
		add_column :characters, :clas, :string
  end
end
