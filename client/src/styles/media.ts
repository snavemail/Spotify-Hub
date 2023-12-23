import { css, CSSObject, CSSProp } from 'styled-components'

const sizes: Record<string, number> = {
  giant: 1440,
  desktop: 1200,
  netbook: 1000,
  tablet: 768,
  thone: 600,
  phablet: 480,
  phone: 376,
  tiny: 330,
}

type MediaObject = Record<
  string,
  (template: TemplateStringsArray, ...args: CSSObject[]) => CSSProp
>

const media: MediaObject = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16

  accumulator[label] = (template: TemplateStringsArray, ...args: CSSObject[]) => css`
    @media (max-width: ${emSize}em) {
      ${css(template, ...args)};
    }
  `
  return accumulator
}, {} as MediaObject)

export default media
