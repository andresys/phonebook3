require 'test_helper'

class PhonebookControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get phonebook_index_url
    assert_response :success
  end

end
