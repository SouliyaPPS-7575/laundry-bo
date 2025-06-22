import {
  formatCoordinates,
  getRiderInitials,
  getStatusColor,
  type Rider,
} from '@/utils/rider-utils';
import { GlobalOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tooltip, Typography } from 'antd';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

const { Text } = Typography;

interface RiderMapProps {
  riders: Rider[];
  selectedRider: string | null;
  onRiderSelect: (riderId: string) => void;
  height?: number;
  initialCenter?: { lat: number; lng: number };
  onCenterChange?: (center: { lat: number; lng: number }) => void;
}

// Leaflet Map Component
const LeafletMap: React.FC<{
  center: { lat: number; lng: number };
  zoom: number;
  riders: Rider[];
  selectedRider: string | null;
  onRiderSelect: (riderId: string) => void;
  onMapMove: (center: { lat: number; lng: number }) => void;
  onCenterOnRider: (rider: Rider) => void;
  height: number;
}> = ({
  center,
  riders,
  selectedRider,
  onRiderSelect,
  onMapMove,
  onCenterOnRider,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically import Leaflet
    const initMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize map
        mapInstanceRef.current = L.map(mapRef.current).setView(
          [center.lat, center.lng],
          13
        );

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(mapInstanceRef.current);

        // Handle map move events
        mapInstanceRef.current.on('moveend', () => {
          const mapCenter = mapInstanceRef.current.getCenter();
          onMapMove({ lat: mapCenter.lat, lng: mapCenter.lng });
        });
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map center when prop changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [center.lat, center.lng],
        mapInstanceRef.current.getZoom()
      );
    }
  }, [center]);

  // Create rider marker
  const createRiderMarker = useCallback(
    (rider: Rider, L: any) => {
      const statusColor = getStatusColor(rider.status);
      const isSelected = selectedRider === rider.id;

      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: ${statusColor};
            border: ${isSelected ? '3px solid #1890ff' : '2px solid white'};
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
            ${rider.status === 'active' ? 'animation: pulse 2s infinite;' : ''}
            transition: all 0.3s ease;
          ">
            <svg width="16" height="16" fill="white" viewBox="0 0 1024 1024">
              <path d="M959.2 383.9c-0.3-82.1-66.9-148.6-149.1-148.6H575.9l-61.8-88.8c-8.1-11.6-21.5-18.4-35.8-18.4s-27.7 6.8-35.8 18.4l-61.8 88.8H214.1c-82.1 0-148.8 66.5-149.1 148.6L64 888c0 22.1 17.9 40 40 40h816c22.1 0 40-17.9 40-40l-0.8-504.1zM512 432c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"/>
            </svg>
          </div>
        `,
        className: 'custom-rider-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      return L.marker([rider.location.lat, rider.location.lng], {
        icon: customIcon,
      });
    },
    [selectedRider]
  );

  // Create popup content
  const createPopupContent = useCallback((rider: Rider) => {
    const statusColor = getStatusColor(rider.status);
    const initials = getRiderInitials(rider.name);
    const coordinates = formatCoordinates(
      rider.location.lat,
      rider.location.lng
    );

    return `
      <div style="min-width: 200px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <div style="
            width: 32px; 
            height: 32px; 
            border-radius: 50%; 
            background-color: ${statusColor}; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: bold;
            font-size: 12px;
          ">
            ${initials}
          </div>
          <div>
            <div style="font-weight: bold; font-size: 14px;">${rider.name}</div>
            <span style="
              background-color: ${statusColor}; 
              color: white; 
              padding: 2px 6px; 
              border-radius: 4px; 
              font-size: 10px;
              text-transform: capitalize;
            ">${rider.status}</span>
          </div>
        </div>
        <div style="font-size: 12px; margin-bottom: 4px;">
          📍 ${rider.location.address}
        </div>
        <div style="font-size: 11px; color: #666; margin-bottom: 8px;">
          ${coordinates}
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 8px; font-size: 11px;">
          <span>🛒 ${rider.currentOrders} orders</span>
          <span>⭐ ${rider.rating}</span>
          <span>✅ ${rider.completedToday} today</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="window.callRider('${rider.id}')" style="
            background: #1890ff; 
            color: white; 
            border: none; 
            padding: 4px 8px; 
            border-radius: 4px; 
            cursor: pointer;
            font-size: 11px;
            transition: background-color 0.2s;
          " onmouseover="this.style.backgroundColor='#40a9ff'" onmouseout="this.style.backgroundColor='#1890ff'">
            📞 Call
          </button>
          <button onclick="window.centerOnRider('${rider.id}')" style="
            background: #52c41a; 
            color: white; 
            border: none; 
            padding: 4px 8px; 
            border-radius: 4px; 
            cursor: pointer;
            font-size: 11px;
            transition: background-color 0.2s;
          " onmouseover="this.style.backgroundColor='#73d13d'" onmouseout="this.style.backgroundColor='#52c41a'">
            🎯 Center
          </button>
        </div>
      </div>
    `;
  }, []);

  // Update riders markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const L = require('leaflet');

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current.clear();

    // Add new markers
    riders.forEach((rider) => {
      const marker = createRiderMarker(rider, L);
      marker.addTo(mapInstanceRef.current);

      // Add popup
      const popupContent = createPopupContent(rider);
      marker.bindPopup(popupContent, {
        maxWidth: 250,
        className: 'custom-popup',
      });

      // Handle marker click
      marker.on('click', () => {
        onRiderSelect(rider.id);
      });

      // Auto-open popup for selected rider
      if (selectedRider === rider.id) {
        marker.openPopup();
      }

      markersRef.current.set(rider.id, marker);
    });

    // Add global functions for popup buttons
    (window as any).callRider = (riderId: string) => {
      const rider = riders.find((r) => r.id === riderId);
      if (rider) {
        window.open(`tel:${rider.phone}`);
      }
    };
    (window as any).centerOnRider = (riderId: string) => {
      const rider = riders.find((r) => r.id === riderId);
      if (rider) {
        onCenterOnRider(rider);
      }
    };
  }, [
    riders,
    selectedRider,
    onRiderSelect,
    createRiderMarker,
    createPopupContent,
    onCenterOnRider,
  ]);

  return (
    <>
      <div
        ref={mapRef}
        style={{ height: '100%', width: '100%', borderRadius: 8 }}
      />
      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(82, 196, 26, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);
          }
        }
        .custom-rider-marker {
          background: transparent !important;
          border: none !important;
        }
        :global(.custom-popup .leaflet-popup-content-wrapper) {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        :global(.custom-popup .leaflet-popup-content) {
          margin: 12px;
          line-height: 1.4;
        }
      `}</style>
    </>
  );
};

