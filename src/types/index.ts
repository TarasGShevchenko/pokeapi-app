export type PokemonTypes = { name: string; url: string }

export type PokemonResult = {
  count: number
  next: string | null
  previous: string | null
  results: Poke[]
}
export type Poke = {
  name: string
  url: string
}

export type Pokemon = {
  id: number
  name: string
  sprites: {
    front_default: string
    other: { dream_world: { front_default: string } }
  }
  moves: IMove[]
  stats: IStat[]
}

export interface IMove {
  move: {
    name: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: { name: string }
    version_group: { name: string }
  }[]
}

export interface IStat {
  base_stat: number
  effort: number
  stat: { name: string }
}
