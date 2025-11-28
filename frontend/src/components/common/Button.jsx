import React from 'react';

export default function Button({ children, variant = 'primary', ...rest }) {
  const classes = ['btn'];
  if (variant === 'outline') classes.push('btn-outline');
  return (
    <button className={classes.join(' ')} {...rest}>
      {children}
    </button>
  );
}
