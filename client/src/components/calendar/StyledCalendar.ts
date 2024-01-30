import styled from 'styled-components'
import { StyledButton } from './StyledButton'

export const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4px;

  justify-content: center;
  align-items: center;
  width: 100%;
`

// Example styling for the items inside the grid
export const Month = styled(StyledButton)``
