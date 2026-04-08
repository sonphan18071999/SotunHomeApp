import { redirect } from 'next/navigation';

const VISIT_ROUTE = '/visit';

export default function RootPage() {
  redirect(VISIT_ROUTE);
}
