'use client';

import React, { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  style?: CSSProperties;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({ 
  children = 'Button', 
  className = '', 
  onClick, 
  type = 'button', 
  id, 
  style, 
  disabled = false,
  ariaLabel,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      id={id}
      style={style}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`button ${className}`.trim()}
      {...rest}
    >
      <div>
        <span>{children}</span>
      </div>
    </button>
  );
}
