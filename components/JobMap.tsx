'use client'

import { useEffect, useState } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import type { JobLocation } from '@/lib/companycam'

interface JobMapProps {
  locations: JobLocation[]
  loading?: boolean
}

function MapContent({ locations }: { locations: JobLocation[] }) {
  const [L, setL] = useState<any>(null)
  const [map, setMap] = useState<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<JobLocation | null>(null)

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet)
    })
  }, [])

  useEffect(() => {
    if (!L || map) return

    const mapInstance = L.map('job-map').setView([29.0, -81.0], 8)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(mapInstance)

    setMap(mapInstance)

    return () => {
      mapInstance.remove()
    }
  }, [L])

  useEffect(() => {
    if (!L || !map || locations.length === 0) return

    const bounds = L.latLngBounds(locations.map(loc => [loc.latitude, loc.longitude]))

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] })
    } else {
      map.setView([29.0, -81.0], 8)
    }

    const icon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: #B0161C; color: white; padding: 6px 10px; border-radius: 20px; font-weight: bold; font-size: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); white-space: nowrap;">📍</div>`,
      iconSize: [80, 30],
      iconAnchor: [40, 15],
    })

    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], { icon }).addTo(map)
      marker.on('click', () => {
        setSelectedLocation(location)
      })
    })
  }, [L, map, locations])

  if (!L) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-panel rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-accent-red" />
      </div>
    )
  }

  return (
    <div className="relative">
      <div id="job-map" className="h-[400px] w-full rounded-lg overflow-hidden" />
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-panel/95 backdrop-blur rounded-lg p-4 shadow-lg z-[1000]">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-text-primary">{selectedLocation.projectName}</h4>
              <div className="flex items-center gap-1 text-muted text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{selectedLocation.address}</span>
              </div>
            </div>
            <button onClick={() => setSelectedLocation(null)} className="text-muted hover:text-text-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function JobMap({ locations, loading }: JobMapProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-panel rounded-lg">
        <Loader2 className="w-8 h-8 animate-spin text-accent-red" />
      </div>
    )
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="text-center py-16">
        <MapPin className="w-16 h-16 mx-auto text-muted mb-4" />
        <p className="text-muted text-lg">No job locations found</p>
      </div>
    )
  }

  return <MapContent locations={locations} />
}
