'use client';

import React, { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  style?: CSSProperties;
  disabled?: boolean;
  ariaLabel?: string;
  href?: string;
  target?: string;
  rel?: string;
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
  href,
  target,
  rel,
  ...rest
}: ButtonProps) {
  // Separate outer button styling (e.g. width, margin) from inner content styling (padding, fontSize)
  // so the retro 3D button's 1px border wrapper is never distorted by outer padding.
  const {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    fontSize,
    ...buttonStyle
  } = style || {};

  const spanStyle: CSSProperties = {
    ...(padding !== undefined && { padding }),
    ...(paddingTop !== undefined && { paddingTop }),
    ...(paddingRight !== undefined && { paddingRight }),
    ...(paddingBottom !== undefined && { paddingBottom }),
    ...(paddingLeft !== undefined && { paddingLeft }),
    ...(fontSize !== undefined && { fontSize }),
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        id={id}
        style={Object.keys(buttonStyle).length > 0 ? buttonStyle : undefined}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`button ${className}`.trim()}
      >
        <div>
          <span style={Object.keys(spanStyle).length > 0 ? spanStyle : undefined}>
            {children}
          </span>
        </div>
      </a>
    );
  }

  return (
    <button
      type={type}
      id={id}
      style={Object.keys(buttonStyle).length > 0 ? buttonStyle : undefined}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`button ${className}`.trim()}
      {...rest}
    >
      <div>
        <span style={Object.keys(spanStyle).length > 0 ? spanStyle : undefined}>
          {children}
        </span>
      </div>
    </button>
  );
}
