import React, { useState } from 'react';
import { Recipients, EmailRecipient, DomainRecipient } from '../types/types';
import AvailableRecipientsList from '../components/AvailableRecipientsList';
import SelectedRecipientsList from '../components/SelectedRecipientsList';
import AutocompleteInput from '../components/AutocompleteInput';

const RecipientSelector: React.FC = () => {
  const [availableRecipients, setAvailableRecipients] = useState<Recipients>({
    emails: [
      { id: 1, email: 'hayri74@hotmail.com' },
      { id: 2, email: 'ahmet32@gmail.com' },
      { id: 3, email: 'serdar@hotmail.com' },
      { id: 4, email: 'fatma@hotmail.com' },
      { id: 5, email: 'rıza34@gmail.com' },
      { id: 6, email: 'cemile@hotmail.com' },
    ],
    domains: [
      {
        domain: 'gdh.digital',
        emails: [
          { id: 7, email: 'pelinerturk@gdh.digital' },
          { id: 8, email: 'metinçetin@gdh.digital' },
          { id: 9, email: 'fatihertekin@gdh.digital' },
        ],
      },
      {
        domain: 'posteffect.ai',
        emails: [
          { id: 10, email: 'ferdi@posteffect.ai' },
          { id: 11, email: 'kamilk@posteffect.ai' },
        ],
      },
      {
        domain: 'arel.edu',
        emails: [
          { id: 12, email: 'cem1@arel.edu' },
          { id: 13, email: 'onurbay98@arel.edu' },
        ],
      },
    ],
  });

  const [selectedRecipients, setSelectedRecipients] = useState<Recipients>({
    emails: [],
    domains: [],
  });

  const handleAvailableEmail = (email: EmailRecipient) => {
    const isAlreadyAvailable = availableRecipients.emails.some(
      (e) => e.email === email.email
    );
    if (isAlreadyAvailable) {
      alert('This e-mail is already exist on the list of "current" recipients!')
    }
    if (!isAlreadyAvailable) {
      setAvailableRecipients((prev) => ({
        ...prev,
        emails: [...prev.emails, email],
      }));
    }
  };

  const handleSelectEmail = (email: EmailRecipient) => {
    const isAlreadySelected = selectedRecipients.emails.some(
      (e) => e.email === email.email
    );
    if (isAlreadySelected) {
      alert('This e-mail is already exist on the list of "selected" recipients!')
    }
    if (!isAlreadySelected) {
      setSelectedRecipients((prev) => ({
        ...prev,
        emails: [...prev.emails, email],
      }));
    }
  };

  const handleSelectDomain = (domain: DomainRecipient) => {
    const isAlreadySelected = selectedRecipients.domains.some(
      (d) => d.domain === domain.domain
    );
    if (!isAlreadySelected) {
      setSelectedRecipients((prev) => ({
        ...prev,
        domains: [...prev.domains, domain],
      }));
    }
  };

  const handleRemoveEmail = (email: EmailRecipient) => {
    setSelectedRecipients((prev) => ({
      ...prev,
      emails: prev.emails.filter((e) => e.id !== email.id),
    }));
  };

  const handleRemoveDomain = (domain: DomainRecipient) => {
    setSelectedRecipients((prev) => ({
      ...prev,
      domains: prev.domains.filter((d) => d.domain !== domain.domain),
    }));
  };

  return (
    <div>
      <h1 style={{color: "#1D388E"}}>Posteffect.ai - Mail Management App</h1>
      <AutocompleteInput
        availableRecipients={availableRecipients}
        onAddEmail={handleAvailableEmail}
      />
      <div className='container'>
        <div className='AvailableRecipientsList'>
          <AvailableRecipientsList
            recipients={availableRecipients}
            onSelectEmail={handleSelectEmail}
            onSelectDomain={handleSelectDomain}
          />
        </div>
        <div className='SelectedRecipientsList'>
          <SelectedRecipientsList
            recipients={selectedRecipients}
            onRemoveEmail={handleRemoveEmail}
            onRemoveDomain={handleRemoveDomain}
          />
        </div>
      </div>    
    </div>
  );
};

export default RecipientSelector;
