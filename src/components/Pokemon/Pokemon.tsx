import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, styled, Typography } from '@mui/material'

import { Move } from '../Move'
import { Stat } from '../Stat'
import { pokemonLoadingSelector, pokemonSelector } from '../../store/selectors'
import { getPokemonError, getPokemonLoading, getPokemonSuccess } from '../../store/actions'
import { fetchPokemon } from '../../api'

const Progress = styled(CircularProgress)(() => ({
  margin: 16,
}))
const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: 16,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}))
const Title = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 16,
  minWidth: 140,
  color: theme.palette.text.secondary,
  fontSize: 32,
  padding: 8,
}))
const Container = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))
const ImageTitle = styled('img')(() => ({
  width: 50,
  height: 50,
}))
const Image = styled('img')(() => ({
  width: 300,
  height: 300,
}))
const Details = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 16,
  color: theme.palette.text.secondary,
  fontSize: 24,
  padding: 8,
}))
const Moves = styled('div')(() => ({
  width: '100%',
  maxWidth: 1024,
}))
const Stats = styled('div')(() => ({
  width: '100%',
  maxWidth: 1024,
}))

export const Pokemon: FC = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const pokemon = useSelector(pokemonSelector)
  const loading = useSelector(pokemonLoadingSelector)

  useEffect(() => {
    console.log('####')
    dispatch(getPokemonLoading())
    name &&
      fetchPokemon(name)
        .then((response) => {
          dispatch(getPokemonSuccess(response?.data))
        })
        .catch((error) => {
          dispatch(getPokemonError(error))
        })
  }, [dispatch, name])

  return (
    <Container>
      {!!pokemon && (
        <Title>
          {pokemon?.name.toUpperCase()}
          {!!pokemon?.sprites?.front_default ? (
            <ImageTitle alt={pokemon?.name} src={pokemon?.sprites?.front_default} />
          ) : (
            <Box ml={2}>{`#${pokemon?.id}`}</Box>
          )}
        </Title>
      )}
      {loading && <Progress />}
      {pokemon && (
        <Wrapper>
          {pokemon.sprites?.other.dream_world.front_default && (
            <Image alt={pokemon.name} src={pokemon.sprites?.other.dream_world.front_default} />
          )}
          <Details>
            <Typography variant={'h3'} margin={2}>
              Moves:
            </Typography>
            <Moves>
              {pokemon.moves.map((move, index) => (
                <Move move={move.move} version_group_details={move.version_group_details} key={index} />
              ))}
            </Moves>
            <Typography variant={'h3'} margin={2}>
              Stats:
            </Typography>
            <Stats>
              {pokemon.stats.map((stat, index) => (
                <Stat base_stat={stat.base_stat} effort={stat.effort} stat={stat.stat} key={index} />
              ))}
            </Stats>
          </Details>
        </Wrapper>
      )}
    </Container>
  )
}
