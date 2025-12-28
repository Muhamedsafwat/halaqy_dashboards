'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const LocaleSwitcher = ({ locale, otherLocale }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchPath = () => {
    const newPath = window.location.pathname.replace(`/${locale}`, `/${otherLocale}`)
    window.location.href = newPath
  }

  return (
    <div ref={ref} className="relative text-left w-full lg:w-auto">
      <button
        onClick={() => setOpen(!open)}
        className={`
          flex items-center justify-between
          w-full md:flex  px-4 py-4
          lg:w-28 lg:px-4 lg:py-2
          bg-base-dark text-base-light rounded-lg shadow-sm
          hover:bg-base-light hover:text-base-dark
          transition-colors duration-150
          ${locale === 'ar' ? 'lg:flex-row-reverse' : ''}
        `}
      >
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`
            absolute lg:right-0 lg:w-28 
            w-full md:w-full
            bg-base-dark text-base-light rounded-lg shadow-sm mt-1 overflow-hidden
          `}
        >
          <button
            onClick={() => {
              switchPath()
              setOpen(false)
            }}
            className="w-full px-4 py-2 text-center lg:text-left hover:bg-base-light hover:text-base-dark transition-colors duration-150"
          >
            {otherLocale.toUpperCase()}
          </button>
        </div>
      )}
    </div>
  )
}

export default LocaleSwitcher

