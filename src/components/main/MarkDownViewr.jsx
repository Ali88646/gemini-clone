import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const MarkdownRenderer = ({ content }) => (
  <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert font-sans text-gray-800 dark:text-gray-200 leading-relaxed hideScrollBar">
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: (props) => (
          <h1
            className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white"
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className="text-3xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100"
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className="text-2xl font-medium mt-5 mb-2 text-gray-700 dark:text-gray-200"
            {...props}
          />
        ),
        ul: (props) => (
          <ul className="list-disc pl-8 mb-4 space-y-1" {...props} />
        ),
        ol: (props) => (
          <ol className="list-decimal pl-8 mb-4 space-y-1" {...props} />
        ),
        li: (props) => <li className="mb-1" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400 my-6 py-2"
            {...props}
          />
        ),
        code: ({ inline, className, children, ...props }) =>
          !inline ? (
            <pre className="bg-gray-800 text-gray-200 p-6 rounded-lg overflow-x-auto my-6 shadow-inner">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code
              className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          ),
        a: (props) => (
          <a
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        p: (props) => <p className="mb-4 text-lg" {...props} />,
        table: (props) => (
          <table
            className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 my-6"
            {...props}
          />
        ),
        thead: (props) => (
          <thead className="bg-gray-50 dark:bg-gray-700" {...props} />
        ),
        th: (props) => (
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            {...props}
          />
        ),
        tbody: (props) => (
          <tbody
            className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
            {...props}
          />
        ),
        td: (props) => (
          <td
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
            {...props}
          />
        ),
      }}
    />
  </div>
);

export default MarkdownRenderer;
