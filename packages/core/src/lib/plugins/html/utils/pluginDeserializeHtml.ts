import { type AnyObject, type Nullable, isDefined } from '@udecode/utils';
import castArray from 'lodash/castArray.js';

import type { SlateEditor } from '../../../editor';
import type {
  AnyEditorPlugin,
  HtmlDeserializer,
} from '../../../plugin/SlatePlugin';

import { getEditorPlugin } from '../../../plugin';
import { isSlateNode } from '../../../static';
import { getInjectedPlugins } from '../../../utils/getInjectedPlugins';
import { getDataNodeProps } from './getDataNodeProps';

/**
 * Get a deserializer and add default rules for deserializing plate static
 * elements
 */
const getDeserializedWithStaticRules = (plugin: AnyEditorPlugin) => {
  let deserializer = plugin.parsers?.html?.deserializer;

  const rules = deserializer?.rules ?? [];

  // Check if rules already contain slate-xxx className
  const hasSlateRule = rules.some((rule) =>
    rule.validClassName?.includes(`slate-${plugin.key}`)
  );

  const staticRules = hasSlateRule
    ? rules
    : [
        {
          validClassName: `slate-${plugin.key}`,
          validNodeName: '*',
        },
        ...rules,
      ];

  if (!deserializer) deserializer = { rules: staticRules };

  deserializer.rules = staticRules;

  return deserializer;
};

/** Get a deserializer by type, node names, class names and styles. */
export const pluginDeserializeHtml = (
  editor: SlateEditor,
  plugin: AnyEditorPlugin,
  {
    deserializeLeaf,
    element: el,
  }: { element: HTMLElement; deserializeLeaf?: boolean }
): (Nullable<HtmlDeserializer> & { node: AnyObject }) | undefined => {
  const {
    node: { isElement: isElementRoot, isLeaf: isLeafRoot },
  } = plugin;

  const deserializer = getDeserializedWithStaticRules(plugin);

  if (!deserializer) return;

  const {
    attributeNames,
    isElement: isElementRule,
    isLeaf: isLeafRule,
    query,
    rules,
  } = deserializer;
  let { parse } = deserializer;

  const isElement = isElementRule || isElementRoot;
  const isLeaf = isLeafRule || isLeafRoot;

  if (!deserializeLeaf && !isElement) {
    return;
  }
  if (deserializeLeaf && !isLeaf) {
    return;
  }
  if (rules) {
    const isValid = rules.some(
      ({ validAttribute, validClassName, validNodeName = '*', validStyle }) => {
        if (validNodeName) {
          const validNodeNames = castArray<string>(validNodeName);

          // Ignore if el nodeName is not included in rule validNodeNames (except *).
          if (
            validNodeNames.length > 0 &&
            !validNodeNames.includes(el.nodeName) &&
            validNodeName !== '*'
          )
            return false;
        }
        // Ignore if the rule className is not in el class list.
        if (validClassName && !el.classList.contains(validClassName))
          return false;
        if (validStyle) {
          for (const [key, value] of Object.entries(validStyle)) {
            const values = castArray<string>(value);

            // Ignore if el style value is not included in rule style values (except *)
            if (!values.includes((el.style as any)[key]) && value !== '*')
              return;
            // Ignore if el style value is falsy (for value *)
            if (value === '*' && !(el.style as any)[key]) return;

            const defaultNodeValue = plugin.inject.nodeProps?.defaultNodeValue;

            // Ignore if the style value = plugin.inject.nodeProps.defaultNodeValue
            if (
              defaultNodeValue &&
              defaultNodeValue === (el.style as any)[key]
            ) {
              return false;
            }
          }
        }
        if (validAttribute) {
          if (typeof validAttribute === 'string') {
            if (!el.getAttributeNames().includes(validAttribute)) return false;
          } else {
            for (const [attributeName, attributeValue] of Object.entries(
              validAttribute
            )) {
              const attributeValues = castArray<string>(attributeValue);
              const elAttribute = el.getAttribute(attributeName);

              if (
                !isDefined(elAttribute) ||
                !attributeValues.includes(elAttribute)
              )
                return false;
            }
          }
        }

        return true;
      }
    );

    if (!isValid) return;
  }
  if (
    query &&
    !query({ ...(getEditorPlugin(editor, plugin) as any), element: el })
  ) {
    return;
  }
  if (!parse)
    if (isElement) {
      parse = ({ type }) => ({ type: type });
    } else if (isLeaf) {
      parse = ({ type }) => ({ [type!]: true });
    } else {
      return;
    }

  const parsedNode = (() => {
    if (isSlateNode(el)) {
      return {};
    }

    return (
      parse({
        ...(getEditorPlugin(editor, plugin) as any),
        element: el,
        node: {},
      }) ?? {}
    );
  })();

  const dataNodeProps = getDataNodeProps({
    editor,
    element: el,
    plugin,
  });

  let node = {
    ...parsedNode,
    ...dataNodeProps,
  };

  if (Object.keys(node).length === 0) return;

  const injectedPlugins = getInjectedPlugins(editor, plugin);

  injectedPlugins.forEach((injectedPlugin) => {
    const res = injectedPlugin.parsers?.html?.deserializer?.parse?.({
      ...(getEditorPlugin(editor, plugin) as any),
      element: el,
      node,
    });

    if (res && !isSlateNode(el)) {
      node = {
        ...node,
        ...res,
      };
    }
  });

  if (attributeNames) {
    const elementAttributes = {};

    const elementAttributeNames = el.getAttributeNames();

    for (const elementAttributeName of elementAttributeNames) {
      if (attributeNames.includes(elementAttributeName)) {
        (elementAttributes as any)[elementAttributeName] =
          el.getAttribute(elementAttributeName);
      }
    }

    if (Object.keys(elementAttributes).length > 0) {
      node.attributes = elementAttributes;
    }
  }

  return { ...deserializer, node };
};
