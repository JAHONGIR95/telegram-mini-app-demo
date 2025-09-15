const SearchIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.0003 25.3332C20.2597 25.3332 25.3337 20.2592 25.3337 13.9998C25.3337 7.7405 20.2597 2.6665 14.0003 2.6665C7.74099 2.6665 2.66699 7.7405 2.66699 13.9998C2.66699 20.2592 7.74099 25.3332 14.0003 25.3332Z"
        stroke={active ? 'url(#paint1_linear_6459_5596)' : '#B0B0B0'}
        strokeWidth="2"
      />
      <path
        d="M17.7712 9.562C17.2764 9.06617 16.6885 8.67295 16.0413 8.4049C15.3941 8.13685 14.7003 7.99925 13.9998 8C13.2993 7.99925 12.6056 8.13685 11.9584 8.4049C11.3112 8.67295 10.7233 9.06617 10.2285 9.562"
        // stroke="url(#paint0_linear_6507_6239)"
        stroke={active ? 'url(#paint1_linear_6459_5596)' : '#B0B0B0'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.1484 22.1479L27.8051 27.8046"
        stroke={active ? 'url(#paint1_linear_6459_5596)' : '#B0B0B0'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0"
          x1="13.9998"
          y1="8"
          x2="13.9998"
          y2="9.562"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stopColor="#F5AB32" />
          <stop offset="1" stopColor="#D97325" />
        </linearGradient>
        <linearGradient id="paint1_linear_6459_5596" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0.485" stopColor="#F5AB32" />
          <stop offset="1" stopColor="#D97325" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SearchIcon;
