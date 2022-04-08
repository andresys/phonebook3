require "application_system_test_case"

class ParamsTest < ApplicationSystemTestCase
  setup do
    @param = params(:one)
  end

  test "visiting the index" do
    visit params_url
    assert_selector "h1", text: "Params"
  end

  test "creating a Param" do
    visit params_url
    click_on "New Param"

    fill_in "Name", with: @param.name
    fill_in "Value", with: @param.value
    click_on "Create Param"

    assert_text "Param was successfully created"
    click_on "Back"
  end

  test "updating a Param" do
    visit params_url
    click_on "Edit", match: :first

    fill_in "Name", with: @param.name
    fill_in "Value", with: @param.value
    click_on "Update Param"

    assert_text "Param was successfully updated"
    click_on "Back"
  end

  test "destroying a Param" do
    visit params_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Param was successfully destroyed"
  end
end
