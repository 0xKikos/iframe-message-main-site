import { useState } from 'react'

const Square = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-78px)] h-full">
      {isLoading && (
        <div className="absolute inset-0 flex h-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
            <p className="text-sm text-gray-500">Loading iFrame Page...</p>
          </div>
        </div>
      )}
      <iframe
        src="http://localhost:5174/"
        className="w-full h-full"
        onLoad={handleIframeLoad}
      />
    </div>
  )
}

export default Square