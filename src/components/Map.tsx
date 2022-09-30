import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import { useEffect } from 'preact/hooks'

type MapProps = {
  id: string
  center: L.LatLngExpression
  zoom?: number
}

export function Map({ center, id, zoom = 12 }: MapProps) {
  useEffect(() => {
    const map = L.map(id, { dragging: !L.Browser.mobile }).setView(center, zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      minZoom: 3,
      bounds: [
        [-180, 180],
        [180, -180]
      ]
    }).addTo(map)
  })

  return <div id={id} class="h-80" />
}
