import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme, Main, mixins } from '../styles'
const { colors } = theme

const Container = styled.div`
  ${mixins.flexCenter};
  width: 100%;
  height: 100%;
  flex-direction: column;
`

const dance = keyframes`
  from {
    height: 11px;
  }
  to {
    height: 100%;
  }
`
const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  width: 100px;
  min-width: 100px;
  height: 52px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
  left: 0;
  right: 0;
`
const Bar = styled.div<{ delay: string }>`
  width: 10px;
  height: 5px;
  margin: 0 2px;
  background-color: ${colors.offGreen};
  animation-name: ${dance};
  animation-duration: 400ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.delay || '0ms'};
`

export default function Loader() {
  return (
    <Container>
      <Bars>
        <Bar delay="250ms" />
        <Bar delay="715ms" />
        <Bar delay="475ms" />
        <Bar delay="25ms" />
        <Bar delay="190ms" />
        <Bar delay="250ms" />
        <Bar delay="715ms" />
        <Bar delay="475ms" />
        <Bar delay="25ms" />
        <Bar delay="190ms" />
        <Bar delay="250ms" />
      </Bars>
    </Container>
  )
}
