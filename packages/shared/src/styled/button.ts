import {css} from './index'

const base = css`
padding: 0;
margin: 0;
background: none;
border: 0;
outline: none;
`

export const ghost = css`
${base}
border: 1px solid ${props => props.theme.borderColor};
padding: 3px 10px;
background: transparent;
`

export const solid = css`
${base};
background: ${props => props.theme.borderColor};
padding: 3px 10px;
color: #fff;
fill: #fff;
`

export const plain = css`
${base};
`

export const circle = css`
${base};
border: 1px solid ${props => props.theme.borderColor};
border-radius: 50%;
background: transparent;
`
