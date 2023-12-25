import React from 'react'
import { UserInterface } from '../types'
import { AvatarWrapper } from './Home'
import { styled } from 'styled-components'

const UserWrapper = styled.div`
  height: 200px;
`

const InfoWrapper = styled.div`
  flex-direction: column;
`

export default function User(user: UserInterface) {
  return (
    <UserWrapper>
      <AvatarWrapper>
        <img src={user.images[-1].url} alt={'profile'}></img>
      </AvatarWrapper>
      <InfoWrapper>
        {user.display_name}
        {user.followers.total}
      </InfoWrapper>
    </UserWrapper>
  )
}
