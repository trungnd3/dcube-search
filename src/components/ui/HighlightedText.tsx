import { JSX } from 'react';
import { TextContent } from '../../interface/document';
import { cn } from '../../lib/util';

interface HighlightedTextProps {
  paragraph: TextContent;
  className?: string;
  tag?: string;
}

export default function HighlightedText({
  paragraph,
  className = '',
  tag = 'p',
}: HighlightedTextProps) {
  const Tag = `${tag}` as keyof JSX.IntrinsicElements;
  const { Highlights, Text } = paragraph;

  if (!Highlights || Highlights.length < 1) {
    return <Tag className={cn(className)}>{Text}</Tag>;
  }

  const slices: Array<{ isMark: boolean; start: number; end: number }> = [];

  Highlights.forEach((h, i) => {
    if (!slices.length) {
      slices.push({
        isMark: false,
        start: 0,
        end: h.BeginOffset,
      });
    } else {
      slices.push({
        isMark: false,
        start: slices[slices.length - 1].end,
        end: h.BeginOffset,
      });
    }
    slices.push({
      isMark: true,
      start: h.BeginOffset,
      end: h.EndOffset,
    });

    if (i === Highlights.length - 1) {
      slices.push({
        isMark: false,
        start: h.EndOffset,
        end: Text.length - 1,
      });
    }
  });

  const renderedText = slices.map((slice) => {
    return !slice.isMark
      ? Text.slice(slice.start, slice.end)
      : `<strong>${Text.slice(slice.start, slice.end)}</strong>`;
  }).join('');

  return (
    <Tag
      className={cn(className)}
      dangerouslySetInnerHTML={{
        __html: renderedText,
      }}
    ></Tag>
  );
}
