import React from 'react';

import {Card, CardContent, CardHeader, CardTitle} from '@edgepress/ui/components/card';
import {FileText, LayoutDashboard, LayoutGrid, Users} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Posts</CardTitle>
          <FileText className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>142</div>
          <p className='text-xs text-muted-foreground'>+12% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Pages</CardTitle>
          <LayoutGrid className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>24</div>
          <p className='text-xs text-muted-foreground'>+2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Active Users</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>1,283</div>
          <p className='text-xs text-muted-foreground'>+18% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Page Views</CardTitle>
          <LayoutDashboard className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>54,213</div>
          <p className='text-xs text-muted-foreground'>+9% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
