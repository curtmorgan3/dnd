Rails.application.routes.draw do
  resources :campaigns do
		collection do
			get 'mine'
		end
	end

  resources :characters do
		collection do
			get 'mine'
		end
	end

  post 'user_token' => 'user_token#create'
	get 'campaigns/:id/characters' => 'campaigns#characters'
	post 'campaigns/:id/characters/:character_id' => 'campaigns#add_character'
	get 'users/find/:username' => 'users#find'
	get 'users/:id/characters' => 'users#get_characters'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
