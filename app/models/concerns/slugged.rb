module Slugged
  extend ActiveSupport::Concern

  included do
    extend FriendlyId
    friendly_id :slug_candidates, use: :slugged
  
    def normalize_friendly_id(text)
      text.to_slug.transliterate(:russian).normalize.to_s
    end
  end
end