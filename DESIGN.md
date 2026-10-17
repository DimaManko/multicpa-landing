# MultiCPA — Style Reference

> Тёмный полноэкранный лендинг: жёлтые подписи, фиолетовый акцент, крупный Halvar

**Theme:** dark

Источник правды для токенов — SCSS в `src/shared/assets/styles`. Стили компонента лежат рядом с ним в `*.module.scss`: класс локальный и в JSX берётся из объекта стилей. Глобальный файл один — `src/app/styles/index.scss`, его подключает `main.tsx`. Размеры текстов и самих элементов совпадают с макетом. Координаты и зазоры между блоками пиксель в пиксель не повторяются: страница должна жить на разных экранах, в том числе на 13 дюймах. Радиусы, тени и ховеры в токены пока не сняты.

Четыре экрана занимают всю высоту окна. Контент сидит в полосе не шире 1440px и сдвинут на 50px от левого и правого края этой полосы. Заголовки секций и пункт меню — Halvar Breitschrift Bold, жёлтые, капсом. Основной текст тоже Halvar Bold. Серый текст карточек — Stolzl Regular белым на 70%.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Dark | `#14091a` | `$color-dark` | Тёмный цвет макета. На `body` его не ставить: живой фон с градиентом рисует отдельный слой |
| Purple | `#9e13e0` | `$color-purple` | Акцент. В макете это и `main`, и `purp` |
| Yellow | `#fee97d` | `$color-yellow` | Подписи секций и пункт меню |
| White | `#ffffff` | `$color-white` | Основной текст. В карточках тот же цвет с `opacity: 0.7` |
| Ink | `#0c090e` | `$color-ink` | Почти чёрный, темнее фона |

## Tokens — Typography

### Halvar Breitschrift — Крупный гротеск экранов, меню, кнопок и основного текста · `$font-family-base`

- **Файлы:** Light 300, Regular 400, Medium 500, Bold 700
- **В миксинах:** 700
- **Sizes:** 20px, 23px, 40px
- **Line height:** 1 у кнопки, 1.2 у текста, 0.9 у названий секций. У пункта меню `line-height` не задаётся
- **Letter spacing:** `0.2em` у кнопки, `-0.04em` у названий секций. У остального текста трекинг не задаётся
- **Role:** Заголовки, меню, кнопки, основной текст. Начертание 900 в файлах нет

### Stolzl — Текст карточек · `$font-family-second`

- **Файлы:** Light 300, Regular 400
- **В миксинах:** 400
- **Sizes:** 20px
- **Line height:** 1.2
- **Role:** Серый поясняющий текст в карточках. Цвет белый, непрозрачность 70%

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Mixin |
|------|--------|--------|------|-------------|----------------|-------|
| body | Halvar Breitschrift | 700 | 20px | 1.2 | — | `font-body` |
| menu | Halvar Breitschrift | 700 | 20px | — | — | `font-menu` |
| button | Halvar Breitschrift | 700 | 23px | 1 | 0.2em | `font-button` |
| section | Halvar Breitschrift | 700 | 40px | 0.9 | -0.04em | `font-section` |
| card | Stolzl | 400 | 20px | 1.2 | — | `font-card` |

`$font-tracking-button: 0.2em` — это чтение значения Figma `20` как 20%. Если в панели Text у кнопки стоят пиксели, в переменной должно быть `20px`.

## Tokens — Spacing & Shapes

Отдельной шкалы 4px нет. В токены попали только размеры, которые повторяются и должны совпасть с макетом.

| Name | Value | Token |
|------|-------|-------|
| screen width | 1440px | `$screen-width` |
| screen height | 100% | `$screen-height` |
| side inset | 50px | `$layout-padding-x` |
| social icon | 40px | `$social-size` |
| main button height | 82px | `$button-height` |
| choice button height | 90px | `$button-height-choice` |
| form button height | 35px | `$button-height-form` |
| field height | 36px | `$field-height` |
| modal width | 560px | `$modal-width` |
| progress width | 576px | `$progress-width` |
| progress height | 20px | `$progress-height` |
| sm | 640px | `$breakpoint-sm` |
| md | 768px | `$breakpoint-md` |
| lg | 1024px | `$breakpoint-lg` |
| xl | 1280px | `$breakpoint-xl` |
| 2xl | 1536px | `$breakpoint-2xl` |

Вёрстка desktop-first. Стили без медиазапроса — это макет 1440px. Брейкпоинт — ширина, ниже которой десктоп переопределяется через `max-width`. На практике хватает двух: `$breakpoint-lg` (1024px, планшет) и `$breakpoint-md` (768px, телефон). `$breakpoint-xl` — типичные 13 дюймов, если боковые 50px или крупный кегль уже тесны. `$breakpoint-sm` уже телефона, `$breakpoint-2xl` шире контейнера 1440px: в базовой вёрстке они не нужны. Контейнер и без запросов сжимается до окна и не шире 1440px.

