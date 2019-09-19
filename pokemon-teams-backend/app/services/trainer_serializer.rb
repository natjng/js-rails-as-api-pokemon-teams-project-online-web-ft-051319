class TrainerSerializer
  # use with fast json api
  # include FastJsonapi::ObjectSerializer
  # attributes :name
  # has_many :pokemons

  def initialize(trainer_obj)
    @trainer = trainer_obj
  end

  def to_serialized_json
    options = {}
    options[:include] = {
      pokemons: {
        only: [:id, :nickname, :species, :trainer_id]
      }
    }
    options[:except] = [:created_at, :updated_at]

    @trainer.to_json(options)
  end
end
