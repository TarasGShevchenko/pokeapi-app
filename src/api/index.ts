import axios from 'axios'

const apiUrl = 'https://pokeapi.co/api/v2'

export const fetchAllTypes = async () => await axios.get(`${apiUrl}/type`)

export const fetchAllPokemonByType = async (type: string) => await axios.get(`${apiUrl}/type/${type}`)

export const fetchAllPokemon = async (offset: number, limit: number) =>
  await axios.get(`${apiUrl}/pokemon`, {
    params: {
      offset: offset,
      limit: limit,
    },
  })

export const fetchPokemon = async (name: string) => await axios.get(`${apiUrl}/pokemon/${name}`)
