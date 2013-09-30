class Api::PhotoTaggingsController < ApplicationController
  before_filter :require_current_user!

  def index
    @photo_taggings = Photo.find(params[:photo_id]).photo_taggings

    respond_to do |format|
      format.json { render json: @photo_taggings }
    end
  end

  def create

    @photo_tagging = PhotoTagging.new(
      user_id: params[:user_id],
      photo_id: params[:photo_id],
      x_pos: params[:x_pos],
      y_pos: params[:y_pos]
    )

    if @photo_tagging.save
      render json: @photo_tagging
    else
      head :unprocessable_entity
    end
  end

end
