import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

const Render = ({ body }) => {
  return (
    <MDXProvider
      components={{
        p: props => <p {...props} className="px-4" />,
        h1: props => <h1 {...props} className="px-4 font-mond text-3xl" />,
        h2: props => <h2 {...props} className="px-4" />,
        h3: props => <h3 {...props} className="px-4" />,
        h4: props => <h4 {...props} className="px-4" />,
        h5: props => <h5 {...props} className="px-4" />,
        h6: props => <h6 {...props} className="px-4" />,
        thematicBreak: props => <thematicBreak {...props} className="px-4" />,
        blockquote: props => <blockquote {...props} className="ml-2 italic" />,
        ul: props => <ul {...props} className="mx-0" />,
        ol: props => <ol {...props} className="mx-0" />,
        li: props => <li {...props} className="mx-4" />,
        table: props => <table {...props} className="px-4 mx-2" />,
        tr: props => (
          <tr {...props} className="border-black border-2 bg-gray-100" />
        ),
        td: props => <td {...props} className="px-2" />,
        th: props => <th {...props} className="px-2" />,
        em: props => <em {...props} className="font-italic" />,
        strong: props => <strong {...props} />,
        delete: props => <delete {...props} className="" />,
        hr: props => <hr {...props} className="px-4" />,
        a: props => (
          <a
            {...props}
            className="underline font-mond text-xl"
            style={{ color: "#0000ff" }}
          />
        ),
        pre: props => (
          <pre
            {...props}
            className="p-2 border-l-2 border-black m-2 bg-gray-100"
          />
        ),
        code: props => <code {...props} className="text-black " />,
        img: props => <img {...props} />,
      }}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  )
}

export default Render
