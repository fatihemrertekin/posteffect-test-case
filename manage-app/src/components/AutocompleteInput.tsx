import React, { useState } from 'react';
import { EmailRecipient, Recipients } from '../types/types';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

interface Props {
  availableRecipients: Recipients;
  onAddEmail: (email: EmailRecipient) => void;
}

const AutocompleteInput: React.FC<Props> = ({ availableRecipients, onAddEmail }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const newSuggestions = [
      ...availableRecipients.emails
        .filter((emails) => emails.email.includes(value))
        .map((emails) => emails.email),
      ...availableRecipients.domains
        .flatMap((domainRecipient) => domainRecipient.emails)
        .filter((emails) => emails.email.includes(value))
        .map((emails) => emails.email),
    ];
    setSuggestions(newSuggestions);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const handleAddEmail = () => {
    if (isValidEmail(inputValue)) {
      const newEmail: EmailRecipient = {
        id: Date.now(),
        email: inputValue,
      };
      onAddEmail(newEmail);
      setInputValue('');
    } else {
      alert('Invalid E-mail Adress!');
    }
  };

  const isValidEmail = (email: string): boolean => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;
    return regex.test(email);
  };

  return (
    <div className='autoComplete'>
      <TextField 
        type='text' 
        value={inputValue} 
        onChange={handleChange} 
        label="Enter an e-mail or domain" 
        variant="outlined" 
        sx={{marginRight: "10px", width: "93%"}} />
      <Button 
        variant="contained" 
        style={{padding: "15px 20px"}} 
        onClick={handleAddEmail}>
          Add
      </Button>
      {suggestions.length > 0 && (
        <List sx={{maxHeight: "200px", overflow: "auto"}}>
          {suggestions.map((sug, index) => (
            <ListItem 
              sx={{padding: "0", marginBottom: "5px", cursor: "pointer"}} 
              key={index} 
              onClick={() => handleSelectSuggestion(sug)}>
                <ListItemText primary={sug} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default AutocompleteInput;
