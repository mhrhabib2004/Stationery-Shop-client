import {
  FaHome,
  FaBlog,
  FaEnvelope,
  FaProjectDiagram,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
export default function AdminDasbord() { 

  return (
    <div className="w-dvw h-dvh bg-gray-200 grid grid-cols-7">
      {/* Sidebar */}
      <div className="col-span-1 bg-white">
        <div className="p-2 h-full w-full flex flex-col bg-white dark:bg-gray-900 border-r border-r-gray-200">
          {/* Logo */}
          <a href="#">
            <div className="flex justify-center lg:justify-start items-center gap-2 py-2 px-0 md:px-2 lg:px-4 cursor-pointer">
              <svg
                width="36"
                height="36"
                viewBox="0 0 903 1000"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Paths */}
                <path d="M814.39 736.55L751.05 699.74L750.81 617.11L814.15 653.92L814.39 736.55Z" fill="#00717E" />
                <path d="M520.46 997.94L457.12 961.13L456.86 869.58L520.2 906.39L520.46 997.94Z" fill="#00717E" />
                <path d="M520.2 906.39L456.86 869.58L751.05 699.74L814.39 736.55L520.2 906.39Z" fill="#00B6CA" />
                <path d="M608.06 681.21L544.72 644.4L838.91 474.55L902.25 511.36L608.06 681.21Z" fill="#00B6CA" />
                <path d="M519.97 823.77L456.63 786.96L455.87 521.56L519.22 558.37L519.97 823.77Z" fill="#00717E" />
                <path d="M519.22 558.37L455.87 521.56L838.41 300.7L901.75 337.51L519.22 558.37Z" fill="#00B6CA" />
                <path
                  d="M901.75 337.51L902.01 429.05L607.83 598.9L608.06 681.21L902.25 511.36L903 777.08L520.46 997.94L520.2 906.39L814.39 736.55L814.15 653.92L519.97 823.77L519.22 558.37L901.75 337.51Z"
                  fill="#00A3B6"
                />
                <path d="M75.75 554.2L139.09 517.4L138.34 784.69L75 821.5L75.75 554.2Z" fill="#1D49C5" />
                <path d="M1.25 338.65L64.59 301.84L149.22 350.7L85.88 387.51L1.25 338.65Z" fill="#2152DC" />
                <path d="M85.88 387.51L149.22 350.7L255.26 668.51L191.92 705.32L85.88 387.51Z" fill="#2459EF" />
                <path d="M308.29 688.46L371.63 651.65L254.74 851.89L191.4 888.7L308.29 688.46Z" fill="#1D49C5" />
                <path d="M383.77 559.5L447.11 522.69L445.87 962.24L382.53 999.05L383.77 559.5Z" fill="#1D49C5" />
                <path d="M299.15 510.64L362.49 473.83L447.11 522.69L383.77 559.5L299.15 510.64Z" fill="#2152DC" />
                <path
                  d="M383.77 559.5L382.53 999.05L307.53 955.76L308.29 688.46L191.4 888.7L75.75 554.2L75 821.5L0 778.2L1.25 338.65L85.88 387.51L191.92 705.32L299.15 510.64L383.77 559.5Z"
                  fill="#143389"
                />
                <path d="M832.32 218.54L832.12 291.8L752.97 337.8L753.18 264.54L832.32 218.54Z" fill="#007DC5" />
                <path d="M753.18 264.54L752.97 337.8L370.44 116.94L370.65 43.68L753.18 264.54Z" fill="#005789" />
                <path d="M449.8 -2.31L832.32 218.54L753.18 264.54L370.65 43.68L449.8 -2.31Z" fill="#008CDC" />
                <path d="M387.82 136.05L387.62 209.31L237.03 296.82L237.23 223.56L387.82 136.05Z" fill="#007DC5" />
                <path d="M514.52 300.89L514.31 374.15L421.06 320.31L421.27 247.05L514.52 300.89Z" fill="#005789" />
                <path d="M452.27 439.4L452.06 512.66L69.54 291.81L69.74 218.55L452.27 439.4Z" fill="#005789" />
                <path
                  d="M602.86 351.89L531.42 393.41L452.27 439.4L452.06 512.66L531.21 466.67L602.65 425.15L681.8 379.15L682.01 305.89L602.86 351.89Z"
                  fill="#007DC5"
                />
                <path
                  d="M421.27 247.05L500.41 201.05L682.01 305.89L602.86 351.89L531.42 393.41L452.27 439.4L69.74 218.55L299.48 85.04L387.82 136.05L237.23 223.56L443.08 342.4L514.52 300.89L421.27 247.05Z"
                  fill="#008CDC"
                />
              </svg>
            </div>
          </a>

          {/* Menu Items */}
          <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden flex-grow pt-2 justify-between">
            <div className="flex flex-col space-y-1 mx-1 lg:mt-1">
              <div className="px-5 pt-4 hidden lg:block">
                <div className="flex flex-row items-center">
                  <div className="text-xs font-bold tracking-wide text-gray-600">Menu</div>
                </div>
              </div>
              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer"
                href="/app"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <FaHome size={20} />
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">App</span>
              </a>
              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer"
                href="/app/blogs"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <FaBlog size={20} />
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Blogs</span>
              </a>
              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer"
                href="/app/clients"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <FaEnvelope size={20} />
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Mail</span>
              </a>
              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold bg-primary-50 shadow-sm text-primary-400 font-bold"
                href="/app/projects"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <FaProjectDiagram size={20} />
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Projects</span>
              </a>
            </div>

            {/* Settings and Logout */}
            <div className="flex flex-col space-y-1 mx-1 lg:mt-1">
              <a
                className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer"
                href="/app/settings"
              >
                <span className="inline-flex justify-center items-center ml-3.5">
                  <FaCog size={20} />
                </span>
                <span className="ml-0 lg:ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Settings</span>
              </a>
            </div>
          </div>

          {/* Logout */}
          <div className="px-1">
            <div className="flex flex-row items-center justify-center lg:justify-start rounded-md h-12 focus:outline-none pr-3.5 lg:pr-6 font-semibold text-gray-500 hover:text-primary-400 cursor-pointer text-red-400 hover:text-red-600">
              <span className="inline-flex justify-center items-center ml-3.5">
                <FaSignOutAlt size={20} />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Content */}
      <div className="col-span-6 bg-white"></div>
    </div>
  )
}
