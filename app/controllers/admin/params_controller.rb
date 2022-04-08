class Admin::ParamsController < AdminController
  before_action :set_param, only: [:show, :edit, :update, :destroy]

  # GET /params
  # GET /params.json
  def index
    @params = Param.all
  end

  # GET /params/types.json
  def types
    @types = params[:type] && Param.send("all_#{params[:type]}_types") || Param.all_types;
    
    respond_to do |format|
      format.json { render json: @types }
    end
  end

  # GET /params/1
  # GET /params/1.json
  def show
  end

  # GET /params/new
  def new
    @param = Param.new
  end

  # GET /params/1/edit
  def edit
  end

  # POST /params
  # POST /params.json
  def create
    @param = Param.new(param_params)

    respond_to do |format|
      if @param.save
        format.html { redirect_to @param, notice: 'Param was successfully created.' }
        format.json { render :show, status: :created, location: @param }
      else
        format.html { render :new }
        format.json { render json: @param.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /params/1
  # PATCH/PUT /params/1.json
  def update
    respond_to do |format|
      if @param.update(param_params)
        format.html { redirect_to @param, notice: 'Param was successfully updated.' }
        format.json { render :show, status: :ok, location: @param }
      else
        format.html { render :edit }
        format.json { render json: @param.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /params/1
  # DELETE /params/1.json
  def destroy
    @param.destroy
    respond_to do |format|
      format.html { redirect_to params_url, notice: 'Param was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_param
      @param = Param.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def param_params
      params.require(:param).permit(:name, :value)
    end
end
