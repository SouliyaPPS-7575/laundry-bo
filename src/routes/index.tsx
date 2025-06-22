import { createFileRoute } from '@tanstack/react-router';
import Dashboard from './_admin/dashboard';

export const Route = createFileRoute('/')({
  component: Dashboard,
});
