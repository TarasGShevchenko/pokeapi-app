import React, { FC } from 'react'
import { styled } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

import { IStat } from '../../types'

const Container = styled('div')(({ theme }) => ({
  textAlign: 'start',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 2fr)',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '2fr 2fr 1fr 1fr',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  padding: theme.spacing(0.5),
}))
const Linear = styled(LinearProgress)(({ theme }) => ({
  width: 300,
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
  [theme.breakpoints.down('md')]: {
    width: 200,
  },
  [theme.breakpoints.down('sm')]: {
    width: 150,
  },
}))
const Text = styled('div')(() => ({
  fontWeight: 600,
  fontSize: 12,
}))

export const Stat: FC<IStat> = ({ stat, base_stat, effort }) => {
  return (
    <Container>
      <Text>{`${stat.name.toUpperCase()}:`}&nbsp;</Text>
      <Linear variant="determinate" value={base_stat} />
      <Text>&nbsp;{`${base_stat}%`}</Text>
      <Text>&nbsp;{`Effort: ${effort}`}</Text>
    </Container>
  )
}
