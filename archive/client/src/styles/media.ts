import { css, CSSObject, CSSProp } from 'styled-components'

const sizes: Record<string, number> = {
  large: 1440,
  desktop: 1200,
  notebook: 1000,
  lgtablet: 768,
  smtablet: 600,
  lgphone: 480,
  smphone: 376,
  tiny: 330,
}

type MediaObject = Record<
  string,
  (template: TemplateStringsArray, ...args: CSSObject[]) => CSSProp
>

export const media: MediaObject = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16

  accumulator[label] = (template: TemplateStringsArray, ...args: CSSObject[]) => css`
    @media (max-width: ${emSize}em) {
      ${css(template, ...args)};
    }
  `
  return accumulator
}, {} as MediaObject)

export default media
