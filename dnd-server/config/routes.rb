Rails.application.routes.draw do
  resources :campaigns do
		collection do
			get 'mine'
		end
		resources :characters
	end

  resources :characters do
		collection do
			get 'mine'
		end
	end

  post 'user_token' => 'user_token#create'

  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
