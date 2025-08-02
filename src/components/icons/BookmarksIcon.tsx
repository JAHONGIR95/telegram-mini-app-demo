const BookmarksIcon = ({ active }: { active: boolean }) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.333 3.4165H22.666C23.4741 3.4165 24.2515 3.71749 24.8477 4.25732L24.9648 4.36865C25.5741 4.97811 25.916 5.8047 25.916 6.6665V24.0239C25.9159 25.0454 24.7573 25.6352 23.9316 25.0356H23.9307L23.1074 24.436L21.916 23.5688V28.0239C21.916 28.9818 20.8974 29.5598 20.0898 29.1333L19.9316 29.0347L14.4404 25.0415L14 24.7202L13.5586 25.0415L8.06738 29.0347C7.24034 29.6352 6.08307 29.0452 6.08301 28.0239V10.6665L6.08691 10.5054C6.12411 9.75554 6.41987 9.04134 6.92383 8.48486L7.03516 8.36865C7.64465 7.75916 8.47105 7.4165 9.33301 7.4165H10.083V6.6665C10.083 5.80455 10.4257 4.97815 11.0352 4.36865C11.6066 3.79725 12.3686 3.46025 13.1719 3.42041L13.333 3.4165ZM13.333 4.5835C12.8495 4.5835 12.3834 4.75138 12.0127 5.05518L11.8604 5.19385C11.4697 5.58455 11.25 6.11397 11.25 6.6665V7.4165H18.666C19.4741 7.4165 20.2515 7.71749 20.8477 8.25732L20.9648 8.36865C21.5741 8.97811 21.916 9.8047 21.916 10.6665V22.1274L22.2256 22.3521L23.5586 23.3208L24.75 24.187V6.6665C24.75 6.18314 24.582 5.71688 24.2783 5.34619L24.1396 5.19385C23.7489 4.80315 23.2185 4.5835 22.666 4.5835H13.333Z"
        strokeWidth="1.5"
        fill={active ? 'url(#paint0_linear_6459_5596)' : ''}
        stroke={active ? 'url(#paint1_linear_6459_5596)' : '#B0B0B0'}
      />
      <path
        d="M18.6663 12H9.33301"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke={active ? 'url(#paint2_linear_6459_5596)' : '#B0B0B0'}
      />

      <defs>
        <linearGradient
          id="paint0_linear_6459_5596"
          x1="16.0002"
          y1="2.6665"
          x2="16.0002"
          y2="30.0273"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stopColor="#F5AB32" />
          <stop offset="1" stopColor="#D97325" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_6459_5596"
          x1="16.0002"
          y1="2.6665"
          x2="16.0002"
          y2="30.0273"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stopColor="#F5AB32" />
          <stop offset="1" stopColor="#D97325" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_6459_5596"
          x1="14.0002"
          y1="12"
          x2="14.0002"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.485" stopColor="#F5AB32" />
          <stop offset="1" stopColor="#D97325" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BookmarksIcon;
