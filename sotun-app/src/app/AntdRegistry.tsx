'use client';

import React from 'react';
import { ConfigProvider } from 'antd';

const ANTD_THEME = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
  },
};

export default function AntdRegistry({ children }: { children: React.ReactNode }) {
  return <ConfigProvider theme={ANTD_THEME}>{children}</ConfigProvider>;
}
