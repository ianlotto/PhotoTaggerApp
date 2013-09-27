Phototaggerapp::Application.routes.draw do
  resources :users, :only => [:create, :new, :show]
  resource :session, :only => [:create, :destroy, :new]


  namespace "api", default: {format: :json} do
    resources :users, only: [:show] do
      resources :photos, only: [:index, :new]
    end

    resources :photos, only: [:show, :create] do
      resources :photo_taggings, only: [:index, :new]
    end

    resources :photo_taggings, only: [:create]
  end

  root :to => "static_pages#root"

end
