# 디지털헬스케어 React 앱

이 프로젝트는 디지털헬스케어 브랜드 정보를 제공하는 React 웹 애플리케이션입니다.

## 주요 기능

- 🏥 **헬스케어 브랜드 정보**: 다양한 디지털헬스케어 브랜드 소개
- 👨‍⚕️ **관리자 페이지**: 콘텐츠 관리 시스템 (CRUD)
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- 🔍 **검색 및 필터링**: 브랜드 카테고리별 필터링

## 관리자 기능

- **건강 정보 관리**: 의료 관련 기사/콘텐츠 추가, 수정, 삭제
- **서비스 관리**: 헬스케어 서비스 정보 관리
- **의료진 관리**: 의사 정보 관리

## 기술 스택

- **Frontend**: React 19, Material-UI
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: CSS3, Material-UI Theme
- **Build Tool**: Create React App

## 실행 방법

### 개발 환경
```bash
npm install
npm start
```

### 프로덕션 빌드
```bash
npm run build
```

### GitHub Pages 배포
```bash
npm run deploy
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── layout/         # 레이아웃 컴포넌트
├── contexts/           # React Context
├── data/              # 목업 데이터
├── pages/             # 페이지 컴포넌트
└── assets/            # 정적 자원
```

## 페이지 구성

- **홈페이지** (`/`): 브랜드 목록 및 필터링
- **브랜드 상세** (`/brand/:id`): 개별 브랜드 정보
- **소개** (`/about`): 서비스 소개
- **문의하기** (`/contact`): 연락처 정보
- **관리자** (`/admin`): 콘텐츠 관리 시스템

## 배포 URL

https://cjk0604.github.io/calfit.github.io

## 라이선스

MIT License
