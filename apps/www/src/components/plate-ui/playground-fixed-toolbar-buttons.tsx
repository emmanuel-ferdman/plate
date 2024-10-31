import React from 'react';

import { AlignPlugin } from '@udecode/plate-alignment/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import { useEditorReadOnly } from '@udecode/plate-common/react';
import { EmojiPlugin } from '@udecode/plate-emoji/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from '@udecode/plate-font/react';
import { IndentPlugin } from '@udecode/plate-indent/react';
import { ListStyleType } from '@udecode/plate-indent-list';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import { LineHeightPlugin } from '@udecode/plate-line-height/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import {
  BulletedListPlugin,
  ListPlugin,
  NumberedListPlugin,
} from '@udecode/plate-list/react';
import { ImagePlugin } from '@udecode/plate-media/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  BaselineIcon,
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  PaintBucketIcon,
  SparklesIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';

import { CheckPlugin } from '@/components/context/check-plugin';
import { AIToolbarButton } from '@/registry/default/plate-ui/ai-toolbar-button';
// import { AIToolbarButton } from '@/registry/default/plate-ui/ai-toolbar-button';
import { AlignDropdownMenu } from '@/registry/default/plate-ui/align-dropdown-menu';
import { ColorDropdownMenu } from '@/registry/default/plate-ui/color-dropdown-menu';
import { CommentToolbarButton } from '@/registry/default/plate-ui/comment-toolbar-button';
import { EmojiDropdownMenu } from '@/registry/default/plate-ui/emoji-dropdown-menu';
import { IndentListToolbarButton } from '@/registry/default/plate-ui/indent-list-toolbar-button';
import { IndentTodoToolbarButton } from '@/registry/default/plate-ui/indent-todo-toolbar-button';
import { IndentToolbarButton } from '@/registry/default/plate-ui/indent-toolbar-button';
import { LineHeightDropdownMenu } from '@/registry/default/plate-ui/line-height-dropdown-menu';
import { LinkToolbarButton } from '@/registry/default/plate-ui/link-toolbar-button';
import { ListToolbarButton } from '@/registry/default/plate-ui/list-toolbar-button';
import { MarkToolbarButton } from '@/registry/default/plate-ui/mark-toolbar-button';
import { MediaToolbarButton } from '@/registry/default/plate-ui/media-toolbar-button';
import { OutdentToolbarButton } from '@/registry/default/plate-ui/outdent-toolbar-button';
import { TableDropdownMenu } from '@/registry/default/plate-ui/table-dropdown-menu';
import { ToggleToolbarButton } from '@/registry/default/plate-ui/toggle-toolbar-button';
import { ToolbarGroup } from '@/registry/default/plate-ui/toolbar';

import { PlaygroundInsertDropdownMenu } from './playground-insert-dropdown-menu';
import { PlaygroundModeDropdownMenu } from './playground-mode-dropdown-menu';
import { PlaygroundMoreDropdownMenu } from './playground-more-dropdown-menu';
import { PlaygroundTurnIntoDropdownMenu } from './playground-turn-into-dropdown-menu';

