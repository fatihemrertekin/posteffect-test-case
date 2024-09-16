import React, { useState } from 'react';
import { Recipients, EmailRecipient, DomainRecipient } from '../types/types';
import { Button, List, ListItem } from '@mui/material';

interface Props {
  recipients: Recipients;
  onRemoveEmail: (email: EmailRecipient) => void;
  onRemoveDomain: (domain: DomainRecipient) => void;
}

const SelectedRecipientsList: React.FC<Props> = ({
  recipients,
  onRemoveEmail,
  onRemoveDomain,
}) => {
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set());

  const toggleDomain = (domain: string) => {
    setExpandedDomains((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(domain)) {
        newSet.delete(domain);
      } else {
        newSet.add(domain);
      }
      return newSet;
    });
  };

  return (
    <div>
      <h2 style={{color: "#1D388E", marginBottom: "8px"}}>Selected Recipients</h2>
      <h3 style={{marginBottom: "8px"}}>Selected Company Domains</h3>
      {recipients.domains.map((domainRecipient) => (
        <div key={domainRecipient.domain}>
          <div style={{marginBottom:"5px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <Button 
                variant="outlined" 
                size="small" 
                style={{padding:"3px", minWidth:"30px", marginRight:"15px"}} 
                onClick={() => toggleDomain(domainRecipient.domain)}>
                  {expandedDomains.has(domainRecipient.domain) ? '-' : '+'}
              </Button>
            </div>
            <div>{domainRecipient.domain}</div>
            <div>
              <Button 
                variant="contained" 
                size="small" 
                style={{padding:"5px 10px", minWidth:"30px", marginLeft:"15px"}} 
                onClick={() => onRemoveDomain(domainRecipient)}>
                  Delete
              </Button>
            </div>
          </div>
          {expandedDomains.has(domainRecipient.domain) && (
            <List style={{padding:"0", marginBottom:"20px"}}>
              {domainRecipient.emails.map((email) => (
                <ListItem 
                  style={{padding:"0", marginBottom:"10px"}} 
                  key={email.id}>
                    {email.email}
                </ListItem>
              ))}
            </List>
          )}
        </div>
      ))}
      <div>
        <h3 style={{marginTop: "18px"}}>Induvidual E-Mails</h3>
        <List>
          {recipients.emails.map((email) => (
            <ListItem 
              style={{padding:"0", marginBottom:"10px", display:"flex", justifyContent:"space-between"}} 
              key={email.id}>
                {email.email}
              <Button 
                variant="contained" 
                size="small" 
                style={{padding:"5px 10px", minWidth:"30px", marginLeft:"15px"}} 
                onClick={() => onRemoveEmail(email)}>
                  Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default SelectedRecipientsList;
