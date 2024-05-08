Rails.application.routes.draw do
  get   "export",     to: "phonebook#export"

  scope :account do
    devise_for :users, path: "", path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    }
  end

  namespace :api, :defaults => { :format => :json } do 
    namespace :v1 do
      resources :contacts, only: [:index, :show, :create, :destroy, :update], constraints: lambda { |req| ['json', 'xml', 'csv', 'vcf', 'png'].include?(req.format) }
      resource :help, only: [:show, :create, :destroy, :update], constraints: { format: 'html' }
      resource :user, only: [:show, :update], constraints: { format: 'json' }
    end 
  end

  namespace :admin do
    get '/', to: redirect { |p, r| "#{r.url.sub(/(\/)+$/,'')}/users" }

    resources :users
    resources :contacts
    resources :departments, except: %i[show], path_names: { edit: '' }
    resources :titles
    resource :help
    resource :settings
  end

  namespace :profile do
    resource :my_profile
    resources :my_contacts
    resource :settings
  end

  resource :phonebook, only: %i[contacts]
  resource :settings

  root "phonebook#contacts"
end