Верхние и нижние отступы у экранов разные, общего токена для них нет.

Радиусы и тени в `_variables.scss` не заведены.

### Layout

- **Полоса контента:** не шире 1440px, по центру, `width: 100%`
- **Боковой отступ внутри полосы:** 50px слева и справа. Рабочая ширина на макете 1340px
- **Высота экрана:** 100% родителя, не фиксированные 900px
- **На экране уже 1440px:** полоса сжимается вместе с окном, боковые 50px остаются

## Components

### Main button

**Role:** Главное действие, герой и 404

Высота 82px, ширина по тексту. Halvar Bold 23px, `line-height: 1`, `letter-spacing: 0.2em`. Миксин `font-button` задаёт только текст. Высота на элементе: `$button-height`.

### Choice button

**Role:** «For Media Buyers», «For Businesses», «For Partners» на экране multiply

Высота 90px, ширина Hug, по содержимому. В макете первая кнопка залита жёлтым, две другие — контуром. Общий токен пока только высота `$button-height-choice`.

### Form button

**Role:** Кнопка внутри модалки заявки

Высота 35px, ширина по тексту. `$button-height-form`.

### Menu link

**Role:** Пункт шапки

Halvar Bold 20px, капс, жёлтый, подчёркнутый, `text-decoration-skip-ink: none`. Без `line-height`. Миксин `font-menu`.

### Section label

**Role:** MULTI-TASKS, MULTI-BENEFITS, MULTIPLY WITH US

Halvar Bold 40px, `line-height: 0.9`, `letter-spacing: -0.04em`, капс, жёлтый, выравнивание вправо. Миксин `font-section`.

### Card copy

**Role:** Серый текст под заголовком карточки

Stolzl Regular 20px, `line-height: 1.2`, белый, `opacity: 0.7`. Миксин `font-card`. Стиль жёлтого заголовка карточки в токены ещё не снят.

### Social icon

**Role:** Instagram, Telegram, LinkedIn внизу героя

Квадрат 40px. Миксин `social-link`. Кнопки тех же сетей в футере другие: высота около 43px и ширина по тексту, этот миксин на них не вешается.

### Modal

**Role:** Форма заявки и окно «заявка получена»

Ширина `min(100%, 560px)`. Общего внутреннего отступа нет: у двух состояний он разный.

### Field

**Role:** Поле формы

Высота 36px. `$field-height`.

### Progress

**Role:** Полоса прелоадера

Трек 576×20px. `$progress-width`, `$progress-height`.

### Screen

**Role:** Герой, tasks, benefits, multiply, 404, прелоадер

`position: relative`, ширина 100%, высота `$screen-height`, `overflow: hidden`. Миксин `screen`. Чтобы высота сработала, у `html`, `body` и `#root` тоже высота 100%.

## Do's and Don'ts

### Do

- Пиши стили виджета в `имя.module.scss` рядом с компонентом и подключай их как `import styles from "./имя.module.scss"`
- Называй классы по роли внутри файла: `.screen`, `.content`, `.button`. В JSX это `styles.screen`
- Бери цвета, кегли и высоты кнопок, полей, иконок и модалки из `_variables.scss`
- Ставь текст через миксины `font-body`, `font-menu`, `font-button`, `font-section`, `font-card`
- Ограничивай контент миксином `container`: максимум 1440px и 50px по бокам
- Делай экран миксином `screen` на всю высоту окна
- Оставляй ширину кнопок по тексту: на русской версии подписи длиннее
- Проверяй вёрстку на 13-дюймовом экране: секция на всю высоту окна, полоса не шире 1440px, размеры текстов и элементов те же
- Пиши десктоп без медиазапроса. Планшет и телефон дописывай ниже в том же модуле: `@media (max-width: $breakpoint-lg)` и `@media (max-width: $breakpoint-md)`. Меняй только то, что не влезает: кегль, боковой отступ, высоту кнопки, направление
- Если на телефоне экран не помещается в окно, у этого экрана замени высоту `screen` на `min-height` и сними `overflow: hidden`

### Don't

