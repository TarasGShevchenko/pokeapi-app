import React, { FC, useMemo, useState, MouseEvent } from 'react'
import { Popover, styled, Typography } from '@mui/material'

import { IMove } from '../../types'

const Container = styled(Typography)<{ color: string }>(({ theme, color }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 0,
  flexShrink: 0,
  borderRadius: theme.shape.borderRadius,
  lineHeight: '10px',
  fontSize: '10px',
  height: 20,
  minWidth: 20,
  whiteSpace: 'nowrap',
  padding: theme.spacing(0.5, 1),
  backgroundColor: color,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(1),
}))

const List = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: theme.spacing(1),
}))

const TAGS_COLORS = ['orange', 'blue', 'green', 'red', 'pink', 'blueviolet', 'crimson', 'burlywood', 'grey']

export const Move: FC<IMove> = ({ move, version_group_details }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const getRandomColor = useMemo(() => TAGS_COLORS[Math.floor(Math.random() * TAGS_COLORS.length)], [])

  const open = Boolean(anchorEl)

  return (
    <>
      <Container
        color={getRandomColor}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {move?.name}
      </Container>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <List>
          {version_group_details.map((detail, index) => (
            <li key={index}>
              Level:&nbsp;{detail.level_learned_at};&nbsp;&nbsp;Method: {detail.move_learn_method.name};
              &nbsp;&nbsp;Group:&nbsp;{detail.version_group.name}
            </li>
          ))}
        </List>
      </Popover>
    </>
  )
}
