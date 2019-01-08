class CampaignsController < ApplicationController
  before_action :set_campaign, only: [:show, :update, :destroy]
	before_action :authenticate_user

  # GET /campaigns
  def index
    @campaigns = Campaign.all

    render json: @campaigns
  end

  # GET /campaigns/1
  def show
    render json: @campaign
  end

	#GET /campaigns/mine
	def mine
		@campaigns = current_user.campaigns

		render json: @campaigns
	end

	#GET /campaigns/1/characters
	def characters
		@campaign = Campaign.find(params[:id])
		@characters = @campaign.characters

		render json: @characters
	end

  # POST /campaigns
  def create
    @campaign = current_user.campaigns.create(campaign_params)

    if @campaign.save
      render json: @campaign, status: :created, location: @campaign
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

	# POST /campaigns/1/characters/1
	def add_character
		@campaign = Campaign.find(params[:id])
		@character = Character.find(params{:character_id})

		@campaign.characters << @character
	end

  # PATCH/PUT /campaigns/1
  def update
    if @campaign.update(campaign_params)
      render json: @campaign
    else
      render json: @campaign.errors, status: :unprocessable_entity
    end
  end

  # DELETE /campaigns/1
  def destroy
    @campaign.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_campaign
      @campaign = Campaign.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def campaign_params
      params.require(:campaign).permit(:name)
    end
end
