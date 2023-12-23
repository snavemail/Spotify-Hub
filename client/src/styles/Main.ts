import styled from 'styled-components'

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 80px;
  ${`1200
    padding: 60px 50px;
  `};
  ${`768
    padding: 50px 40px;
  `};
  ${`480
    padding: 30px 25px;
  `};
  h2 {
    ${`768
      text-align: center;
    `};
  }
`

export default Main
