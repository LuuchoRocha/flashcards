require "rails_helper"

RSpec.describe WordPart, type: :model do
  it { is_expected.to belong_to(:phonics_level) }

  it { is_expected.to validate_presence_of(:label) }

  it do
    should define_enum_for(:status).
             with_values(mastered: "mastered", needs_work: "needs_work").
             backed_by_column_of_type(:string).
             validating(allowing_nil: true)
  end
end
