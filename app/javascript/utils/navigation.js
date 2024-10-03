import { Turbo } from "@hotwired/turbo-rails"

export function goTo(
  query = null
) {
  const [path, paramString ] = location.toString().split( '?' )
  let params = new URLSearchParams( paramString )
  if (query == '') { query = null}
  if (params.get('q') == '') { params.delete('q') }
  if (params.get('q') == query) { return }
  if (!query) { params.delete('q') } else { params.set('q', query) }
  let url = params.size == 0 ? path : `${path}?${params.toString()}`
  Turbo.visit(url)
}

export function getQuery(
  location
) {
  const [_, paramString ] = location.split( '?' )
  let params = new URLSearchParams( paramString )
  return params.get('q')
}