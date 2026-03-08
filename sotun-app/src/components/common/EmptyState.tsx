'use client';

import React from 'react';
import { Empty } from 'antd';

interface EmptyStateProps {
  description?: string;
  image?: React.ReactNode;
  children?: React.ReactNode;
}

const DEFAULT_DESCRIPTION = 'No data';

export function EmptyState({ description = DEFAULT_DESCRIPTION, image, children }: EmptyStateProps) {
  return (
    <Empty description={description} image={image}>
      {children}
    </Empty>
  );
}
