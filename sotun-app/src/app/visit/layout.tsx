import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sotun Stay — Visit',
  description:
    'View our art-forward homestay gallery and learn about the place. Available in English and Vietnamese.',
};

export default function VisitLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
