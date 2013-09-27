class Api::PhotosController < ApplicationController

  def index
    @photos = current_user.photos

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @photos }
    end
  end

  def new
    @photo = Photo.new
    render :new
  end

  def create
    @photo = Photo.new(title: params[:title], url: params[:url])
    @photo.owner_id = current_user.id

    if @photo.save
      render json: @photo
    else
      head :unprocessable_entity
    end
  end


end
