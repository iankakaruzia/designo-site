import { useState } from 'preact/hooks'

import iconClose from '@/assets/shared/mobile/icon-close.svg'
import iconHamburger from '@/assets/shared/mobile/icon-hamburger.svg'
import { classnames } from '@/utils/classnames'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        className="md:hidden"
      >
        <img
          src={isOpen ? iconClose : iconHamburger}
          alt={isOpen ? 'Close Menu' : 'Open Menu'}
        />
      </button>

      <nav
        aria-hidden={!isOpen}
        className={classnames(
          'fixed inset-0 top-[91px] z-[1500] bg-black bg-opacity-50 transition-all duration-200 ease-in-out',
          isOpen ? 'block opacity-100' : 'pointer-events-none hidden opacity-0'
        )}
      >
        <ul class="flex flex-col gap-8 bg-gray-900 px-6 py-12">
          <li>
            <a
              href="/company"
              className="text-2xl uppercase leading-6 tracking-[2px] text-white"
            >
              Our Company
            </a>
          </li>
          <li>
            <a
              href="/locations"
              className="text-2xl uppercase leading-6 tracking-[2px] text-white"
            >
              Locations
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-2xl uppercase leading-6 tracking-[2px] text-white"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
