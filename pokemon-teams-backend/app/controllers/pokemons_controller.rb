class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        
        if trainer
            if trainer.pokemons.size < 6
                pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)
                render json: pokemon
            else
                render json: 'Team is full.'
            end
        else
            render json: "Trainer not found."
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:pokemon][:id])
        pokemon.destroy
    end
end
