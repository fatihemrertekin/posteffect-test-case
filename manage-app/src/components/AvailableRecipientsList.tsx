import React from 'react';
import { Recipients, EmailRecipient, DomainRecipient } from '../types/types';

interface Props {
  recipients: Recipients;
  onSelectEmail: (email: EmailRecipient) => void;
  onSelectDomain: (domain: DomainRecipient) => void;
}

const AvailableRecipientsList: React.FC<Props> = ({
  recipients,
  onSelectEmail,
  onSelectDomain,
}) => {
  return (
    <div className='available'>
      <h2 style={{color: "#1D388E", marginBottom: "8px"}}>Current Recipients</h2>
      <div>
        <h3 style={{marginBottom: "10px"}}>Company Domains</h3>
        {recipients.domains.map((domainRecipient) => (
          <div key={domainRecipient.domain}>
            <button onClick={() => onSelectDomain(domainRecipient)}>
              {domainRecipient.domain}
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3 style={{marginBottom: "10px", marginTop: "20px"}}>Induvidual E-Mails</h3>
        {recipients.emails.map((emailRecipient) => (
          <div key={emailRecipient.id}>
            <button onClick={() => onSelectEmail(emailRecipient)}>
              {emailRecipient.email}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRecipientsList;
