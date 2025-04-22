# Searchkick.client_type = :opensearch
Searchkick.client = OpenSearch::Client.new(
  url: ENV["OPENSEARCH_URL"] || "http://localhost:9200",
  user: ENV["OPENSEARCH_USER"] || nil,
  password: ENV["OPENSEARCH_PASSWORD"] || nil,
  retry_on_failure: 5,
  request_timeout: 120,
  log: true
)