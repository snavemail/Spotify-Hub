import styled from 'styled-components'
import { theme } from '../../styles'

export const StyledButton = styled.button`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  background-color: ${theme.colors.black};
  color: ${theme.colors.spotifyGreen};
  font-weight: 700;
  border-radius: 11px;
  border: 1px solid ${theme.colors.white};
  padding: 8px 19px;
  cursor: pointer;
  transition: ${theme.transition};

  &:hover,
  &:focus {
    color: ${theme.colors.offGreen};
    outline: 0;
  }
`

export const StyledArrowButton = styled(StyledButton)`
  cursor: pointer;
  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;
    background-color: gray;
    color: ${theme.colors.darkGrey};
  }

  font-size: 11px;
  padding: 0px 20px;
`
