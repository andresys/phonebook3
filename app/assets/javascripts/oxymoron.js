(function() {
  angular.module("oxymoron.config.http", [])
  .config(['$httpProvider', '$locationProvider', '$stateProvider', function($httpProvider, $locationProvider, $stateProvider) {
    /*
     *  Set token for AngularJS ajax methods
    */
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }])
angular.module("oxymoron.config.states", [])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    /*
     *  Enable HTML5 History API
    */
    $locationProvider.html5Mode({enabled: true, requireBase: false});

    /*
     *  $stateProvider Rails
    */
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';

      //for later access in tempalteUrl callback
      $stateProvider.oxymoron_location = $location;

      if(hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      }
    });

    var resolve = function (action, $stateParams) {
      return function (actionNames, callback) {
        try {
          var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
          
          if (actionNames.indexOf(action)!=-1) {
            callback($stateParams);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    $stateProvider.rails = function () {
      $stateProvider
      
        .state('rails_info_properties_path', {
          url: '/rails/info/properties',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_info_properties_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('properties', $stateParams)
            }]
          }
        })
      
        .state('rails_info_routes_path', {
          url: '/rails/info/routes',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_info_routes_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('routes', $stateParams)
            }]
          }
        })
      
        .state('rails_info_path', {
          url: '/rails/info',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_info_path'](params);
          },
          controller: 'RailsInfoCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('rails_mailers_path', {
          url: '/rails/mailers',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_mailers_path'](params);
          },
          controller: 'RailsMailersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('root_path', {
          url: '/',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['root_path'](params);
          },
          controller: 'PhonebookCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('contacts', $stateParams)
            }]
          }
        })
      
        .state('index_path', {
          url: '/index',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['index_path'](params);
          },
          controller: '',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('', $stateParams)
            }]
          }
        })
      
        .state('contacts_path', {
          url: '/',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['contacts_path'](params);
          },
          controller: 'PhonebookCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('contacts', $stateParams)
            }]
          }
        })
      
        .state('help_path', {
          url: '/help',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['help_path'](params);
          },
          controller: 'PhonebookCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('help', $stateParams)
            }]
          }
        })
      
        .state('new_user_session_path', {
          url: '/login',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_session_path'](params);
          },
          controller: 'DeviseSessionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('new_user_password_path', {
          url: '/password/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_password_path', {
          url: '/password/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('cancel_user_registration_path', {
          url: '/register/cancel',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['cancel_user_registration_path'](params);
          },
          controller: 'DeviseRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('cancel', $stateParams)
            }]
          }
        })
      
        .state('new_user_registration_path', {
          url: '/register',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_registration_path'](params);
          },
          controller: 'DeviseRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_registration_path', {
          url: '/register/edit/profile',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_user_registration_path'](params);
          },
          controller: 'DeviseRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('new_user_confirmation_path', {
          url: '/verification/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_confirmation_path'](params);
          },
          controller: 'DeviseConfirmationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('user_confirmation_path', {
          url: '/verification',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_confirmation_path'](params);
          },
          controller: 'DeviseConfirmationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('new_user_unlock_path', {
          url: '/unlock/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_unlock_path'](params);
          },
          controller: 'DeviseUnlocksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('user_unlock_path', {
          url: '/unlock',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_unlock_path'](params);
          },
          controller: 'DeviseUnlocksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('new_profile_my_profile_path', {
          url: '/profile/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_profile_my_profile_path'](params);
          },
          controller: 'ProfileMyProfilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_profile_my_profile_path', {
          url: '/profile/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_profile_my_profile_path'](params);
          },
          controller: 'ProfileMyProfilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('profile_my_profile_path', {
          url: '/profile',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['profile_my_profile_path'](params);
          },
          controller: 'ProfileMyProfilesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('profile_my_contacts_path', {
          url: '/mycontacts',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['profile_my_contacts_path'](params);
          },
          controller: 'ProfileMyContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_profile_my_contact_path', {
          url: '/mycontacts/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_profile_my_contact_path'](params);
          },
          controller: 'ProfileMyContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_profile_my_contact_path', {
          url: '/mycontacts/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_profile_my_contact_path'](params);
          },
          controller: 'ProfileMyContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('profile_my_contact_path', {
          url: '/mycontacts/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['profile_my_contact_path'](params);
          },
          controller: 'ProfileMyContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('new_profile_settings_path', {
          url: '/settings/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_profile_settings_path'](params);
          },
          controller: 'ProfileSettingsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_profile_settings_path', {
          url: '/settings/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_profile_settings_path'](params);
          },
          controller: 'ProfileSettingsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('profile_settings_path', {
          url: '/settings',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['profile_settings_path'](params);
          },
          controller: 'ProfileSettingsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_root_path', {
          url: '/admin',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_root_path'](params);
          },
          controller: '',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('', $stateParams)
            }]
          }
        })
      
        .state('types_admin_params_path', {
          url: '/admin/params/types',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['types_admin_params_path'](params);
          },
          controller: 'AdminParamsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('types', $stateParams)
            }]
          }
        })
      
        .state('admin_params_path', {
          url: '/admin/params',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_params_path'](params);
          },
          controller: 'AdminParamsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_param_path', {
          url: '/admin/params/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_param_path'](params);
          },
          controller: 'AdminParamsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_param_path', {
          url: '/admin/params/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_param_path'](params);
          },
          controller: 'AdminParamsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_param_path', {
          url: '/admin/params/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_param_path'](params);
          },
          controller: 'AdminParamsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_addresses_path', {
          url: '/admin/addresses',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_addresses_path'](params);
          },
          controller: 'AdminAddressesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_address_path', {
          url: '/admin/addresses/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_address_path'](params);
          },
          controller: 'AdminAddressesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_address_path', {
          url: '/admin/addresses/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_address_path'](params);
          },
          controller: 'AdminAddressesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_address_path', {
          url: '/admin/addresses/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_address_path'](params);
          },
          controller: 'AdminAddressesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_titles_path', {
          url: '/admin/titles',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_titles_path'](params);
          },
          controller: 'AdminTitlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_title_path', {
          url: '/admin/titles/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_title_path'](params);
          },
          controller: 'AdminTitlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_title_path', {
          url: '/admin/titles/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_title_path'](params);
          },
          controller: 'AdminTitlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_title_path', {
          url: '/admin/titles/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_title_path'](params);
          },
          controller: 'AdminTitlesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_departments_path', {
          url: '/admin/departments',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_departments_path'](params);
          },
          controller: 'AdminDepartmentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_department_path', {
          url: '/admin/departments/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_department_path'](params);
          },
          controller: 'AdminDepartmentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_department_path', {
          url: '/admin/departments/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_department_path'](params);
          },
          controller: 'AdminDepartmentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_department_path', {
          url: '/admin/departments/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_department_path'](params);
          },
          controller: 'AdminDepartmentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_contacts_path', {
          url: '/admin/contacts',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_contacts_path'](params);
          },
          controller: 'AdminContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_contact_path', {
          url: '/admin/contacts/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_contact_path'](params);
          },
          controller: 'AdminContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_contact_path', {
          url: '/admin/contacts/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_contact_path'](params);
          },
          controller: 'AdminContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_contact_path', {
          url: '/admin/contacts/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_contact_path'](params);
          },
          controller: 'AdminContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_users_path', {
          url: '/admin/users',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_users_path'](params);
          },
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_user_path', {
          url: '/admin/users/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_user_path'](params);
          },
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_user_path', {
          url: '/admin/users/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_user_path'](params);
          },
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_user_path', {
          url: '/admin/users/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_user_path'](params);
          },
          controller: 'AdminUsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_settings_path', {
          url: '/admin/settings',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_settings_path'](params);
          },
          controller: 'AdminSettingsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_help_path', {
          url: '/admin/help',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_help_path'](params);
          },
          controller: 'AdminHelpsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('api_v1_contacts_path', {
          url: '/api/v1/contacts',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['api_v1_contacts_path'](params);
          },
          controller: 'ApiV1ContactsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('api_v1_help_path', {
          url: '/api/v1/help',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['api_v1_help_path'](params);
          },
          controller: 'ApiV1HelpsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('rails_service_blob_path', {
          url: '/rails/active_storage/blobs/:signed_id/*filename',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_service_blob_path'](params);
          },
          controller: 'ActiveStorageBlobsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('rails_blob_representation_path', {
          url: '/rails/active_storage/representations/:signed_blob_id/:variation_key/*filename',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_blob_representation_path'](params);
          },
          controller: 'ActiveStorageRepresentationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('rails_disk_service_path', {
          url: '/rails/active_storage/disk/:encoded_key/*filename',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['rails_disk_service_path'](params);
          },
          controller: 'ActiveStorageDiskCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
      return $stateProvider;
    }
  }])

  .config(['$provide',
    function($provide) {
      $provide.decorator('$state', ['$delegate', function($delegate) {
        var state = $delegate;
        state.baseGo = state.go;

        var go = function(to, params, options) {
          options = options || {};

          if (state.defaultParams) {
            var defaultParams = angular.copy(state.defaultParams);
            params = angular.extend(defaultParams, params);
          }

          options.inherit = false;

          state.baseGo(to, params, options);
        };
        state.go = go;

        return $delegate;
      }]);
    }
  ])
