'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { insertEmptyElement } from '@udecode/plate-common';
import {
  ParagraphPlugin,
  focusEditor,
  useEditorRef,
} from '@udecode/plate-common/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  PilcrowIcon,
  Plus,
  QuoteIcon,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

const items = [
  {
    items: [
      {
        description: 'Paragraph',
        icon: PilcrowIcon,
        label: 'Paragraph',
        value: ParagraphPlugin.key,
      },
      {
        description: 'Heading 1',
        icon: Heading1Icon,
        label: 'Heading 1',
        value: HEADING_KEYS.h1,
      },
      {
        description: 'Heading 2',
        icon: Heading2Icon,
        label: 'Heading 2',
        value: HEADING_KEYS.h2,
      },
      {
        description: 'Heading 3',
        icon: Heading3Icon,
        label: 'Heading 3',
        value: HEADING_KEYS.h3,
      },
      {
        description: 'Quote (⌘+⇧+.)',
        icon: QuoteIcon,
        label: 'Quote',
        value: BlockquotePlugin.key,
      },
      // {
      //   value: TablePlugin.key,
      //   label: 'Table',
      //   description: 'Table',
      //   icon: Icons.table,
      // },
      // {
      //   value: 'ul',
      //   label: 'Bulleted list',
      //   description: 'Bulleted list',
      //   icon: Icons.ul,
      // },
      // {
      //   value: 'ol',
      //   label: 'Numbered list',
      //   description: 'Numbered list',
      //   icon: Icons.ol,
      // },
      // {
      //   value: HorizontalRulePlugin.key,
      //   label: 'Divider',
      //   description: 'Divider (---)',
      //   icon: Icons.hr,
      // },
    ],
    label: 'Basic blocks',
  },
  // {
  //   label: 'Media',
  //   items: [
  //     {
  //       value: CodeBlockPlugin.key,
  //       label: 'Code',
  //       description: 'Code (```)',
  //       icon: Icons.codeblock,
  //     },
  //     {
  //       value: ImagePlugin.key,
  //       label: 'Image',
  //       description: 'Image',
  //       icon: Icons.image,
  //     },
  //     {
  //       value: MediaEmbedPlugin.key,
  //       label: 'Embed',
  //       description: 'Embed',
  //       icon: Icons.embed,
  //     },
  //     {
  //       value: ExcalidrawPlugin.key,
  //       label: 'Excalidraw',
  //       description: 'Excalidraw',
  //       icon: Icons.excalidraw,
  //     },
  //   ],
  // },
  // {
  //   label: 'Inline',
  //   items: [
  //     {
  //       value: LinkPlugin.key,
  //       label: 'Link',
  //       description: 'Link',
  //       icon: Icons.link,
  //     },
  //   ],
  // },
];

export function InsertDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const openState = useOpenState();

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Insert" isDropdown>
          <Plus />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {items.map(({ items: nestedItems, label }) => (
          <DropdownMenuGroup key={label} label={label}>
            {nestedItems.map(
              ({ icon: Icon, label: itemLabel, value: type }) => (
                <DropdownMenuItem
                  key={type}
                  className="min-w-[180px]"
                  onSelect={() => {
                    switch (type) {
                      // case CodeBlockPlugin.key: {
                      //   insertEmptyCodeBlock(editor);
                      //
                      //   break;
                      // }
                      // case ImagePlugin.key: {
                      //   await insertMedia(editor, { type: ImagePlugin.key });
                      //
                      //   break;
                      // }
                      // case MediaEmbedPlugin.key: {
                      //   await insertMedia(editor, {
                      //     type: MediaEmbedPlugin.key,
                      //   });
                      //
                      //   break;
                      // }
                      // case 'ul':
                      // case 'ol': {
                      //   insertEmptyElement(editor, ParagraphPlugin.key, {
                      //     select: true,
                      //     nextBlock: true,
                      //   });
                      //
                      //   if (settingsStore.get.checkedId(IndentListPlugin.key)) {
                      //     toggleIndentList(editor, {
                      //       listStyleType: type === 'ul' ? 'disc' : 'decimal',
                      //     });
                      //   } else if (settingsStore.get.checkedId('list')) {
                      //     toggleList(editor, { type });
                      //   }
                      //
                      //   break;
                      // }
                      // case TablePlugin.key: {
                      //   insertTable(editor);
                      //
                      //   break;
                      // }
                      // case LinkPlugin.key: {
                      //   triggerFloatingLink(editor, { focused: true });
                      //
                      //   break;
                      // }
                      default: {
                        insertEmptyElement(editor, type, {
                          nextBlock: true,
                          select: true,
                        });
                      }
                    }

                    focusEditor(editor);
                  }}
                >
                  <Icon />
                  {itemLabel}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
