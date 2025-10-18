
import React, { useState } from 'react';
import Modal from './common/Modal';
import { SearchResults, Hospital, BloodDonor, HealthEvent } from '../types';
import { useTranslation } from '../i18n';

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  results: SearchResults;
  isLoading: boolean;
}

const ResultCard: React.FC<{
    icon: string;
    title: string;
    subtitle: string;
    tag?: string;
}> = ({ icon, title, subtitle, tag }) => (
    <div className="p-3 bg-[var(--bg-light)] rounded-lg flex items-center justify-between transition-colors duration-200 hover:bg-[var(--bg-input)]">
        <div className="flex items-center">
            <div className="p-3 bg-cyan-900/50 rounded-lg mr-4 text-[var(--text-accent-primary)]">
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <p className="font-bold text-[var(--text-primary)]">{title}</p>
                <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
            </div>
        </div>
        {tag && <span className="text-xs font-semibold bg-fuchsia-900/50 text-[var(--text-accent-secondary)] px-2 py-1 rounded-full">{tag}</span>}
    </div>
);

const Section: React.FC<{
    title: string;
    count: number;
    children: React.ReactNode;
}> = ({ title, count, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div>
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-full text-left flex justify-between items-center py-2 px-3 bg-black/20 rounded-t-lg"
            >
                <h3 className="text-lg font-semibold text-[var(--text-accent-primary)]">{title} ({count})</h3>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${isCollapsed ? '-rotate-90' : ''}`}></i>
            </button>
            {!isCollapsed && <div className="space-y-2 p-3 bg-black/10 rounded-b-lg">{children}</div>}
        </div>
    )
};


const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ isOpen, onClose, query, results, isLoading }) => {
  const { t } = useTranslation();
  const { hospitals, donors, events } = results;

  const hasResults = hospitals.length > 0 || donors.length > 0 || events.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${t('searchResults.title')} "${query}"`}>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg text-[var(--text-secondary)]">Searching...</p>
                    <p className="mt-2 text-sm text-gray-500">Ghostfreak is looking for you...</p>
                </div>
            ) : hasResults ? (
                <div className="space-y-4">
                    {hospitals.length > 0 && (
                        <Section title={t('searchResults.hospitals')} count={hospitals.length}>
                            {hospitals.map(h => (
                                <ResultCard 
                                    key={h.id}
                                    icon="fa-hospital"
                                    title={h.name}
                                    subtitle={h.location.address}
                                    tag={`${h.rating} ★`}
                                />
                            ))}
                        </Section>
                    )}
                    {donors.length > 0 && (
                        <Section title={t('searchResults.donors')} count={donors.length}>
                             {donors.map(d => (
                                <ResultCard 
                                    key={d.id}
                                    icon="fa-droplet"
                                    title={d.name}
                                    subtitle={d.location}
                                    tag={d.bloodType}
                                />
                            ))}
                        </Section>
                    )}
                    {events.length > 0 && (
                        <Section title={t('searchResults.events')} count={events.length}>
                            {events.map(e => (
                                <ResultCard 
                                    key={e.id}
                                    icon="fa-calendar-check"
                                    title={e.name}
                                    subtitle={e.hospitalName}
                                    tag={e.date}
                                />
                            ))}
                        </Section>
                    )}
                </div>
            ) : (
                <div className="text-center text-[var(--text-secondary)] py-8">
                    <i className="fas fa-search fa-3x mb-4 text-[var(--color-primary)]/30"></i>
                    <p>{t('searchResults.noResults')}</p>
                </div>
            )}
        </div>
    </Modal>
  );
};

export default SearchResultsModal;