import { Heading, Bold, Italic, Strike, Underline, Code, CodeBlock, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History, Image } from 'tiptap-vuetify'

export default [
    [Heading, {
        options: {
            levels: [1, 2, 3]
        }
    }],
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    CodeBlock,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History,
    Image
]