angular.module("oxymoron.config.debug", [])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(true);
}]);

angular.module("oxymoron.config", ['oxymoron.config.http', 'oxymoron.config.states', 'oxymoron.config.debug'])

  angular.module("oxymoron.services.interceptor", [])
  .factory('httpInterceptor', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    return {
      request: function (config) {
        $rootScope.$broadcast('loading:progress');
        return config || $q.when(config);
      },
      response: function (response) {
        $rootScope.$broadcast('loading:finish', response);
        return response || $q.when(response);
      },
      responseError: function (response) {
        $rootScope.$broadcast('loading:error', response);
        return $q.reject(response);
      }
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }])
angular.module("oxymoron.services.resources", [])
  .factory('resourceDecorator', [function () {
    return function(resource) {
      return resource;
    };
  }])

  
    .factory('UserConfirmation', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/verification.json', {}, {
        "new": {
          "method": "GET",
          "url": "/verification/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/verification/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('UserUnlock', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/unlock.json', {}, {
        "new": {
          "method": "GET",
          "url": "/unlock/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/unlock/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('ProfileMyProfile', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/profile.json', {}, {
        "new": {
          "method": "GET",
          "url": "/profile/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/profile/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('ProfileMyContact', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/mycontacts/:id.json', {"id":"@id"}, {
        "new": {
          "method": "GET",
          "url": "/mycontacts/:id/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/mycontacts/:id/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('ProfileSettings', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/settings.json', {}, {
        "new": {
          "method": "GET",
          "url": "/settings/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/settings/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('AdminParam', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/params/:id.json', {"id":"@id"}, {
        "new": {
          "method": "GET",
          "url": "/admin/params/:id/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/params/:id/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        },
        "types": {
          "url": "/admin/params/types.json",
          "isArray": null,
          "method": "GET"
        }
      }));
    }])
  
    .factory('AdminAddress', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/addresses/:id.json', {"id":"@id"}, {
        "new": {
          "method": "GET",
          "url": "/admin/addresses/:id/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/addresses/:id/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('AdminTitle', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/titles/:id.json', {"id":"@id"}, {
        "new": {
          "method": "GET",
          "url": "/admin/titles/:id/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/titles/:id/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('AdminDepartment', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/departments/:id.json', {"id":"@id"}, {
        "new": {
          "method": "GET",
          "url": "/admin/departments/:id/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/departments/:id/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('AdminContact', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/contacts/:id.json', {"id":"@id"}, {
        "new": {
          "method": "GET",
          "url": "/admin/contacts/:id/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/contacts/:id/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('AdminUser', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/users/:id.json', {"id":"@id"}, {
        "new": {
          "method": "GET",
          "url": "/admin/users/:id/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/users/:id/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('AdminSettings', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/settings.json', {}, {
        "new": {
          "method": "GET",
          "url": "/admin/settings/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/settings/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('AdminHelp', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/help.json', {}, {
        "new": {
          "method": "GET",
          "url": "/admin/help/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/admin/help/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('ApiV1Help', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/api/v1/help.json', {}, {
        "new": {
          "method": "GET",
          "url": "/api/v1/help/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/api/v1/help/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('RailsServiceBlob', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/rails/active_storage/blobs/:signed_id/*filename.json', {"signed_id":"@signed_id","filename":"@filename"}, {
        "new": {
          "method": "GET",
          "url": "/rails/active_storage/blobs/:signed_id/*filename/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/rails/active_storage/blobs/:signed_id/*filename/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('RailsBlobRepresentation', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/rails/active_storage/representations/:signed_blob_id/:variation_key/*filename.json', {"signed_blob_id":"@signed_blob_id","variation_key":"@variation_key","filename":"@filename"}, {
        "new": {
          "method": "GET",
          "url": "/rails/active_storage/representations/:signed_blob_id/:variation_key/*filename/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/rails/active_storage/representations/:signed_blob_id/:variation_key/*filename/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
    .factory('RailsDiskService', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/rails/active_storage/disk/:encoded_key/*filename.json', {"encoded_key":"@encoded_key","filename":"@filename"}, {
        "new": {
          "method": "GET",
          "url": "/rails/active_storage/disk/:encoded_key/*filename/new.json"
        },
        "edit": {
          "method": "GET",
          "url": "/rails/active_storage/disk/:encoded_key/*filename/edit.json"
        },
        "update": {
          "method": "PUT"
        },
        "create": {
          "method": "POST"
        },
        "destroy": {
          "method": "DELETE"
        }
      }));
    }])
  
angular.module("oxymoron.services.sign", [])
  .service('Sign', ['$http', function ($http) {
    var Sign = this;

    Sign.out = function (callback) {
      $http.delete(Routes.destroy_user_session_path())
        .success(function () {
          if (callback)
            callback()
        })
    }

    Sign.in = function (user_params, callback) {
      $http.post(Routes.user_session_path(), {user: user_params})
        .success(function () {
          if (callback)
            callback();
        })
    }

    Sign.up = function (user_params, callback) {
      $http.post(Routes.user_registration_path(), {user: user_params})
        .success(function () {
          if (callback)
            callback();
        })
    }
  }])
angular.module("oxymoron.services.validate", [])
  .factory('Validate', [function(){
    return function (form, errors){
      try {
        var $form = angular.element(document.querySelector('[name="'+form+'"]')).scope()[form];
      } catch(e) {
        var $form = {};
      }

      angular
        .element(document.querySelectorAll('.rails-errors')).remove();

      angular.forEach($form, function(ctrl, name) {
        if (name.indexOf('$') != 0) {
          angular.forEach(ctrl.$error, function(value, name) {
            ctrl.$setValidity(name, null);
          });
        }
      });


      angular.forEach(errors, function(errors_array, key) {
        var form_key = form+'['+key+']';
        try {
          if ($form[form_key]) {
            $form[form_key].$setTouched();
            $form[form_key].$setDirty();
            $form[form_key].$setValidity('server', false);
          }
          
          angular
            .element(document.querySelector('[name="'+form_key+'"]'))
            .parent()
            .append('<div class="rails-errors" ng-messages="'+form_key+'.$error"><div ng-message="server">'+errors_array[0]+'</div></div>')
        } catch(e) {
          console.log(e)
          console.warn('Element with name ' + form_key + ' not found for validation.')
        }
      });
    };
  }])
angular.module("oxymoron.services.notice", [])
.service('Notice', ['ngNotify', function(ngNotify){
  var Notice = this;

  Notice.callback = function (type, res) {
    ngNotify.set(res.data.msg || res.data.error, type);
  }
}])

angular.module("oxymoron.services", ["oxymoron.services.interceptor", "oxymoron.services.notice", "oxymoron.services.resources", "oxymoron.services.sign", "oxymoron.services.validate"])
  angular.module("oxymoron.directives.contentFor", [])
  .directive("contentFor", [
    "$compile", function($compile) {
      return {
        compile: function(el, attrs, transclude) {
          var template = el.html();

          return {
            pre: function(scope, iElement, iAttrs, controller) {
              var DOMElements = angular.element(document.querySelectorAll('[ng-yield="'+iAttrs.contentFor+'"]'));
              if (DOMElements.attr("only-text") == "true") {
                template = el.text().replace(/(?:\r\n|\r|\n)/g, ' ');
              }
              DOMElements.html((DOMElements.attr("prefix") || "") + template + (DOMElements.attr("postfix") || ""))
              $compile(DOMElements)(scope);

              
              return iElement.remove();
            }
          };
        }
      };
    }
  ])
angular.module("oxymoron.directives.fileupload", [])
  .directive('fileupload', ['$http', '$timeout', '$cookies', 'ngNotify', function ($http, $timeout, $cookies, ngNotify) {
    return {
      scope: {
        fileupload: "=",
        ngModel: "=",
        hash: "=",
        percentCompleted: "=",
        maxSize: "="
      },
      restrict: 'A',
      link: function($scope, element, attrs) {
        $scope.percentCompleted = undefined;

        element.bind('change', function(){
          var valid = true;
          if ($scope.xhr) $scope.xhr.abort();

          var fd = new FormData();

          angular.forEach(element[0].files, function (file) {
            if ($scope.maxSize && file.size/1024/1024 > $scope.maxSize) {
              valid = false;
              return
            }
            fd.append("attachments[]", file);
          })

          if (!valid) {
            ngNotify.set("File size is more then " + $scope.maxSize + " Mb", "error")
            return false;
          }

          $scope.xhr = new XMLHttpRequest;

          $scope.percentCompleted = 0;
          
          $scope.xhr.upload.onprogress = function(e) {
              $scope.$apply(function() {
                  if (e.lengthComputable) {
                      $scope.percentCompleted = Math.round(e.loaded / e.total * 100);
                  }
              });
          };

          $scope.xhr.onload = function() {
            var res = JSON.parse(this.responseText)
            
            if (this.status == 200) {
              $scope.$apply(function() {
                if (!$scope.hash) {
                  if (attrs.multiple) {
                    $scope.ngModel = $scope.ngModel || [];
                    angular.forEach(res, function (attachment) {
                      $scope.ngModel.push(attachment);
                    });
                  } else {
                    $scope.ngModel = res[0];
                  }
                } else {
                  $scope.ngModel = $scope.ngModel || {};
                  angular.forEach(res, function(value, key) {
                    $scope.ngModel[key] = $scope.ngModel[key] || [];
                    angular.forEach(value, function (attachment) {
                      $scope.ngModel[key].push(attachment);
                    });
                  });
                }

                $scope.percentCompleted = undefined;
              });
            } else {
              ngNotify.set(res.msg || "Uploading error", "error")
            }
          };


          $scope.xhr.open('POST', $scope.fileupload);
          $scope.xhr.setRequestHeader('X-XSRF-Token', $cookies.get('XSRF-TOKEN'));
          $scope.xhr.send(fd);

          element[0].value = '';
        })
      }
    }
  }])
angular.module("oxymoron.directives.clickOutside", [])
  .directive('clickOutside', ['$document', function ($document) {
    return {
      restrict: 'A',
      scope: {
        clickOutside: '&',
        clickOutsideIf: '='
      },
      link: function (scope, el, attr) {
        var handler = function (e) {
          if (scope.clickOutsideIf && el !== e.target && !el[0].contains(e.target) && document.body.contains(e.target)) {
            scope.$apply(function () {
                scope.$eval(scope.clickOutside);
            });
          }
        }

        $document.bind('click', handler);

        scope.$on('$destroy', function () {
          $document.unbind('click', handler)
        })
      }
    }
  }])

angular.module("oxymoron.directives", ['oxymoron.directives.fileupload', 'oxymoron.directives.contentFor', 'oxymoron.directives.clickOutside'])
  angular.module("oxymoron.notifier", [])
  .run(['$rootScope', 'ngNotify', 'Validate', '$state', '$http', '$location', 'Notice', function ($rootScope, ngNotify, Validate, $state, $http, $location, Notice) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info'
    });

    var callback = function(type, res) {
      if (res.data && angular.isObject(res.data)) {
        if (res.data.msg || res.data.error) {
          Notice.callback(type, res);
        }

        if (res.data.errors) {
          Validate(res.data.form_name || res.config.data.form_name, res.data.errors)
        }

        if (res.data.reload) {
          if (res.data.redirect_to_url) {
            window.location = res.data.redirect_to_url;
          } else if (res.data.redirect_to) {
            $state.transitionTo(res.data.redirect_to, res.data.redirect_options || {}, {notify: false, location: true, reload: true});
          }
        } else {
          if (res.data.redirect_to_url) {
            $location.url(res.data.redirect_to_url);
          } else if (res.data.redirect_to) {
            $state.go(res.data.redirect_to, res.data.redirect_options || {});
          }
        }

        if (res.data.reload) {
          window.location.reload();
        }
      }
    }

    $rootScope.$on('loading:finish', function (h, res) {
      callback('success', res)
    })

    $rootScope.$on('loading:error', function (h, res, p) {
      callback('error', res)
    })


  }])

  angular.module('oxymoron', ['ngNotify', 'ngCookies', 'ui.router', 'ngResource', 'oxymoron.directives', 'oxymoron.services', 'oxymoron.config', 'oxymoron.notifier'])

}).call(this);

(function () {
  var Routes = function () {
    var self = this,
        routes = {"rails_info_properties":{"defaults":{},"path":"/rails/info/properties"},"rails_info_routes":{"defaults":{},"path":"/rails/info/routes"},"rails_info":{"defaults":{},"path":"/rails/info"},"rails_mailers":{"defaults":{},"path":"/rails/mailers"},"root":{"defaults":{},"path":"/"},"index":{"defaults":{},"path":"/index"},"contacts":{"defaults":{},"path":"/"},"help":{"defaults":{},"path":"/help"},"new_user_session":{"defaults":{},"path":"/login"},"user_session":{"defaults":{},"path":"/login"},"destroy_user_session":{"defaults":{},"path":"/logout"},"new_user_password":{"defaults":{},"path":"/password/new"},"edit_user_password":{"defaults":{},"path":"/password/edit"},"user_password":{"defaults":{},"path":"/password"},"cancel_user_registration":{"defaults":{},"path":"/register/cancel"},"new_user_registration":{"defaults":{},"path":"/register"},"edit_user_registration":{"defaults":{},"path":"/register/edit/profile"},"user_registration":{"defaults":{},"path":"/register"},"new_user_confirmation":{"defaults":{},"path":"/verification/new"},"user_confirmation":{"defaults":{},"path":"/verification"},"new_user_unlock":{"defaults":{},"path":"/unlock/new"},"user_unlock":{"defaults":{},"path":"/unlock"},"toggle_profile_favorite":{"defaults":{},"path":"/favorites/:id"},"favorite_profile_sessions":{"defaults":{},"path":"/sessions/favorite"},"new_profile_my_profile":{"defaults":{},"path":"/profile/new"},"edit_profile_my_profile":{"defaults":{},"path":"/profile/edit"},"profile_my_profile":{"defaults":{},"path":"/profile"},"profile_my_contacts":{"defaults":{},"path":"/mycontacts"},"new_profile_my_contact":{"defaults":{},"path":"/mycontacts/new"},"edit_profile_my_contact":{"defaults":{},"path":"/mycontacts/:id/edit"},"profile_my_contact":{"defaults":{},"path":"/mycontacts/:id"},"new_profile_settings":{"defaults":{},"path":"/settings/new"},"edit_profile_settings":{"defaults":{},"path":"/settings/edit"},"profile_settings":{"defaults":{},"path":"/settings"},"admin_root":{"defaults":{},"path":"/admin"},"types_admin_params":{"defaults":{},"path":"/admin/params/types"},"admin_params":{"defaults":{},"path":"/admin/params"},"new_admin_param":{"defaults":{},"path":"/admin/params/new"},"edit_admin_param":{"defaults":{},"path":"/admin/params/:id/edit"},"admin_param":{"defaults":{},"path":"/admin/params/:id"},"admin_addresses":{"defaults":{},"path":"/admin/addresses"},"new_admin_address":{"defaults":{},"path":"/admin/addresses/new"},"edit_admin_address":{"defaults":{},"path":"/admin/addresses/:id/edit"},"admin_address":{"defaults":{},"path":"/admin/addresses/:id"},"admin_titles":{"defaults":{},"path":"/admin/titles"},"new_admin_title":{"defaults":{},"path":"/admin/titles/new"},"edit_admin_title":{"defaults":{},"path":"/admin/titles/:id/edit"},"admin_title":{"defaults":{},"path":"/admin/titles/:id"},"admin_departments":{"defaults":{},"path":"/admin/departments"},"new_admin_department":{"defaults":{},"path":"/admin/departments/new"},"edit_admin_department":{"defaults":{},"path":"/admin/departments/:id/edit"},"admin_department":{"defaults":{},"path":"/admin/departments/:id"},"admin_contacts":{"defaults":{},"path":"/admin/contacts"},"new_admin_contact":{"defaults":{},"path":"/admin/contacts/new"},"edit_admin_contact":{"defaults":{},"path":"/admin/contacts/:id/edit"},"admin_contact":{"defaults":{},"path":"/admin/contacts/:id"},"admin_users":{"defaults":{},"path":"/admin/users"},"new_admin_user":{"defaults":{},"path":"/admin/users/new"},"edit_admin_user":{"defaults":{},"path":"/admin/users/:id/edit"},"admin_user":{"defaults":{},"path":"/admin/users/:id"},"admin_settings":{"defaults":{},"path":"/admin/settings"},"admin_help":{"defaults":{},"path":"/admin/help"},"api_v1_contacts":{"defaults":{},"path":"/api/v1/contacts"},"api_v1_contact":{"defaults":{},"path":"/api/v1/contacts/:id"},"api_v1_help":{"defaults":{},"path":"/api/v1/help"},"rails_service_blob":{"defaults":{},"path":"/rails/active_storage/blobs/:signed_id/*filename"},"rails_blob_representation":{"defaults":{},"path":"/rails/active_storage/representations/:signed_blob_id/:variation_key/*filename"},"rails_disk_service":{"defaults":{},"path":"/rails/active_storage/disk/:encoded_key/*filename"},"update_rails_disk_service":{"defaults":{},"path":"/rails/active_storage/disk/:encoded_token"},"rails_direct_uploads":{"defaults":{},"path":"/rails/active_storage/direct_uploads"}};

    self.defaultParams = {}

    var serialize = function(obj, prefix) {
      var str = [];
      for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + (Array.isArray(obj) ? '' : p) + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }

    var omit = function (hash, key) {
      var hash = angular.copy(hash);
      delete hash[key]
      return hash
    }


    angular.forEach(routes, function (val, key) {
      var result = '';

      var gsub = function(params) {
        if (params.format) {
          result += '.' + params.format
        }

        var params = omit(params, 'format');
        angular.forEach(params, function (v, k) {
          var subst = ':' + k;
          if (result.search(subst) != -1) {
            result = result.replace(subst, v);
            params = omit(params, k);
          }
        })

        if (result.search(/\*\w+/)!=-1) {
          result = result.replace(/\*(\w+)/, function (a, b) {
            return params[b];
          })
        }
        
        if (Object.keys(params).length)
          result += '?'+serialize(params)

        return result;
      }

      self[key+'_path'] = function (params) {
        var params = angular.extend(angular.copy(val.defaults), params || {});
        result = val.path;
        var defaultParams = angular.copy(self.defaultParams);
        return gsub(angular.extend(defaultParams, params));
      }

      self[key+'_url'] = function (params) {
        return window.location.origin + self[key+'_path'](params)
      }
    })
  }

  window.Routes = new Routes();

}).call(this)