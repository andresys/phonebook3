class RestrictedConstraint
  def matches?(request)
    request.path !~ /rails/
  end
end

Rails.application.routes.draw do
  root "phonebook#search"

  get '/', to: 'phonebook#search', as: 'search'
  get '/autocomplete', to: 'phonebook#autocomplete'

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

    resources :users, except: %i[show], path_names: { edit: '' }
    resources :contacts, except: %i[show], path_names: { edit: '' }
    resources :departments, except: %i[show], path_names: { edit: '' }
    resources :titles, except: %i[show], path_names: { edit: '' }
    resource :help
    resource :settings
  end

  namespace :profile do
    resource :my_profile
    resources :my_contacts
    resource :settings
  end

  resources :exports, only: %i[index new create show]
  delete '/exports', to: 'exports#destroy_all'
  resource :settings

  resources :contacts, only: %i[show], path: '', constraints: lambda {|request| Contact.find_by_slug request.params[:id]}
  resources :departments, only: %i[show], path: '', constraints: lambda {|request| Department.find_by_slug request.params[:id]}
  
  get '*path', to: redirect("?q=%{path}"), constraints: RestrictedConstraint.new
end