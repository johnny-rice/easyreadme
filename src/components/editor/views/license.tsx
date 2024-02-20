import { NodeViewWrapper } from '@tiptap/react'

import { NodeName } from '@/types/builder'

import { findSection } from '@/utils/section'
import { useBuilder } from '@/store'
import { useNode } from '@/hooks/use-node'
import { ActionsBar } from '@/components/editor/views/actions-bar'

export function License(props: any) {
  const { node, deleteNode } = props
  const { removeSectionFromTableOfContents } = useBuilder((store) => store)
  const {
    attrs: { license },
    type
  } = node
  const { name, url } = license
  const nodeName = type.name as NodeName
  const section = findSection({ section: nodeName })

  useNode(props)

  return (
    <NodeViewWrapper as='div'>
      <div className='relative group'>
        <div
          className='!outline-none content'
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          <h2>{section?.name}</h2>
          {name !== 'undefined' && url !== 'undefined' ? (
            <p>
              This project is licensed under the <strong>{name}</strong> - see the{' '}
              <a
                target='_blank'
                rel='noopener noreferrer nofollow'
                className='text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400 no-underline hover:underline hover:underline-offset-2 transition-colors cursor-pointer'
                href={url}
              >
                {name}
              </a>{' '}
              file for details.
            </p>
          ) : (
            <p>
              <strong>Add your License</strong>
            </p>
          )}
        </div>
        <ActionsBar
          removeSection={() => {
            deleteNode()
            removeSectionFromTableOfContents(nodeName)
          }}
        />
      </div>
    </NodeViewWrapper>
  )
}
