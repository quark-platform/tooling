type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type XULElementsName = ArrayElement<
  // Be sure to update the other array below
  [
    'action',
    'arrowscrollbox',
    'bbox',
    'binding',
    'bindings',
    'box',
    'broadcaster',
    'broadcasterset',
    'button',
    'browser',
    'checkbox',
    'caption',
    'colorpicker',
    'column',
    'columns',
    'commandset',
    'command',
    'conditions',
    'content',
    'deck',
    'description',
    'dialog',
    'dialogheader',
    'editor',
    'grid',
    'grippy',
    'groupbox',
    'hbox',
    'iframe',
    'image',
    'key',
    'keyset',
    'label',
    'listbox',
    'listcell',
    'listcol',
    'listcols',
    'listhead',
    'listheader',
    'listitem',
    'member',
    'menu',
    'menubar',
    'menuitem',
    'menulist',
    'menupopup',
    'menuseparator',
    'observes',
    'overlay',
    'page',
    'popup',
    'popupset',
    'preference',
    'preferences',
    'prefpane',
    'prefwindow',
    'progressmeter',
    'radio',
    'radiogroup',
    'resizer',
    'richlistbox',
    'richlistitem',
    'resizer',
    'row',
    'rows',
    'rule',
    'script',
    'scrollbar',
    'scrollbox',
    'scrollcorner',
    'separator',
    'spacer',
    'splitter',
    'stack',
    'statusbar',
    'statusbarpanel',
    'stringbundle',
    'stringbundleset',
    'tab',
    'tabbrowser',
    'tabbox',
    'tabpanel',
    'tabpanels',
    'tabs',
    'template',
    'textnode',
    'textbox',
    'titlebar',
    'toolbar',
    'toolbarbutton',
    'toolbargrippy',
    'toolbaritem',
    'toolbarpalette',
    'toolbarseparator',
    'toolbarset',
    'toolbarspacer',
    'toolbarspring',
    'toolbox',
    'tooltip',
    'tree',
    'treecell',
    'treechildren',
    'treecol',
    'treecols',
    'treeitem',
    'treerow',
    'treeseparator',
    'triple',
    'vbox',
    'window',
    'wizard',
    'wizardpage'
  ]
>

// Be sure to update the type above
export const xulElements = [
  'action',
  'arrowscrollbox',
  'bbox',
  'binding',
  'bindings',
  'box',
  'broadcaster',
  'broadcasterset',
  'button',
  'browser',
  'checkbox',
  'caption',
  'colorpicker',
  'column',
  'columns',
  'commandset',
  'command',
  'conditions',
  'content',
  'deck',
  'description',
  'dialog',
  'dialogheader',
  'editor',
  'grid',
  'grippy',
  'groupbox',
  'hbox',
  'iframe',
  'image',
  'key',
  'keyset',
  'label',
  'listbox',
  'listcell',
  'listcol',
  'listcols',
  'listhead',
  'listheader',
  'listitem',
  'member',
  'menu',
  'menubar',
  'menuitem',
  'menulist',
  'menupopup',
  'menuseparator',
  'observes',
  'overlay',
  'page',
  'popup',
  'popupset',
  'preference',
  'preferences',
  'prefpane',
  'prefwindow',
  'progressmeter',
  'radio',
  'radiogroup',
  'resizer',
  'richlistbox',
  'richlistitem',
  'resizer',
  'row',
  'rows',
  'rule',
  'script',
  'scrollbar',
  'scrollbox',
  'scrollcorner',
  'separator',
  'spacer',
  'splitter',
  'stack',
  'statusbar',
  'statusbarpanel',
  'stringbundle',
  'stringbundleset',
  'tab',
  'tabbrowser',
  'tabbox',
  'tabpanel',
  'tabpanels',
  'tabs',
  'template',
  'textnode',
  'textbox',
  'titlebar',
  'toolbar',
  'toolbarbutton',
  'toolbargrippy',
  'toolbaritem',
  'toolbarpalette',
  'toolbarseparator',
  'toolbarset',
  'toolbarspacer',
  'toolbarspring',
  'toolbox',
  'tooltip',
  'tree',
  'treecell',
  'treechildren',
  'treecol',
  'treecols',
  'treeitem',
  'treerow',
  'treeseparator',
  'triple',
  'vbox',
  'window',
  'wizard',
  'wizardpage',
]

export type XULElement = HTMLElement

export interface XULDocument extends Document {
  createXULElement(
    elementName: XULElementsName,
    elementAttributes?: Record<string, string | number>
  ): XULElement
}
