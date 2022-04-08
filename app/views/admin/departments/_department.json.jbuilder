json.extract! department, :id, :name
json.parent department.parent_id
json.url admin_department_url(department, format: :json)