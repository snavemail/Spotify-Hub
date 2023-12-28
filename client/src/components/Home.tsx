import { useEffect, useState } from 'react'
import { getProfile } from '../spotify'
import { styled } from 'styled-components'
import { media } from '../styles'
import { UserInterface } from '../types'
import { MainContent } from './MainContent'
import { LeftNavbar } from './LeftNavbar'

const Container = styled.div`
  display: flex;
  height: 100vh;

  ${media.lgtablet`
  flex-direction: column;
`};
`

export default function Home() {
  const [user, setUser] = useState<UserInterface | null>(null)

  useEffect(() => {
    const getMyProfile = async () => {
      const myUser = await getProfile()
      setUser(myUser.data)
    }
    getMyProfile()
  }, [])

  return (
    <Container>
      <LeftNavbar user={user} />
      <MainContent />
    </Container>
  )
}
