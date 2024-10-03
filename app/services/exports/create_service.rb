module Exports
  class CreateService < ::ApplicationService
    def initialize(params)
      @params = params
    end

    def call
      tx_and_commit do
        @export = Export.new @params
        @export.save
      end
      [ @export.errors.none?, @export ]
    end

    private

    def post_call
      broadcast_later :exports, 'exports/created', locals: { export: @export }
      ExportContactsJob.perform_later @export
    end
  end
end