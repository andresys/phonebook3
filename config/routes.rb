Rails.application.routes.draw do
  root  "application#client"
  get   "index" => redirect("/")
  
  # get   "",             to: "phonebook#client",   as: "client"
  # get   "contacts",     to: "phonebook#contacts"
  # get   "help",         to: "phonebook#help",       as: "help"
  # post  "help",         to: "phonebook#preview"
  # get   "card_template.mst", to: "phonebook#template"

  devise_for :users, path: "", path_names: {
    sign_in: 'login', sign_out: 'logout', sign_up: '',
    password: 'password', confirmation: 'verification',
    registration: 'register', edit: 'edit/profile',
    unlock: 'unlock'
  } do
    #get "/unlock", to: "devise/unlocks#new", as: :unlock, via: Devise.mappings[:user].unlock_via
    #patch "/unlock", to: "devise/unlocks#create"
  end

  # namespace :profile, path: "" do
  #   resources :favorites, only: :toggle do
  #     post :toggle, on: :member, path: ""
  #   end
  #   resource :sessions, only: :favorite do
  #     post :favorite, on: :member
  #   end
  #   resource  :my_profile, path: "profile"
  #   resources :my_contacts, path: "mycontacts"
  #   resource  :settings
  # end

  namespace :admin do
    get "/", to: redirect { |p, r| "#{r.url}/users" }, as: "root"
    #get "/", to: "redirect#admin", as: "root"
    root "users#index"

    resources :params do
      get :types, on: :collection
    end
    resources :addresses
    resources :titles
    resources :departments
    resources :contacts
    resources :users

    resource  :settings, only: [:show, :update]
    resource  :help, only: [:show, :update]
  end

  namespace :api, :defaults => { :format => :json } do 
    namespace :v1 do 
     resources :contacts, only: [:index, :show, :create, :destroy, :update], constraints: lambda { |req| ['json', 'xml', 'csv', 'vcf', 'png'].include?(req.format) }
     resource :help, only: [:show, :create, :destroy, :update], constraints: { format: 'html' }
    end 
  end

  match "*path", to: 'application#client', via: :all
end