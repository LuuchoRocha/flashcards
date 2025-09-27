class WordPartsController < ApplicationController
  before_action :set_current_word_part, only: [:show, :update]

  def index
    @phonics_level = PhonicsLevel.find(params[:phonics_level_id])

    render json: @phonics_level.word_parts
  end

  def show
    render json: @word_part
  end

  def update
    if @word_part.update(word_part_params)
      render json: @word_part
    else
      render json: { errors: @word_part.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_current_word_part
    @word_part = WordPart.find(params[:id])
  end

  def word_part_params
    params.require(:word_part).permit(:status)
  end
end
