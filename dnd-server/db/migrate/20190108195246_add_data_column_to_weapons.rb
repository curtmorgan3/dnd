class AddDataColumnToWeapons < ActiveRecord::Migration[5.2]
  def change
		add_column :weapons, :data, :string
  end
end
