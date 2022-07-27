import dayjs from 'dayjs'

type CreateTokenExp = (expVal?: string | number) => string

/**
 * info : 토큰 만료일 설정
 * @author 장선규 jsg3121
 * @param exp 토큰 저장 기간
 * @returns 토큰 저장기간에 따른 실제 날짜 정보
 */
export const createTokenExpDate: CreateTokenExp = (exp) => {
  const expire = exp || ''

  const expDate = parseInt(expire.toString().replace('d', ''), 10)
  const date = dayjs().add(expDate, 'd').format('YYYY-MM-DD HH:mm:ss')

  return date
}
