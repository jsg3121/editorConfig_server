export interface IPrettier {
  arrowParens: 'always' | 'avoid'
  bracketSpacing: boolean
  endOfLine: 'auto' | 'lf' | 'crlf' | 'cr'
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore'
  jsxBracketSameLine: boolean
  jsxSingleQuote: boolean
  printWidth: number
  proseWrap: 'preserve' | 'always' | 'never'
  quoteProps: 'as-needed' | 'consistent' | 'preserve'
  semi: boolean
  singleQuote: true
  tabWidth: number
  trailingComma: 'all' | 'es5' | 'none'
  useTabs: boolean
  vueIndentScriptAndStyle: boolean
}
