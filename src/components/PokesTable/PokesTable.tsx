import React, { FC, useCallback, useEffect, MouseEvent, ChangeEvent, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CircularProgress,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  MenuItem,
  Button,
} from '@mui/material'

import {
  getAllPokemonError,
  getAllPokemonLoading,
  getAllPokemonSuccess,
  selectPage,
  selectLimit,
  selectType,
  getTypesLoading,
  getTypesSuccess,
  getTypesError,
  getAllPokemonByTypeSuccess,
  searchPokemon,
} from '../../store/actions'
import {
  allPokemonLoadingSelector,
  allPokemonSelector,
  allTypesSelector,
  limitSelector,
  offsetSelector,
  pageSelector,
  searchByNameSelector,
  typeSelector,
} from '../../store/selectors'
import { fetchAllPokemon, fetchAllPokemonByType, fetchAllTypes, fetchPokemon } from '../../api'
import { getIdFromUrl } from '../../utils'

const Container = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}))
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}))
const SearchWrapper = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 1024,
  width: '100%',
}))
const InputWrapper = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: 8,
}))
const InputSearch = styled(TextField)(({ theme }) => ({
  margin: 8,
  '& label.Mui-focused': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.secondary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.text.secondary,
    },
  },
}))
const ButtonSubmit = styled(Button)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.default,
  margin: '8px auto',
  minWidth: 140,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: 4,
  '& .MuiInputBase-root': {
    fontSize: 12,
  },
}))
const ActionsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: 8,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}))
const Select = styled(TextField)(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.default,
  margin: '8px auto',
  minWidth: 140,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: 6,
  '& .MuiInputBase-root': {
    fontSize: 12,
    '& .MuiSelect-select': {
      padding: 8,
    },
  },
}))

const PokemonList = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}))
const TableWrapper = styled('div')(() => ({
  display: 'flex',
  maxWidth: 600,
  width: '100%',
  margin: 16,
}))
const PokemonTile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}))
const TileContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}))

const Progress = styled(CircularProgress)(() => ({
  margin: 16,
}))

const TableHeadStyled = styled(TableHead)(() => ({
  width: 300,
  backgroundColor: '#2f81f7',
}))
const TableRowStyled = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}))
const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: 'center',
  padding: 6,
  borderBottom: 'none',
}))
const Card = styled('div')(({ theme }) => ({
  borderRadius: 8,
  maxWidth: 200,
  padding: '1rem',
  margin: 16,
  textAlign: 'center',
  cursor: 'pointer',
  boxShadow: `0 4px 8px 0 ${theme.palette.text.disabled}`,

  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}))
const ListWrapper = styled('div')(() => ({
  textAlign: 'center',
  maxWidth: 1024,
  width: '100%',
  margin: '16px auto',
}))
const PaginationStyled = styled(Pagination)(() => ({
  '& > ul': {
    justifyContent: 'center',
  },
}))
const NoData = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: 34,
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: '16px auto',
}))

