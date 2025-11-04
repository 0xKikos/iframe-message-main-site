import { squarePath } from '@/constant/square-path'
import { token } from '@/constant/token-mock'
import { useIframeMessage } from '@/hooks/useIframeMessage'
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

const SquareDetail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { id: squareId } = useParams()
  const location = useLocation();
  const navigate = useNavigate()
  const { iframeRef, sendMessage } = useIframeMessage({
    onMessage: (event) => {
      if (event.type === "COMMONS_SQUARE_DETAIL_BACK") {
        console.log("back");
        if (location.key === "default") {
          navigate("/square")
        } else {
          navigate(-1)
        }
      }
    }
  })

  const handleIframeLoad = () => {
    setIsLoading(false)
    sendMessage({ type: 'COMMONS_SQUARE_DETAIL_INIT', data: { token: token, squareId: squareId } })
  }
  return (
    <section className='w-full min-h-screen relative'>
      {isLoading && (
        <div className="absolute inset-0 flex h-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
            <p className="text-sm text-gray-500">Loading iFrame Page...</p>
          </div>
        </div>
      )}
      <iframe ref={iframeRef} src={`${squarePath.detail}/${squareId}`} className='w-full h-full' onLoad={handleIframeLoad} />
    </section>
  )
}

export default SquareDetail