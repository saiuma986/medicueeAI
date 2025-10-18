import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from './common/Card';
import { dashboardData } from '../services/mockData';
import { Appointment } from '../types';
import { useTranslation } from '../i18n';
import { useTheme } from './theme/ThemeContext';

const AppointmentRow: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
  <div className="flex items-center justify-between p-3 transition-colors duration-200 hover:bg-[var(--bg-light)] rounded-md">
    <div className="flex items-center">
      <div className="p-3 bg-cyan-900/50 rounded-lg mr-4 text-[var(--color-primary)]">
        <i className="fas fa-calendar-check"></i>
      </div>
      <div>
        <p className="font-bold text-[var(--text-primary)]">{appointment.doctorName} <span className="text-xs text-[var(--text-secondary)]">({appointment.specialty})</span></p>
        <p className="text-sm text-[var(--text-secondary)]">{appointment.hospitalName}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold text-[var(--color-primary)]">{appointment.date}</p>
      <p className="text-sm text-[var(--text-secondary)]">{appointment.time}</p>
    </div>
  </div>
);

interface DashboardProps {
  appointments: Appointment[];
}

const Dashboard: React.FC<DashboardProps> = ({ appointments }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [axisStroke, setAxisStroke] = useState('');

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setTooltipStyle({
        backgroundColor: style.getPropertyValue('--bg-modal').trim(),
        border: `1px solid ${style.getPropertyValue('--border-strong').trim()}`,
        color: style.getPropertyValue('--text-primary').trim(),
    });
    setAxisStroke(style.getPropertyValue('--text-secondary').trim());
  }, [theme]);

  return (
    <div>
      <h1 
        className="text-3xl font-bold text-[var(--text-primary)] mb-6" 
        style={theme === 'dark' ? { textShadow: '0 0 5px var(--text-primary), 0 0 10px var(--color-primary)' } : {}}
      >
        {t('dashboard.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title={t('dashboard.appointmentsThisWeek')}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.appointments.values.map((v, i) => ({ name: dashboardData.appointments.labels[i], count: v }))}>
               <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0.8}/>
                  </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}/>
              <Legend />
              <Bar dataKey="count" fill="url(#colorUv)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        <Card title={t('dashboard.bloodRequestsByType')}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.bloodRequests.values.map((v, i) => ({ name: dashboardData.bloodRequests.labels[i], value: v }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(Number(percent || 0) * 100).toFixed(0)}%`}
              >
                {dashboardData.bloodRequests.values.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#d946ef', '#06b6d4', '#8b5cf6', '#67e8f9'][index % 4]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title={t('dashboard.ambulanceResponseTime')}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.ambulanceResponse.values.map((v, i) => ({ name: dashboardData.ambulanceResponse.labels[i], count: v }))}>
               <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-primary-hover)" stopOpacity={0.8}/>
                  </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }} />
              <Legend />
              <Bar dataKey="count" fill="url(#colorPv)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <div className="md:col-span-2 lg:col-span-3">
          <Card title={t('dashboard.upcomingAppointments')}>
            <div className="p-4 space-y-2">
                {appointments.map(apt => (
                    <AppointmentRow key={apt.id} appointment={apt} />
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;