'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  BookOutlined,
  DollarOutlined,
  SettingOutlined,
  BarChartOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomestaySwitcher } from './HomestaySwitcher';

const { Header, Sider, Content } = Layout;

const MENU_ITEMS = [
  { key: '/visit', icon: <PictureOutlined />, label: 'Guest landing', href: '/visit' },
  { key: '/rooms', icon: <HomeOutlined />, label: 'Rooms & Types', href: '/rooms' },
  { key: '/calendar', icon: <CalendarOutlined />, label: 'Calendar', href: '/calendar' },
  { key: '/bookings', icon: <BookOutlined />, label: 'Bookings', href: '/bookings' },
  { key: '/expenses', icon: <DollarOutlined />, label: 'Expenses', href: '/expenses' },
  { key: '/demand', icon: <BarChartOutlined />, label: 'Demand', href: '/demand' },
  { key: '/settings', icon: <SettingOutlined />, label: 'Settings', href: '/settings' },
];

const VISIT_ROUTE_PREFIX = '/visit';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === VISIT_ROUTE_PREFIX || pathname.startsWith(`${VISIT_ROUTE_PREFIX}/`)) {
    return <>{children}</>;
  }

  const selectedKey = MENU_ITEMS.find((i) => pathname === i.href || pathname.startsWith(i.href + '/'))?.key ?? '/visit';

  const menuItems = MENU_ITEMS.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link href={item.href}>{item.label}</Link>,
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" theme="light">
        <div style={{ height: 64, display: 'flex', alignItems: 'center', paddingLeft: 24 }}>
          <span style={{ fontWeight: 600, fontSize: 18 }}>SotunApp</span>
        </div>
        <Menu selectedKeys={[selectedKey]} mode="inline" items={menuItems} style={{ borderRight: 0 }} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff', display: 'flex', alignItems: 'center', gap: 16 }}>
          <HomestaySwitcher />
        </Header>
        <Content style={{ margin: '24px', padding: 24, background: '#fff', borderRadius: 8, minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