export const PokesTable: FC = () => {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allPokemon = useSelector(allPokemonSelector)
  const allPokemonType = useSelector(allTypesSelector)
  const pokemonType = useSelector(typeSelector)
  const page = useSelector(pageSelector)
  const limit = useSelector(limitSelector)
  const offset = useSelector(offsetSelector)
  const loading = useSelector(allPokemonLoadingSelector)
  const search = useSelector(searchByNameSelector)

  useEffect(() => {
    if (search.length) {
      dispatch(getAllPokemonLoading())
      fetchPokemon(search)
        .then((response) => {
          dispatch(
            getAllPokemonSuccess({
              count: 1,
              next: null,
              previous: null,
              results: [{ name: response?.data?.name, url: `pokemon/${response?.data?.id.toString()}` }],
            }),
          )
        })
        .catch((error) => {
          dispatch(searchPokemon(''))
          dispatch(getAllPokemonError(error))
        })
    } else if (pokemonType === 'all') {
      dispatch(getAllPokemonLoading())
      fetchAllPokemon(offset, limit)
        .then((response) => {
          dispatch(getAllPokemonSuccess(response?.data))
        })
        .catch((error) => {
          dispatch(getAllPokemonError(error))
        })
    } else {
      dispatch(getAllPokemonLoading())
      fetchAllPokemonByType(pokemonType)
        .then((response) => {
          dispatch(getAllPokemonByTypeSuccess(response?.data.pokemon))
        })
        .catch((error) => {
          dispatch(getAllPokemonError(error))
        })
    }
    dispatch(getTypesLoading())
    fetchAllTypes()
      .then((response) => {
        dispatch(getTypesSuccess(response?.data.results))
      })
      .catch((error) => {
        dispatch(getTypesError(error))
      })
  }, [dispatch, pokemonType, limit, offset, search])

  const changeHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }, [])

  const handleSubmit = useCallback(() => {
    setValue('')
    dispatch(searchPokemon(value))
  }, [dispatch, value])

  const resetInput = useCallback(() => {
    setValue('')
    dispatch(searchPokemon(''))
  }, [dispatch])

  const handleRow = useCallback(
    (event: MouseEvent<HTMLTableRowElement>) => {
      const { name } = event.currentTarget.dataset
      navigate(`/${name}`)
    },
    [navigate],
  )

  const handleTableType = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(selectType(event.target.value))
    },
    [dispatch],
  )

  const handleChangePage = useCallback(
    (event: ChangeEvent<unknown>, newPage: number) => {
      event.stopPropagation()
      dispatch(selectPage({ page: newPage, offset: limit * (newPage - 1) }))
    },
    [limit, dispatch],
  )

  const handlePageRows = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(selectLimit({ limit: +event.target.value }))
    },
    [dispatch],
  )

  const types = useMemo(() => ['all'].concat(...allPokemonType.map((type) => type.name)), [allPokemonType])

  const pokemonByTypeToDisplay = useMemo(
    () => allPokemon?.results?.slice(offset, limit * page) || [],
    [allPokemon, offset, limit, page],
  )

  return (
    <Container>
      <SearchContainer>
        <SearchWrapper>
          <InputWrapper>
            <InputSearch fullWidth variant={'outlined'} placeholder={'Search'} value={value} onChange={changeHandle} />
            <ButtonSubmit onClick={handleSubmit}>Submit</ButtonSubmit>
            <ButtonSubmit onClick={resetInput}>Reset</ButtonSubmit>
          </InputWrapper>
          <ActionsWrapper>
            <Select id={'select-type'} select value={pokemonType} onChange={handleTableType}>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
            {allPokemon?.count && (
              <PaginationStyled
                shape="rounded"
                variant="outlined"
                count={
                  pokemonType === 'all'
                    ? Math.ceil(allPokemon.count / limit)
                    : Math.ceil(allPokemon?.results.length / limit) || 0
                }
                defaultPage={page}
                page={page}
                onChange={handleChangePage}
              />
            )}
            <Select id={'select-page-rows'} select value={limit} onChange={handlePageRows}>
              {[10, 25, 50].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </ActionsWrapper>
        </SearchWrapper>
      </SearchContainer>
      {loading ? (
        <Progress />
      ) : allPokemon?.results?.length ? (
        <ListWrapper>
          {pokemonType !== 'all' ? (
            <PokemonTile>
              <TileContainer>
                {pokemonByTypeToDisplay?.map(({ name, url }, index) => (
                  <Card key={index} onClick={handleRow} data-name={name}>
                    {`#${getIdFromUrl(url)}: ${name?.toUpperCase()}`}
                  </Card>
                ))}
              </TileContainer>
            </PokemonTile>
          ) : (
            <PokemonList>
              <TableWrapper>
                <TableContainer>
                  <Table>
                    <TableHeadStyled>
                      <TableRow>
                        {['ID', 'Name'].map((head) => (
                          <TableCellStyled key={head} align={'right'}>
                            {head}
                          </TableCellStyled>
                        ))}
                      </TableRow>
                    </TableHeadStyled>
                    <TableBody>
                      {allPokemon?.results?.map(({ name, url }, index) => {
                        return (
                          <TableRowStyled key={index} onClick={handleRow} data-name={name}>
                            <TableCellStyled>
                              <div>{getIdFromUrl(url)}</div>
                            </TableCellStyled>
                            <TableCellStyled>
                              <div>{name?.toUpperCase()}</div>
                            </TableCellStyled>
                          </TableRowStyled>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableWrapper>
            </PokemonList>
          )}
        </ListWrapper>
      ) : (
        <NoData>No pokemon</NoData>
      )}
    </Container>
  )
}
