'use client'

import { useEffect, useState } from 'react'

import { ContributorOption, NodeName } from '@/types/builder'

import { cn } from '@/lib/utils'
import { useBuilder } from '@/store'
import { useReadme } from '@/hooks/use-readme'

function RowCircles() {
  return (
    <div className='grid grid-cols-5 gap-1'>
      <div className='rounded-full bg-slate-600 h-7 w-7'></div>
      <div className='rounded-full bg-slate-600 h-7 w-7'></div>
      <div className='rounded-full bg-slate-600 h-7 w-7'></div>
      <div className='rounded-full bg-slate-600 h-7 w-7'></div>
      <div className='rounded-full bg-slate-600 h-7 w-7'></div>
    </div>
  )
}

function RowSquares() {
  return (
    <div className='grid grid-cols-5 gap-1'>
      <div className='rounded-md bg-slate-600 h-7 w-7'></div>
      <div className='rounded-md bg-slate-600 h-7 w-7'></div>
      <div className='rounded-md bg-slate-600 h-7 w-7'></div>
      <div className='rounded-md bg-slate-600 h-7 w-7'></div>
      <div className='rounded-md bg-slate-600 h-7 w-7'></div>
    </div>
  )
}
export function ContributorsOptions() {
  const [optionSelected, setOptionSelected] = useState<ContributorOption | undefined>()
  const listSections = useBuilder((store) => store.listSections)
  const { buildCustomReadme } = useReadme()
  const isAdded = listSections.find((section) => section.id === NodeName.CONTRIBUTORS)?.added

  // TODO: Figure out a better way to remove selected option
  useEffect(() => {
    if (!isAdded) {
      setOptionSelected(undefined)
    }
  }, [isAdded])

  const handleCheck = (option: ContributorOption) => {
    if (option === optionSelected) return
    setOptionSelected(option)
    buildCustomReadme({
      section: NodeName.CONTRIBUTORS,
      options: {
        data: option
      }
    })
  }

  return (
    <div className='grid grid-cols-2 gap-2 mt-2'>
      <div
        className={cn('flex flex-col gap-2 border border-white/20 rounded-md p-3 cursor-pointer', {
          'border-yellow-300': optionSelected === ContributorOption.GALLERY
        })}
        onClick={() => handleCheck(ContributorOption.GALLERY)}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <RowCircles key={i} />
        ))}
        <span className='text-sm font-medium text-gray-100 dark:text-gray-400 text-center'>
          Gallery
        </span>
      </div>
      <div
        className={cn('flex flex-col gap-2 border border-white/20 rounded-md p-3 cursor-pointer', {
          'border-yellow-300': optionSelected === ContributorOption.TABLE
        })}
        onClick={() => handleCheck(ContributorOption.TABLE)}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <RowSquares key={i} />
        ))}
        <span className='text-sm font-medium text-gray-100 dark:text-gray-400 text-center'>
          Table
        </span>
      </div>
    </div>
  )
}
