import { useState } from 'react'
import { useIframeMessage } from '@/hooks/useIframeMessage'
import { squarePath } from '@/constant/square-path'
import { token } from '@/constant/token-mock'
import { useNavigate } from 'react-router'

const Square = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  const { iframeRef, sendMessage } = useIframeMessage({
    onMessage: (event) => {
      console.log("🐙 Main: Receive Message", event)
      switch (event.type) {
        case "COMMONS_SQUARE_JOIN_DETAIL":
          navigate(`/square/${event.data.squareId}`)
          break
        default:
          break
      }
    }
  })

  const handleIframeLoad = () => {
    setIsLoading(false)
    sendMessage({ type: 'COMMONS_SQUARE_LIST', data: { token: token } })
  }


  return (
    <div className="relative w-full h-[calc(100vh-78px)]">
      {isLoading && (
        <div className="absolute inset-0 flex h-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
            <p className="text-sm text-gray-500">Loading iFrame Page...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={squarePath.square}
        className="w-full h-full"
        onLoad={handleIframeLoad}
      />
    </div>
  )
}

export default Square