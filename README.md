# multicpa-landing

Лендинг MultiCPA на React и TypeScript. Сборка идёт через Vite.

## Стек

- React
- TypeScript, без JavaScript-файлов в исходниках
- Vite
- `fetch` для запросов к API
- свой i18n: словари подписей, которых нет в API
- React Hook Form
- SCSS Modules
- GSAP
- комбинированный прелоадер
- Biome
- правила для ИИ-ассистента

## Архитектура

Используется облегчённый FSD. Слой может зависеть только от слоёв ниже. `shared` не знает верхние слои.

Схема слоёв, страниц и связей лежит в [docs/architecture.md](docs/architecture.md).

## Запуск

Сначала установи зависимости:

```bash
npm install
```

Дальше:

```bash
npm run dev
```

Dev-сервер поднимается на `http://localhost:5173/`.

Сборка проверяет типы и собирает продакшен-бандл:

```bash
npm run build
```

Готовую сборку из `dist` можно посмотреть локально:

```bash
npm run preview
```

## Алиасы

Базовый алиас `@` указывает на `src`. Он настроен и в Vite, и в TypeScript (`paths` в `tsconfig.app.json`).

Импорт из корня исходников выглядит так:

```ts
import { something } from '@/shared/ui'
```

В `vite.config.ts` алиас вынесен в `resolvePath`, чтобы туда же можно было добавить следующие пути.

## Сборка

В продакшен-сборке Vite 8 удаляет `console` и `debugger`. Это задано через Rolldown, а не через старый синтаксис esbuild:

```ts
build: {
  rolldownOptions: {
    output: {
      minify: {
        compress: {
          dropConsole: true,
          dropDebugger: true,
        },
      },
    },
  },
},
```

## Что сознательно не включено

**React Compiler** не подключён. Рендеры и оптимизацию сначала разбираем вручную. Компилятор можно добавить позже, когда эта практика будет не нужна.

**Proxy** в Vite на старте не настраивался: нужды в нём пока нет. Если появится CORS или захочется упростить запросы к API, proxy добавляется в `vite.config.ts` на этапе реализации запросов.

**Biome** установлен без своих правил. Конфигурацию нужно создать отдельно:

```bash
npx biome init
```
