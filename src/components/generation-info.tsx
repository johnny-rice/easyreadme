'use client'

import { RATE_LIMIT } from '@/constants'
import { useRemaining } from '@/hooks/use-remaining'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AiLocally } from '@/components/ai-locally'
import { CounterInfo } from '@/components/counter-info'
import { FormApiKey } from '@/components/form-api-key'

export function GenerationInfo() {
  const { data, isLoading } = useRemaining()

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className='w-full relative overflow-hidden rounded-md p-[1px] focus:outline-none hidden sm:block'>
            <span className='absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_40%,#E2CBFF_100%)]' />
            <span className='inline-flex size-full items-center justify-center rounded-md bg-background hover:bg-[#0d0d0d] transition-colors duration-200 px-4 2xl:px-8 py-1 font-medium text-gray-200 backdrop-blur-3xl'>
              <span className='text-sm text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-purple-100'>
                {isLoading ? 0 : data.remaining} / {RATE_LIMIT} generations
              </span>
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[400px]'>
          <div className='flex flex-col gap-5'>
            {data && <CounterInfo remaining={data.remaining} />}
            <FormApiKey />
            <AiLocally />
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
