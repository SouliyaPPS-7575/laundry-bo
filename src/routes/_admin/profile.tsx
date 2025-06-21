import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/profile"!</div>
}