export function PlaygroundFixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="w-full">
      <div
        className="flex"
        style={{
          // Conceal the first separator on each line using overflow
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup>
              <ToolbarGroup>
                <AIToolbarButton
                  className="gap-1.5 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-500"
                  tooltip="Edit, generate, and more"
                >
                  <SparklesIcon className="!size-3.5" />
                  Ask AI
                </AIToolbarButton>
              </ToolbarGroup>

              <PlaygroundInsertDropdownMenu />

              <CheckPlugin id="basic-nodes">
                <PlaygroundTurnIntoDropdownMenu />
              </CheckPlugin>
            </ToolbarGroup>

            <ToolbarGroup>
              <CheckPlugin id="basic-nodes" plugin={BoldPlugin}>
                <MarkToolbarButton
                  nodeType={BoldPlugin.key}
                  tooltip="Bold (⌘+B)"
                >
                  <BoldIcon />
                </MarkToolbarButton>
              </CheckPlugin>

              <CheckPlugin id="basic-nodes" plugin={ItalicPlugin}>
                <MarkToolbarButton
                  nodeType={ItalicPlugin.key}
                  tooltip="Italic (⌘+I)"
                >
                  <ItalicIcon />
                </MarkToolbarButton>
              </CheckPlugin>

              <CheckPlugin id="basic-nodes" plugin={UnderlinePlugin}>
                <MarkToolbarButton
                  nodeType={UnderlinePlugin.key}
                  tooltip="Underline (⌘+U)"
                >
                  <UnderlineIcon />
                </MarkToolbarButton>
              </CheckPlugin>

              <CheckPlugin id="basic-nodes" plugin={StrikethroughPlugin}>
                <MarkToolbarButton
                  nodeType={StrikethroughPlugin.key}
                  tooltip="Strikethrough (⌘+⇧+M)"
                >
                  <StrikethroughIcon />
                </MarkToolbarButton>
              </CheckPlugin>

              <CheckPlugin id="basic-nodes" plugin={CodePlugin}>
                <MarkToolbarButton
                  nodeType={CodePlugin.key}
                  tooltip="Code (⌘+E)"
                >
                  <Code2Icon />
                </MarkToolbarButton>
              </CheckPlugin>

              <CheckPlugin id="font" plugin={FontColorPlugin}>
                <ColorDropdownMenu
                  nodeType={FontColorPlugin.key}
                  tooltip="Text Color"
                >
                  <BaselineIcon />
                </ColorDropdownMenu>
              </CheckPlugin>

              <CheckPlugin id="font" plugin={FontBackgroundColorPlugin}>
                <ColorDropdownMenu
                  nodeType={FontBackgroundColorPlugin.key}
                  tooltip="Highlight Color"
                >
                  <PaintBucketIcon />
                </ColorDropdownMenu>
              </CheckPlugin>
            </ToolbarGroup>

            <ToolbarGroup>
              <CheckPlugin id="align" plugin={AlignPlugin}>
                <AlignDropdownMenu />
              </CheckPlugin>

              <CheckPlugin id="line-height" plugin={LineHeightPlugin}>
                <LineHeightDropdownMenu />
              </CheckPlugin>

              <CheckPlugin id="indent-list" plugin={IndentListPlugin}>
                <IndentListToolbarButton nodeType={ListStyleType.Disc} />
                <IndentListToolbarButton nodeType={ListStyleType.Decimal} />
                <IndentTodoToolbarButton />
              </CheckPlugin>

              <CheckPlugin id="list" plugin={ListPlugin}>
                <ListToolbarButton nodeType={BulletedListPlugin.key} />
                <ListToolbarButton nodeType={NumberedListPlugin.key} />
              </CheckPlugin>

              <CheckPlugin
                id={['indent', 'list', 'indent-list']}
                plugin={IndentPlugin}
              >
                <OutdentToolbarButton />
                <IndentToolbarButton />
              </CheckPlugin>
            </ToolbarGroup>

            <ToolbarGroup>
              <CheckPlugin id="link" plugin={LinkPlugin}>
                <LinkToolbarButton />
              </CheckPlugin>

              <CheckPlugin id="toggle" plugin={TogglePlugin}>
                <ToggleToolbarButton />
              </CheckPlugin>

              <CheckPlugin id="media" plugin={ImagePlugin}>
                <MediaToolbarButton nodeType={ImagePlugin.key} />
              </CheckPlugin>

              <CheckPlugin id={['table', 'tableMerge']} plugin={TablePlugin}>
                <TableDropdownMenu />
              </CheckPlugin>

              <CheckPlugin id="emoji" plugin={EmojiPlugin}>
                <EmojiDropdownMenu />
              </CheckPlugin>

              <PlaygroundMoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        <div className="grow" />

        <ToolbarGroup>
          <CheckPlugin id="comment" plugin={CommentsPlugin}>
            <CommentToolbarButton />
          </CheckPlugin>
          <PlaygroundModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  );
}
