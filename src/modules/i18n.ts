import { type I18n, createI18n } from 'vue-i18n'
import { type UserModule } from '~/types'

// supported locales
export const SUPPORT_LOCALES = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml'))
    .map(([key, _value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), true]
    }),
)

export function setI18nLanguage(i18n: I18n | any, locale: string) {
  if (i18n.mode === 'legacy')
    i18n.global.locale = locale
  else
    i18n.global.locale.value = locale
}

export async function loadLocaleMessages(i18n: I18n | any, locale: string) {
  // load locale messages with dynamic import
  const messages = await import(`../../locales/${locale}.yml`)

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

export const install: UserModule = ({ app, router }) => {
  const i18n = createI18n({
    legacy: false,
    fallbackLocale: 'en',
  })

  // set default english
  setI18nLanguage(i18n, 'en')

  // register
  app.use(i18n)

  // setup router guard
  router.beforeEach(async (_to, _from, next) => {
    // take default language at localStorage
    const paramsLocale = useLocalStorage('lang', 'en')

    // check if locale file is not yet loaded
    if (!i18n.global.availableLocales.includes(paramsLocale.value))
      await loadLocaleMessages(i18n, paramsLocale.value)

    // set i18n language
    setI18nLanguage(i18n, paramsLocale.value)

    return next()
  })
}
