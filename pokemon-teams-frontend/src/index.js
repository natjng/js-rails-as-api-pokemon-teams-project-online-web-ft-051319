const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

function getTrainers() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(trainers => {
            trainers.forEach(trainer => {
                renderTrainers(trainer)
            })
        })
};

function renderTrainers(trainer) {
    const div = document.createElement('div')
    let p = document.createElement('p')
    let addBtn = document.createElement('button')
    let ul = document.createElement('ul')
    
    div.className = 'card'
    div.dataset.id = trainer.id
    p.innerText = trainer.name
    addBtn.setAttribute('data-trainer-id', trainer.id)
    addBtn.innerText = "Add Pokemon"

    // can also add event listener on each trainer div instead of the button, like below
    // div.addEventListener('click', handleClick)
    // function handleClick() {
    //     if (event.target.innerText === "Add Pokemon") {
    //         postPokemon(parseInt(event.target.dataset.trainerId))
    //     }
    //     if (event.target.innerText === "Release") {
    //         releasePokemon(parseInt(event.target.dataset.pokemonId))
    //     }
    // }

    trainer.pokemons.forEach(pokemon => {
        ul.innerHTML += `
        <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
        `
    });

    main.append(div)
    div.append(p, addBtn, ul)

    addBtn.addEventListener('click', (e) => {
        console.log(e.target.dataset)
        postPokemon(e.target.dataset.trainerId)
    });

    let releaseBtn = document.querySelectorAll('.release')
    releaseBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.dataset)
            releasePokemon(e.target.dataset.pokemonId)
        })
    });
};

function postPokemon(trainerId) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ trainer_id: parseInt(trainerId) })
    }
    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(json => {
            let trainerCard = document.querySelector(`[data-id="${trainerId}"]`)
            let ul = trainerCard.getElementsByTagName('ul')[0]
            console.log(trainerCard);
            console.log(ul);
            
            ul.innerHTML += `
                <li>${json.nickname} (${json.species}) <button class="release" data-pokemon-id=${json.id}>Release</button></li>
            `
        })
};

function releasePokemon(pokemonId) {
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({id: parseInt(pokemonId)})
    }
    fetch(`${POKEMONS_URL}/${pokemonId}`, configObj)
        .then( () => {
            let li = document.querySelector(`[data-pokemon-id="${pokemonId}"]`).parentElement
            li.remove()
        })

    // can also make a delete request like this
    // fetch(`${POKEMONS_URL}/${pokemonId}`, {
    //     method: "DELETE",
    // })
};

getTrainers()