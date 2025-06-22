export interface Rider {
     id: string
     name: string
     phone: string
     status: "active" | "inactive" | "busy"
     currentOrders: number
     location: {
          lat: number
          lng: number
          address: string
     }
     rating: number
     completedToday: number
}

export const getStatusColor = (status: Rider["status"]): string => {
     const colors = {
          active: "#52c41a",
          busy: "#faad14",
          inactive: "#ff4d4f",
     }
     return colors[status]
}

export const getStatusLabel = (status: Rider["status"]): string => {
     const labels = {
          active: "Active",
          busy: "Busy",
          inactive: "Inactive",
     }
     return labels[status]
}

export const getRiderInitials = (name: string): string => {
     return name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
}

export const formatCoordinates = (lat: number, lng: number): string => {
     return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
}
   