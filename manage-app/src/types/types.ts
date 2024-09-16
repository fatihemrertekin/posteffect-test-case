export interface EmailRecipient {
  id: number;
  email: string;
}

export interface DomainRecipient {
  domain: string;
  emails: EmailRecipient[];
}

export interface Recipients {
  emails: EmailRecipient[];
  domains: DomainRecipient[];
}
