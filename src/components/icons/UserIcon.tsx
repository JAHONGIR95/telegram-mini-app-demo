const UserIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    {active && (
      <defs>
        <linearGradient
          id="paint0"
          x1="12"
          y1="0.666748"
          x2="12"
          y2="26.0001"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stopColor="#F5AB32" />
          <stop offset="1" stopColor="#D97325" />
        </linearGradient>
        <linearGradient
          id="paint1"
          x1="12"
          y1="0.666748"
          x2="12"
          y2="26.0001"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stopColor="#F5AB32" />
          <stop offset="1" stopColor="#D97325" />
        </linearGradient>
      </defs>
    )}
    <path
      d="M9.33301 16.1833H14.667C19.3236 16.1835 22.1844 19.4999 22.9473 23.7195L23.0146 24.1306C23.087 24.6255 22.6754 25.1501 22 25.1501H2C1.36676 25.1501 0.965528 24.6889 0.977539 24.2234L0.985352 24.1306C1.63279 19.7172 4.52579 16.1835 9.33301 16.1833ZM12 1.51636C14.8386 1.51636 17.1504 3.82819 17.1504 6.66675C17.1504 9.50531 14.8386 11.8171 12 11.8171C9.16144 11.8171 6.84961 9.50531 6.84961 6.66675C6.84961 3.82819 9.16144 1.51636 12 1.51636Z"
      stroke={active ? 'url(#paint1)' : '#B0B0B0'}
      fill={active ? 'url(#paint0)' : ''}
      strokeWidth="1.7"
    />
  </svg>
);

export default UserIcon;
