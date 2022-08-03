**`.prettierrc`, `.gitignore` 와 같은 자주 사용하고 여러 설정을 다양하게 넣을 수 있는 config 파일을 사용자의 마우스 클릭으로 다양하게 제작하고 저장 재사용 할 수 있도록 도와주는 사이트의 서버**
(Wiki: https://github.com/jsg3121/editorConfig_server/wiki/Editor-Config-Page---Server)

# DataBase Scheme (use Prisma)

```prisma

model User {
  id               Int               @id @default(autoincrement()) // user 번호
  name             String            @unique @map("user_name") @db.VarChar(20) // 사용자 이름
  email            String            @unique @map("user_email") @db.VarChar(50) // 사용자 이메일(로그인 id)
  password         String            @map("user_password") @db.VarChar(100) // 사용자 패스워드 (암호확)
  createAt         DateTime          @default(now()) @map("create_at")
  settingList      SettingList[]
  refreshTokenList RefreshTokenList?

  @@map("user_info")
}

model SettingList {
  id           Int      @id @default(autoincrement()) // 설정 리스트 저장 번호
  user         User     @relation(fields: [userId], references: [id])
  userId       Int      @map("user_id") // 등록한 사용자 번호
  configType   String   @map("config_type") @db.VarChar(50) // 설정한 파일 대응 언어 타입
  configDetail String   @map("config_detail") @db.Text // 설정 내용
  createAt     DateTime @default(now()) @map("create_at") // 생성일
  updateAt     DateTime @map("update_at") // 수정일

  @@map("setting_list")
}

model TokenBlackList {
  id    Int    @id @default(autoincrement())
  token String @map("token") @db.Text

  @@map("token_balcklist")
}

model RefreshTokenList {
  id           Int      @id @default(autoincrement())
  user         User     @relation(fields: [userId], references: [id])
  userId       Int      @unique @map("user_id")
  refreshToken String   @map("refresh_token") @db.Text
  createAt     DateTime @default(now()) @map("create_at") // 생성일

  @@map("refresh_token_list")
}

```

<img width="384" alt="image" src="https://user-images.githubusercontent.com/44659617/182074244-489de0ba-f03b-452b-a434-6b6169c3d6f0.png">

---

# API

## Account

- rootPath : `/api/account`
- 계정 관련 API

### 이메일 중복체크

- API : `/valid/email`
- Methods : `GET`
- Request

| **key** | **type** | **비고**    |
| ------- | -------- | ----------- |
| email   | `string` | 유저 이메일 |

- Response

| **key**     | **type**           | **비고**       |
| ----------- | ------------------ | -------------- |
| status      | `success`, `error` | 성공 여부      |
| description | `string`           | 요청 결과 설명 |

---

### 이름 중복체크

- API : `/valid/name`
- Methods : `GET`
- Request

| **key** | **type** | **비고**  |
| ------- | -------- | --------- |
| name    | `string` | 유저 이름 |

- Response

| **key**     | **type**           | **비고**       |
| ----------- | ------------------ | -------------- |
| status      | `success`, `error` | 성공 여부      |
| description | `string`           | 요청 결과 설명 |

---

### 회원가입

- API : `/signup`
- Methods : `POST`
- Request

| **key**  | **type** | **비고**      |
| -------- | -------- | ------------- |
| email    | `string` | 유저 이메일   |
| name     | `string` | 유저 이름     |
| password | `string` | 유저 비밀번호 |

- Response

| **key**     | **type** | **비고**       |
| ----------- | -------- | -------------- |
| code        | `number` | 성공 여부 코드 |
| description | `string` | 요청 결과 설명 |

---

### 로그인

- API : `/login`
- Methods : `POST`
- Request

| **key**  | **type** | **비고**      |
| -------- | -------- | ------------- |
| email    | `string` | 유저 이메일   |
| password | `string` | 유저 비밀번호 |

- Response - success

| **key**         | **type**  | **비고**              |
| --------------- | --------- | --------------------- |
| isLogin         | `boolean` | 로그인 결과           |
| accessToken     | `string`  | accessToken           |
| accessTokenExp  | `string`  | accessToken 유효기간  |
| refreshToken    | `string`  | refreshToken          |
| refreshTokenExp | `string`  | refreshToken 유효기간 |
| email           | `string`  | 로그인 계정 이메일    |
| name            | `string`  | 로그인 계정 이름      |

- Response - fail

| **key** | **type**  | **비고**    |
| ------- | --------- | ----------- |
| isLogin | `boolean` | 로그인 결과 |

---

### 로그아웃

- API : `/logout`
- Methods : `POST`
- Request

| **key**     | **type** | **비고**    |
| ----------- | -------- | ----------- |
| accessToken | `string` | accessToken |

- Response

| **key** | **type**  | **비고**    |
| ------- | --------- | ----------- |
| isLogin | `boolean` | 로그인 결과 |

---

### 자동 로그인 토큰 체크

- API : `/api/account/tokencheck`
- Methods : `POST`
- Request

| **key**      | **type** | **비고**     |
| ------------ | -------- | ------------ |
| accessToken  | `string` | accessToken  |
| refreshToken | `string` | refreshToken |

- Response - success

| **key**            | **type**  | **비고**                      |
| ------------------ | --------- | ----------------------------- |
| isLogin            | `boolean` | 로그인 결과(default : `true`) |
| newAccessToken     | `string`  | accessToken                   |
| newAccessTokenExp  | `string`  | accessToken 유효기간          |
| newRefreshToken    | `string`  | refreshToken                  |
| newRefreshTokenExp | `string`  | refreshToken 유효기간         |
| email              | `string`  | 로그인 계정 이메일            |
| name               | `string`  | 로그인 계정 이름              |

- Response - fail

| **key** | **type**  | **비고**                       |
| ------- | --------- | ------------------------------ |
| isLogin | `boolean` | 로그인 결과(default : `false`) |

---

## Config

- rootPath : `/api/config`
- Config 설정 파일 API

### 생성

- API : `/file`
- Methods : `POST`
- Request

| **key**    | **type** | **비고**               |
| ---------- | -------- | ---------------------- |
| userId     | `string` | 유저 데이터 id         |
| type       | `string` | 설정하려는 Config 종류 |
| configName | `string` | 설정된 config 저장명   |
| value      | `string` | config 설정값          |

- Response

| **key**     | **type** | **비고**       |
| ----------- | -------- | -------------- |
| code        | `number` | 성공 여부 코드 |
| description | `string` | 요청 결과 설명 |

---

### 조회

- API : `/file`
- Methods : `GET`
- Request

| **key** | **type** | **비고**       |
| ------- | -------- | -------------- |
| userId  | `string` | 유저 데이터 id |

- Response

| **key**     | **type** | **비고**       |
| ----------- | -------- | -------------- |
| code        | `number` | 성공 여부 코드 |
| description | `string` | 요청 결과 설명 |

---

### 수정

- API : `/file`
- Methods : `PATCH`
- Request

| **key** | **type** | **비고**               |
| ------- | -------- | ---------------------- |
| userId  | `string` | 유저 데이터 id         |
| type    | `string` | 설정하려는 Config 종류 |
| value   | `string` | config 설정값          |

- Response

| **key**     | **type** | **비고**       |
| ----------- | -------- | -------------- |
| code        | `number` | 성공 여부 코드 |
| description | `string` | 요청 결과 설명 |

---

### 삭제

- API : `/file`
- Methods : `DELETE`
- Request

| **key**    | **type** | **비고**               |
| ---------- | -------- | ---------------------- |
| userId     | `string` | 유저 데이터 id         |
| type       | `string` | 설정하려는 Config 종류 |
| configName | `string` | 설정된 config 저장명   |

- Response

| **key**     | **type** | **비고**       |
| ----------- | -------- | -------------- |
| code        | `number` | 성공 여부 코드 |
| description | `string` | 요청 결과 설명 |

---
