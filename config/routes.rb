Rails.application.routes.draw do
  namespace :api do
    get 'auth/index'
  end
  devise_for :users, defaults: { format: :json }
  namespace :api, defaults: { format: :json } do

    scope :auth do
      get 'is_signed_in', to: 'auth#index'
    end
  end
  root "init#index"
  get '*path', to: 'init#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