- Не пиши классы виджета в глобальном SCSS и не импортируй `app/styles` из виджета
- Не переименовывай `src/app/styles/index.scss` в `index.module.scss`: селекторы `html` и `body` захэшируются и не попадут на страницу
- Не ставь префиксы блока в имя класса модуля (`hero__button`). Область видимости и так ограничена файлом
- Не выравнивай блоки по координатам макета. Отступы сверху и снизу задаются в конкретном экране
- Не фиксируй ширину кнопок
- Не подставляй радиус, тень или ховер, пока значение не снято с компонента в Figma
- Не используй начертание 900: такого файла шрифта нет
- Не вешай `social-link` на кнопки футера
- Не задавай экрану высоту 900px
- Не пиши `@media (min-width: ...)`: запрос сужает макет, а не включает стили от этой ширины и выше
- Не заводи отдельные мобильные токены и не клади мобильные кегли в общие миксины. Миксины остаются десктопными, узкий экран переопределяет размер после `@include`

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 1 | Page | белый фон браузера | Пока пустая страница. Градиентный фон подключится отдельным виджетом |
| 2 | Ink | `#0c090e` | Более тёмная заливка, если она нужна поверх фона |
| 3 | Accent | `#9e13e0` | Фиолетовый акцент |
| 4 | Signal | `#fee97d` | Жёлтые подписи и активные надписи |

## Elevation

Тени в токены не сняты. Глубину пока не придумывать.

## Imagery

На экранах живой фон: тёмное поле, фиолетовые пятна и сетка. Поверх него кадры персонажа на герое, tasks, multiply и 404. Карточки tasks и benefits сочетают фото и текст. Отдельных декоративных иллюстраций в токенах нет: картинки остаются ассетами виджетов.

## Layout

Полоса 1440px по центру, внутри неё блоки начинаются на 50px от краёв. Каждый экран — один вьюпорт. Шапка на герое сверху, соцсети героя снизу слева квадратами 40px. На tasks, benefits и multiply подпись секции стоит справа. Бегущая строка benefits выходит за края экрана и обрезается `overflow: hidden`. Форма — модалка до 560px. На узком окне модалка сжимается до 100% ширины.

## Agent Prompt Guide

**Quick Color Reference**

- text: `#ffffff`
- page background: белый, пока градиентный слой не подключён
- dark token: `#14091a`
- accent: `#9e13e0`
- section and menu: `#fee97d`
- card copy: `#ffffff` at 70%

**Example Component Prompts**

1. *Экран секции:* файл `hero.module.scss`, локальный класс `.screen` с миксином `screen`, без заливки фона. Внутри локальный класс `.content` с миксином `container`. В JSX: `styles.screen`, `styles.content`.

2. *Подпись секции:* локальный класс `.label` с миксином `font-section`. Текст капсом, вправо, жёлтый, 40px.

3. *Главная кнопка:* локальный класс `.button` с миксином `font-button` и высотой `$button-height`. Ширину не задавать.

4. *Кнопка выбора на multiply:* локальный класс `.choice`, высота `$button-height-choice`, ширина по тексту.

5. *Текст карточки:* локальный класс `.copy` с миксином `font-card`.

6. *Модалка:* локальный класс `.modal`, ширина `min(100%, $modal-width)`.

## Quick Start

Токены и миксины лежат в `shared`. Vite подмешивает их в каждый `*.module.scss`, поэтому в модуле можно писать `$color-yellow` и `@include container` без своего `@use`. `app/styles/index.scss` только включает normalize, шрифты и стили страницы. Это обычный SCSS, не модуль. Слои ниже `app` оттуда стили не импортируют.

```scss
// src/shared/assets/styles/_variables.scss

$color-dark: #14091a;
$color-purple: #9e13e0;
$color-yellow: #fee97d;
$color-white: #ffffff;
$color-ink: #0c090e;

$font-family-base: "Halvar Breitschrift", sans-serif;
$font-family-second: "Stolzl", sans-serif;
$font-weight-bold: 700;
$font-weight-medium: 500;
$font-weight-regular: 400;
$font-weight-light: 300;

$font-size-button: 23px;
$font-tracking-button: 0.2em;
$font-size-menu: 20px;
$font-size-body: 20px;
$font-size-section: 40px;
$font-line-section: 0.9;
$font-tracking-section: -0.04em;
$font-line-base: 1.2;
$font-line-single: 1;

$screen-width: 1440px;
$screen-height: 100%;
$layout-padding-x: 50px;
$social-size: 40px;
$button-height: 82px;
$button-height-choice: 90px;
$button-height-form: 35px;
$field-height: 36px;
$modal-width: 560px;
$progress-width: 576px;
$progress-height: 20px;

$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

```scss
// src/widgets/hero/hero.module.scss

.screen {
  @include screen;
}

.content {
  @include container;
}

.label {
  @include font-section;
}

.button {
  @include font-button;
  height: $button-height;
}
```

```tsx
import styles from "./hero.module.scss";

export function Hero() {
  return (
    <section className={styles.screen}>
      <div className={styles.content}>
        <p className={styles.label}>Multi-tasks</p>
        <button className={styles.button} type="button">
          Join
        </button>
      </div>
    </section>
  );
}
```
