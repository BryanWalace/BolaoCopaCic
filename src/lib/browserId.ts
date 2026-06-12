export function getBrowserId(): string {
  let id = localStorage.getItem('bolao_browser_id')
  if (!id) {
    id = 'br_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    localStorage.setItem('bolao_browser_id', id)
  }
  return id
}
