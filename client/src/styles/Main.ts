import styled from 'styled-components'
import { media } from './media'

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 80px;
  ${media.desktop`
    padding: 60px 50px;
  `};
  ${media.lgtablet`
    padding: 50px 40px;
  `};
  ${media.smtablet`
    padding: 30px 25px;
  `};
  h1,
  h2 {
    ${media.lgtablet`
      text-align: center;
    `};
  }
`

export default Main
