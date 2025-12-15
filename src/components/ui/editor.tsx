"use client";

import React, {
  ReactNode,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

export interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
}

export interface RichTextEditorRef {
  setContent: (html: string) => void;
  getContent: () => string;
  focus: () => void;
}

const Btn = ({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded p-2 hover:bg-gray-200 ${active ? "bg-gray-300" : ""}`}
  >
    {children}
  </button>
);

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  ({ value = "", onChange }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Link.configure({ openOnClick: false }),
        Image,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: "",
      immediatelyRender: false,
      onUpdate({ editor }) {
        console.log(editor.getHTML());
        onChange?.(editor.getHTML());
      },
    });

    const isInitialized = useRef(false);

    useImperativeHandle(ref, () => ({
      setContent(html: string) {
        editor?.commands.setContent(html);
      },
      getContent() {
        return editor?.getHTML() ?? "";
      },
      focus() {
        editor?.commands.focus();
      },
    }));

    useEffect(() => {
      if (!editor || isInitialized.current) return;

      editor.commands.setContent(value);
      isInitialized.current = true;
    }, [editor, value]);

    if (!editor) return null;

    const setLink = () => {
      const url = window.prompt("Enter URL");
      if (!url) return;
      editor.chain().focus().setLink({ href: url }).run();
    };

    const addImage = () => {
      const url = window.prompt("Image URL");
      if (!url) return;
      editor.chain().focus().setImage({ src: url }).run();
    };

    return (
      <div className="border rounded-lg">
        <div className="flex flex-wrap gap-1 border-b p-2 bg-gray-50">
          <Btn
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={16} />
          </Btn>

          <Btn
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={16} />
          </Btn>
          <Btn
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={16} />
          </Btn>
          <Btn
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={16} />
          </Btn>

          <Btn
            active={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={16} />
          </Btn>
          <Btn
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={16} />
          </Btn>

          <Btn
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={16} />
          </Btn>
          <Btn
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={16} />
          </Btn>
          <Btn
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={16} />
          </Btn>
          <Btn
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code size={16} />
          </Btn>

          <Btn onClick={setLink}>
            <LinkIcon size={16} />
          </Btn>
          <Btn onClick={addImage}>
            <ImageIcon size={16} />
          </Btn>

          <Btn
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={16} />
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={16} />
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={16} />
          </Btn>

          <Btn onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={16} />
          </Btn>
          <Btn onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={16} />
          </Btn>
        </div>

        <EditorContent
          editor={editor}
          className="prose max-w-none p-4 min-h-[200px] focus:outline-none focus-visible:outline-none"
        />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
