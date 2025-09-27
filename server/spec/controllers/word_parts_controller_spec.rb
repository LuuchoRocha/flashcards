require "rails_helper"

RSpec.describe WordPartsController, type: :controller do
  let(:phonics_level) { PhonicsLevel.create!(level_number: 1) }

  describe "GET #index" do
    before do
      @word_part1 = WordPart.create!(label: "work", phonics_level: phonics_level)
      @word_part2 = WordPart.create!(label: "immediately", phonics_level: phonics_level)

      get :index, params: { phonics_level_id: phonics_level.id }
    end

    it "responds with 200" do
      expect(response).to have_http_status(:ok)
    end

    it "returns JSON content" do
      expect(response.content_type).to include("application/json")
    end

    it "returns all word parts for a given phonics_level" do
      expect(JSON.parse(response.body).map { |wp| wp["id"] }).to contain_exactly(@word_part1.id, @word_part2.id)
    end
  end

  describe "GET #show" do
    before do
      @word_part = WordPart.create!(label: "engineering", phonics_level: phonics_level)

      get :show, params: { phonics_level_id: phonics_level.id, id: @word_part.id }
    end

    it "returns the word part" do
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["id"]).to eq(@word_part.id)
    end
  end

  describe "PATCH #update" do
    before do
      @word_part = WordPart.create!(label: "campaign", phonics_level: phonics_level)
    end

    context "with valid params" do
      before do
        patch :update, params: { phonics_level_id: phonics_level.id, id: @word_part.id, word_part: { status: "mastered" } }
      end

      it "responds with 200" do
        expect(response).to have_http_status(:ok)
      end

      it "returns JSON content" do
        expect(response.content_type).to include("application/json")
      end

      it "returns the updated word part" do
        expect(JSON.parse(response.body)["status"]).to eq("mastered")
      end

      it "updates the word part in the database" do
        expect(@word_part.reload.status).to eq("mastered")
      end
    end

    context "with invalid params" do
      before do
        patch :update, params: { phonics_level_id: phonics_level.id, id: @word_part.id, word_part: { status: "wrong_status" } }
      end

      it "responds with 422" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns JSON content" do
        expect(response.content_type).to include("application/json")
      end

      it "returns errors" do
        expect(JSON.parse(response.body)).to have_key("errors")
      end
    end
  end
end
