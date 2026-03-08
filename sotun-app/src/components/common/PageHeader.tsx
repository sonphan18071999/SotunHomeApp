'use client';

import React from 'react';
import { Typography, Space } from 'antd';

const { Title, Text } = Typography;

export const PAGE_HEADER_TITLE_LEVEL = 4;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
}

export function PageHeader({ title, subtitle, extra }: PageHeaderProps) {
  return (
    <Space orientation="vertical" size={0} style={{ width: '100%', marginBottom: 16 }}>
      <Space style={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Title level={PAGE_HEADER_TITLE_LEVEL} style={{ margin: 0 }}>
          {title}
        </Title>
        {extra}
      </Space>
      {subtitle && <Text type="secondary">{subtitle}</Text>}
    </Space>
  );
}
