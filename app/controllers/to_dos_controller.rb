# frozen_string_literal: true

# CRUD Controller for ToDos
class ToDosController < ApplicationController
  include ActionController::MimeResponds
  before_action :set_to_do, only: %i[show update destroy]

  # GET /to_dos
  # GET /to_dos.json
  def index
    @user = User.find(params[:user_id])
    @to_dos = @user.to_dos.all
  end

  # GET /to_dos/1
  # GET /to_dos/1.json
  def show; end

  # POST /to_dost
  # POST /to_dos.json
  def create
    @user =   User.find(params[:user_id])
    @to_do =  if to_do_params[:type] == 'SimpleToDo'
                @user.simple_to_dos.new(to_do_params)
              else
                @user.timed_to_dos.new(to_do_params)
              end
    if @to_do.save
      render :show, status: :created, location: user_to_do_url(@user, @to_do)
    else
      render json: @to_do.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /to_dos/1
  # PATCH/PUT /to_dos/1.json
  def update
    if @to_do.update(to_do_params)
      render :show, status: :ok, location: user_to_do_url(@user, @to_do)
    else
      render json: @to_do.errors, status: :unprocessable_entity
    end
  end

  # DELETE /to_dos/1
  # DELETE /to_dos/1.json
  def destroy
    @to_do.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_to_do
    @to_do = ToDo.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def to_do_params
    params.require(:to_do).permit(:garden_id, :title, :body, :complete, :start_time, :end_time, :type)
  end
end
