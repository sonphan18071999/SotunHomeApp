'use client';

import React from 'react';
import { Typography, Space } from 'antd';
import Link from 'next/link';

const { Title, Text } = Typography;

export const PAGE_HEADER_TITLE_LEVEL = 4;

export interface PageHeaderBackLink {
  href: string;
  label: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: React.ReactNode;
  back?: PageHeaderBackLink;
}

const BACK_LINK_STYLE: React.CSSProperties = { marginBottom: 8, display: 'block' };

export function PageHeader({ title, subtitle, extra, back }: PageHeaderProps) {
  return (
    <Space orientation="vertical" size={0} style={{ width: '100%', marginBottom: 16 }}>
      {back != null && (
        <Link href={back.href} style={BACK_LINK_STYLE}>
          {back.label}
        </Link>
      )}
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
