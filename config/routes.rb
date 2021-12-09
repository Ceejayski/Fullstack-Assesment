Rails.application.routes.draw do
  root "init#index"
  
  scope '/api' do
    devise_for :users, defaults: { format: :json }
  end

  namespace :api, defaults: { format: :json } do
    scope :auth do
      get 'is_signed_in', to: 'auth#index'
    end
  end
  get '*path', to: 'init#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
