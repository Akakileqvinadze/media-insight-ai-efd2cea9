import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [mapInitialized, setMapInitialized] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || mapInitialized) return;

    // Initialize map
    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 13,
      center: [42.7167, 42.2667], // Kutaisi coordinates (longitude, latitude)
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add marker at Kutaisi location (7PC3+P4F, Kutaisi)
    new mapboxgl.Marker({ color: '#8B5CF6' })
      .setLngLat([42.7167, 42.2667])
      .setPopup(new mapboxgl.Popup().setHTML('<div style="padding: 4px;"><strong>Kutaisi</strong><br/>7PC3+P4F</div>'))
      .addTo(map.current);

    setMapInitialized(true);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  };

  useEffect(() => {
    // Try to use environment variable first (for Supabase integration)
    const envToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (envToken) {
      initializeMap(envToken);
    }
  }, []);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      initializeMap(apiKey.trim());
    }
  };

  if (!mapInitialized && !import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className="relative w-full h-[400px] bg-muted rounded-lg flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Mapbox API Key Required</h3>
            <p className="text-sm text-muted-foreground">
              To display the map, please enter your Mapbox public token. You can get one from{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <form onSubmit={handleApiKeySubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="mapbox-key">Mapbox Public Token</Label>
              <Input
                id="mapbox-key"
                type="text"
                placeholder="pk.eyJ1..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/5 rounded-lg" />
    </div>
  );
};

export default Map;
