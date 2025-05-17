import * as React from 'react';

interface EmailTemplateProps {
  firstName: string,
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  message
}) => (
  <div>
    <h1>{firstName}</h1>
    <br />
    <h2>{message}</h2>
  </div>
);