export const RiderMap: React.FC<RiderMapProps> = ({
  riders,
  selectedRider,
  onRiderSelect,
  height = 400,
  initialCenter = { lat: 40.7128, lng: -74.006 }, // NYC center
  onCenterChange,
}) => {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [zoom, setZoom] = useState(13);
  const [isLoading, setIsLoading] = useState(true);

  // Update center when initialCenter changes
  useEffect(() => {
    setMapCenter(initialCenter);
  }, [initialCenter]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Center map on specific rider - extracted and enhanced
  const centerOnRider = useCallback(
    (rider: Rider) => {
      const newCenter = { lat: rider.location.lat, lng: rider.location.lng };
      setMapCenter(newCenter);
      onCenterChange?.(newCenter);
      onRiderSelect(rider.id);

      // Optional: Show notification or feedback
      console.log(
        `Centered map on rider: ${rider.name} at ${formatCoordinates(rider.location.lat, rider.location.lng)}`
      );
    },
    [onCenterChange, onRiderSelect]
  );

  // Reset to initial center
  const resetCenter = useCallback(() => {
    setMapCenter(initialCenter);
    setZoom(13);
    onCenterChange?.(initialCenter);
  }, [initialCenter, onCenterChange]);

  const handleMapMove = useCallback(
    (center: { lat: number; lng: number }) => {
      setMapCenter(center);
      onCenterChange?.(center);
    },
    [onCenterChange]
  );

  // Get rider counts by status
  const riderCounts = {
    active: riders.filter((r) => r.status === 'active').length,
    busy: riders.filter((r) => r.status === 'busy').length,
    inactive: riders.filter((r) => r.status === 'inactive').length,
  };

  if (isLoading) {
    return (
      <div
        style={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 8,
        }}
      >
        <Space direction='vertical' align='center'>
          <GlobalOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          <Text>Loading Real Map...</Text>
        </Space>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height, overflow: 'hidden' }}>
      {/* Real Leaflet Map */}
      <LeafletMap
        center={mapCenter}
        zoom={zoom}
        riders={riders}
        selectedRider={selectedRider}
        onRiderSelect={onRiderSelect}
        onMapMove={handleMapMove}
        onCenterOnRider={centerOnRider}
        height={height}
      />

      {/* Map Controls */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 1000,
        }}
      >
        <Tooltip title='Reset View'>
          <Button
            size='small'
            icon={<ReloadOutlined />}
            onClick={resetCenter}
          />
        </Tooltip>
      </div>

      {/* Map Info */}
      <Card
        size='small'
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          minWidth: 180,
          zIndex: 1000,
        }}
      >
        <Space direction='vertical' size={2}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
            <GlobalOutlined /> Real Map View
          </Text>
          <Text style={{ fontSize: 9 }}>
            📍 {formatCoordinates(mapCenter.lat, mapCenter.lng)}
          </Text>
          <Text style={{ fontSize: 9 }}>🚗 Riders: {riders.length}</Text>
          <Text style={{ fontSize: 9 }}>🗺️ OpenStreetMap</Text>
        </Space>
      </Card>

      {/* Enhanced Legend with Counts */}
      <Card
        size='small'
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          width: 160,
          zIndex: 1000,
        }}
      >
        <Space direction='vertical' size={4}>
          <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Rider Status</Text>
          <Space size={8}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: getStatusColor('active'),
              }}
            />
            <Text style={{ fontSize: 9 }}>Active ({riderCounts.active})</Text>
          </Space>
          <Space size={8}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: getStatusColor('busy'),
              }}
            />
            <Text style={{ fontSize: 9 }}>Busy ({riderCounts.busy})</Text>
          </Space>
          <Space size={8}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: getStatusColor('inactive'),
              }}
            />
            <Text style={{ fontSize: 9 }}>
              Inactive ({riderCounts.inactive})
            </Text>
          </Space>
        </Space>
      </Card>

      {/* Instructions */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: 4,
          fontSize: 10,
          zIndex: 1000,
        }}
      >
        <div>🗺️ Real street map</div>
        <div>🖱️ Drag to pan & zoom</div>
        <div>📍 Click riders for details</div>
        <div>🎯 Use popup buttons</div>
      </div>
    </div>
  );
};
