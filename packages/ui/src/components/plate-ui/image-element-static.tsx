import React from 'react';

import type { SlateElementProps } from '@udecode/plate';
import type { TCaptionElement } from '@udecode/plate-caption';
import type { TImageElement } from '@udecode/plate-media';

import { cn } from '@udecode/cn';
import { NodeApi, SlateElement, type TNode } from '@udecode/plate';

export function ImageElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  const {
    align = 'center',
    caption,
    url,
    width,
    alt,
  } = props.element as TImageElement &
    TCaptionElement & {
      width: number;
      alt?: string;
    };

  return (
    <SlateElement className={cn(className, 'py-2.5')} {...props}>
      <figure className="group relative m-0 inline-block" style={{ width }}>
        <div
          className="relative max-w-full min-w-[92px]"
          style={{ textAlign: align }}
        >
          <img
            className={cn(
              'w-full max-w-full cursor-default object-cover px-0',
              'rounded-sm'
            )}
            alt={alt}
            src={url}
          />
          {caption && caption[0] && (
            <figcaption className="mx-auto mt-2 h-[24px] max-w-full">
              {NodeApi.string(caption[0] as TNode)}
            </figcaption>
          )}
        </div>
      </figure>
      {children}
    </SlateElement>
  );
}
