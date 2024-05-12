'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // NOTE: comment in this code when you get to this point in the course

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 4) position = 'first';
            if (index === allPages.length - 0) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

// function PaginationNumber({
//   page,
//   href,
//   isActive,
//   position,
// }: {
//   page: number | string;
//   href: string;
//   position?: 'first' | 'last' | 'middle' | 'single';
//   isActive: boolean;
// }) {
//   const className = clsx(
//     `flex h-10 w-10 items-center justify-center text-sm border
//       ${darkTheme.border} ${darkTheme.text}
//       ${(!isActive && position !== 'middle') && 
//         `${darkTheme.hoverBorder} ${darkTheme.hoverBg} ${darkTheme.hoverText}`
//       }
//     `,
//     {
//       'rounded-l-md': position === 'first' || position === 'single',
//       'rounded-r-md': position === 'last' || position === 'single',
//       'z-10 bg-blue-600 border-blue-600 text-white': isActive,
//       'hover:bg-gray-100': !isActive && position !== 'middle',
//       'text-gray-300': position === 'middle',
//     },
//   );

//   return isActive || position === 'middle' ? (
//     <div className={className}>{page}</div>
//   ) : (
//     <Link href={href} className={className}>
//       {page}
//     </Link>
//   );
// }

// function PaginationArrow({
//   href,
//   direction,
//   isDisabled,
// }: {
//   href: string;
//   direction: 'left' | 'right';
//   isDisabled?: boolean;
// }) {
//   const className = clsx(
//     `flex h-10 w-10 items-center justify-center rounded-md border
//       ${darkTheme.border} ${darkTheme.text}
//       ${isDisabled && `${darkTheme.border} ${darkTheme.notActiveText}`}
//       ${!isDisabled && `${darkTheme.hoverBorder} ${darkTheme.hoverBg} ${darkTheme.hoverText}`}
//     `,
//     {
//       'pointer-events-none text-gray-300': isDisabled,
//       'hover:bg-gray-100': !isDisabled,
//       'mr-2 md:mr-4': direction === 'left',
//       'ml-2 md:ml-4': direction === 'right',
//     },
//   );

//   const icon =
//     direction === 'left' ? (
//       <ArrowLeftIcon className="w-4" />
//     ) : (
//       <ArrowRightIcon className="w-4" />
//     );

//   return isDisabled ? (
//     <div className={className}>{icon}</div>
//   ) : (
//     <Link className={className} href={href}>
//       {icon}
//     </Link>
//   );
// }
function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border border-gray-300 bg-white text-black',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-[rgb(0,113,242)] border-[rgb(0,113,242)] text-white': isActive,
      'hover:bg-gray-100 hover:text-black': !isActive && position !== 'middle',
      'text-gray-400': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-black',
    {
      'pointer-events-none text-gray-400': isDisabled,
      'hover:bg-[rgb(0,113,242)] hover:text-white': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4 text-black" />
    ) : (
      <ArrowRightIcon className="w-4 text-black" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

