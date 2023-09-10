export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  )
  return matches ? decodeURIComponent(matches[1]) : null
}

export const setCookie = (name: string, value: string, days: number): void => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/;`
}
export const getIdFromUrl = (url: string): number =>
  url.indexOf('pokemon') !== -1 ? +url.substring(url.indexOf('pokemon')).replace(/[^0-9]/g, '') : 0
