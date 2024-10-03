class ImportContactsJob < ApplicationJob
  def perform(*args)
    p "Import contacts from HTTP service"
    data = Imports::Services::PhonebookService.call("/api/v1/contacts?from=0&limit=1000") {|step| p step}

    return unless data.respond_to?(:any?) && data.any?

    job = Job.find_by(job_id: @job_id)
    ids = []
    histories = []
    
    set_step "Parsing data from JSON and save employees to database"
    
    data['contacts'].each do |employee|
      set_progress

      values = employee_params employee
      if finded = Employee.find_by(code: values[:code])
        values.delete_if {|k,v| v == finded[k]}
        if values.any?
          # histories << JobHistory.new(job: job, record: finded, action: 'change', values: finded.slice(values.keys))
          histories << JobHistory.new(job: job, record: finded, action: 'change', values: finded.slice(values.keys).map{|k,v| [k, {from: v, to: values[k.to_sym]}]}.to_h)
          finded.update(values)
        end
        ids << finded.id
      else
        created = Employee.create(values)
        # histories << JobHistory.new(job: job, record: created, action: 'add')
        histories << JobHistory.new(job: job, record: created, action: 'add', values: values)
        ids << created.id
      end
    end

    set_step "Removing removed employees from database"
    removed_employees = Employee.where(delete_mark: false).where.not(id: ids)
    removed_employees.each { |employee| histories << JobHistory.new(job: job, record: employee, action: 'remove', values: employee.slice(employee_params({}).keys)) }
    removed_employees.update_all(delete_mark: true)

    set_step "Saving employees histories"
    JobHistory.import histories
  end

private 
  def employee_params employee
    name = employee['name']&.strip&.gsub(/( +-+|-+ +|^-+|-+$)/, '')&.gsub(/ {2,}/, ' ')
    return {
      name: !name.blank? && name || nil,
      code: !employee['id'].blank? && employee['id'] || nil
    }
  end
end