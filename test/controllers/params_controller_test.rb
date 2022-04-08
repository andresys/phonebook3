require 'test_helper'

class ParamsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @param = params(:one)
  end

  test "should get index" do
    get params_url
    assert_response :success
  end

  test "should get new" do
    get new_param_url
    assert_response :success
  end

  test "should create param" do
    assert_difference('Param.count') do
      post params_url, params: { param: { name: @param.name, value: @param.value } }
    end

    assert_redirected_to param_url(Param.last)
  end

  test "should show param" do
    get param_url(@param)
    assert_response :success
  end

  test "should get edit" do
    get edit_param_url(@param)
    assert_response :success
  end

  test "should update param" do
    patch param_url(@param), params: { param: { name: @param.name, value: @param.value } }
    assert_redirected_to param_url(@param)
  end

  test "should destroy param" do
    assert_difference('Param.count', -1) do
      delete param_url(@param)
    end

    assert_redirected_to params_url
  end
end
