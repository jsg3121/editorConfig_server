const Prettier = {
  Options: {
    arrowParens: '',
    bracketSpacing: false,
    endOfLine: '',
    htmlWhitespaceSensitivity: '',
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    printWidth: 0,
    proseWrap: '',
    quoteProps: '',
    semi: false,
    singleQuote: false,
    tabWidth: 0,
    trailingComma: '',
    useTabs: false,
    vueIndentScriptAndStyle: false,
  },
  Description: {
    arrowParens: {
      desc: `화살표 함수 괄호 사용 방식을 지정합니다 `,
      type: 'select',
      value: {
        always: '(x) => x',
        avoid: 'x => x',
      },
    },
    bracketSpacing: {
      desc: '객체 리터럴에서 괄호에 공백 삽입 여부',
      type: 'boolean',
      value: {
        true: '{ foo: bar }',
        false: '{foo: bar}',
      },
    },
    endOfLine: {
      desc: 'EoF 방식, OS별로 처리 방식이 다름',
      type: 'select',
      value: {
        lf: 'Linux, MacOS에서 공통으로 사용되며 줄바꿈만 사용합니다.',
        crlf: 'Window에서 공통으로 사용하며 캐리지 리턴과 줄바꿈 모두 사용합니다.',
        cr: '캐리지 리턴문자만 사용합니다.',
        auto: '기존 줄 끝을 유지합니다',
      },
    },
    htmlWhitespaceSensitivity: {
      desc: `HTML의 인라인 요소 공백을 인식합니다`,
      type: 'select',
      value: {
        css: 'css display속성에 따라 포맷팅 됩니다.',
        strict: '모든 공백을 인라인 요소처럼 포맷합니다.',
        ignore: '모든 공백을 블록 요소처럼 포맷합니다.',
      },
    },
    jsxBracketSameLine: {
      desc: 'JSX의 마지막 `>`를 다음 줄로 내릴지 여부',
      type: 'boolean',
      value: {
        true: `
          <button
            className="prettier-class"
            id="prettier-id"
            onClick={this.handleClick}>
            Click Here
          </button>
        `,
        false: `
          <button
            className="prettier-class"
            id="prettier-id"
            onClick={this.handleClick}
          >
            Click Here
          </button>
        `,
      },
    },
    jsxSingleQuote: {
      desc: 'JSX에 single 쿼테이션 사용 여부',
      type: 'boolean',
    },
    printWidth: {
      desc: '줄 바꿈 할 폭 길이 (가독성을 위한 Prettier의 적정 권고 길이는 80입니다)',
      type: 'number',
    },
    proseWrap: {
      desc: 'markdown 텍스트의 줄바꿈 방식을 설정합니다 (v1.8.2이상 사용가능)',
      type: 'select',
      value: {
        always: '너비를 초과하는 경우 줄바꿈을 실행합니다.',
        never: '문장 블록에 따라 줄바꿈을 실행합니다.',
        preserve:
          '사용자의 입력에 따라 줄바꿈을 실행합니다 (v1.9.0이상에서 사용가능)',
      },
    },
    quoteProps: {
      desc: '객체 속성에 key의 쿼테이션 적용 방식을 설정합니다',
      type: 'select',
      value: {
        'as-needed': `
          quote를 감싸지 않으면 안되는 문자("-")등이 있으면 해당 key name을 제외하고 모든 qoute를 제거합니다.

          obj: {
              'x-x-x': {},
              yy: 123,
              abCde: 'text',
          },
        `,
        consistent: `
          quote를 감싸지 않으면 안되는 문자("-")등이 있으면 모든 key name에 qoute를 적용합니다.

          obj: {
            'x-x-x': {},
            'yy': 123,
            'abCde': 'text',
          },
        `,
        preserve: `
          객체의 Syntax에 맞다면 사용자가 입력한 그대로 quote를 적용합니다.
        `,
      },
    },
    semi: {
      desc: '세미콜론 사용 여부를 설정합니다.',
      type: 'boolean',
    },
    singleQuote: {
      desc: 'single 쿼테이션 사용 여부를 설정합니다.',
      type: 'boolean',
    },
    tabWidth: {
      desc: '탭 너비를 설정합니다. 1 => 띄어쓰기 한 번의 공백',
      type: 'number',
    },
    trailingComma: {
      desc: '여러 줄을 사용할 때 후행 콤마 사용 방식을 설정합니다.',
      type: 'select',
      value: {
        es5: '유효한 곳에서 허용하돌록 설정합니다. 타입스크립트의 함수 파라미터에는 허용되지 않습니다.',
        none: '모든 곳에서 허용하지 않습니다.',
        all: '허용 가능한 모든 곳에서 적용합니다.',
      },
    },
    useTabs: {
      desc: 'tab 키를 사용하여 들여쓰기 여부를 설정합니다.',
      type: 'boolean',
    },
    vueIndentScriptAndStyle: {
      desc: 'Vue 파일의 script와 style 태그의 들여쓰기 여부를 지정합니다. (v1.19.0이상 사용가능)',
      type: 'boolean',
      value: {
        true: `
          <script>
          export default {
              mounted() {
                  console.log("Heollo World");
              }
          };
          </script>
          <style>
          body {
              display: block;
          }
          </style>
        `,
        false: `
          <script>
            export default {
                mounted() {
                    console.log("Heollo World");
                }
            };
          </script>
          <style>
            body {
                display: block;
            }
          </style>
        `,
      },
    },
  },
}

export default Prettier
