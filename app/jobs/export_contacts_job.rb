class ExportContactsJob < ApplicationJob
  def perform(export)
    # Do something later
    @contacts = Contact.search(
      body: {
        sort: [
          { lastname: 'asc' },
          { firstname: 'asc' },
          { middlename: 'asc' },
          '_score'
        ],
      },
      limit: 10000
    )

    xlsx = ActionController::Base.new.render_to_string(
      layout: false, handlers: [:axlsx], formats: [:xlsx],
      template: 'contacts/exports',
      locals: { contacts: @contacts }
    )

    export.file.attach(
      io: StringIO.new(xlsx),
      filename: 'contacts.xlsx',
      content_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    export.save

    ActiveStorage::Current.url_options = Rails.configuration.action_mailer.default_url_options
    Turbo::StreamsChannel.broadcast_render_to(
      :exports,
      template: 'exports/updated',
      locals: { export: export }
    )
  end
end
