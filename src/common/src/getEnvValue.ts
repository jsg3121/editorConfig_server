type GetEnvValue = (key: string, defaultVal: string) => string

/**
 * info : .env파일 내에 있는 정보 가져오기
 * @author 장선규 jsg3121
 * @param key env에 저장된 정보
 * @param defaultVal env에 정보가 존재하지 않을 때 적용되는 값
 * @returns 저장된 정보
 */
export const getEnvValue: GetEnvValue = (key, defaultVal) => {
  const value = process.env[key]

  if (value === undefined || value === null) {
    return defaultVal
  }

  return value
}
