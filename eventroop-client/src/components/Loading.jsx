import React from 'react'

function Loading() {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500 border-opacity-75"></div>
      </div>
  )
}

export default Loading